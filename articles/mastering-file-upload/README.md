# 概要

画像アップロード機能を実装する上で、学んだことを共有する。

* MIMEType毎に違うリクエストボディ
* 画像アップロード時に指定するべきMIMEType
* サーバーサイドでの受け取り方

# HTMLフォームのenctype属性

formのmethod属性の値がpostであるとき、enctype属性によってサーバーに送信するコンテンツのMIMEタイプを指定できる。  
`application/x-www-form-urlencoded`と`multipart/form-data` が指定可能。

## application/x-www-form-urlencoded

```html
<form method="POST">
    <label>姓: <input type="text" name="lastName"></label>
    <label>名: <input type="text" name="firstName"></label>
    <input type="submit">
</form>
```

初期値。この値をしてした場合のリクエストbodyは`key=value`の形でキーと値の一組になり、`&`で区切られる。
キーや値の英数字以外の文字は、パーセントエンコーディングされる。(バイナリデータを扱うには向かない。)

## multipart/form-data

```html
<form method="POST" enctype="multipart/form-data">
    <input type="text" name="textfield">
    <input type="file" name="filefield">
    <input type="submit">
</form>
```

主にtype属性で"file"を指定したinput要素がある場合に使用する値。  
それぞれの値はデータのブロック ("body part") として送信され、ユーザーエージェントが定義するデリミター ("boundary") がそれぞれの部分を区切りる。inputのname属性はそれぞれのPartの Content-Disposition ヘッダーの中で与えられる。

# MIMEタイプに対するリクエストボディの違い

## application/x-www-form-urlencoded

```html
<form method="POST">
    <label>姓: <input type="text" value="佐藤" name="lastName"></label>
    <label>名: <input type="text" value="太郎" name="firstName"></label>
    <input type="submit">
</form>
```

で送信した場合、リクエストボディは以下になる。

```text
lastName=%E4%BD%90%E8%97%A4&firstName=%E5%A4%AA%E9%83%8E
```

ちなみにinputのtypeにtextとfileを指定し、`application/x-www-form-urlencoded` でpostした時のリクエストbodyは以下。  
どうやらfile名しか含まれないらしい。

```html
<form method="POST">
    <input type="file" name="file">
    <input type="submit">
</form>
```

```
file=index.png
```

## multipart/form-data

```html
<form method="POST" enctype="multipart/form-data">
    <label>名前: <input type="text" name="name"></label>
    <label>顔写真: <input type="file" name="idPhoto"></label>
    <input type="submit">
</form>
```

↓ content-type。デリミター("boundary")が定義されている。

```text
multipart/form-data; boundary=----WebKitFormBoundarykbg0BKJ88pB8fBVr
```

↓リクエストbody。先ほどのデリミターで区切られpartごとに分かれていて、それぞれのPartのContent-Dispositionにname属性が記載されている。

```
------WebKitFormBoundarykbg0BKJ88pB8fBVr
Content-Disposition: form-data; name="name"

佐藤太郎
------WebKitFormBoundarykbg0BKJ88pB8fBVr
Content-Disposition: form-data; name="idPhoto"; filename="index.png"
Content-Type: image/png

<バイナリデータ>
```

# XMLHttpRequestで送信可能なMIMEタイプ

HTMLフォーム以外の送信方法、例えばXMLHttpRequestではあらゆるMIMEタイプを選択できる。
画像を扱う場合は `multipart/form-data`や`application/octet-stream`を指定する。

## multipart/form-data

XMLHttpRequestで`multipart/form-data`で送信したい場合は、FormDataオブジェクトを使って送信できる。
https://developer.mozilla.org/ja/docs/Web/API/FormData/Using_FormData_Objects

```javascript
const form = new FormData();
form.append("idPhoto", file);
form.append("name", text);
fetch("/", {
  method: "POST",
  body: form,
});
```

## application/octet-stream

XMLHttpRequestでは`multipart/form-data`以外にもあらゆるMIME Typeを取ることができ、ファイルを扱う場合には`application/octet-stream` というMIME Typeが使える。これは汎用的なバイナリデータとして扱われ、
ファイル種別が特定できない場合に使える。リクエストbodyはバイナリデータになる。

```javascript
fetch("/", {
  method: "POST",
  headers: {
    "Content-Type": "application/octet-stream",
  },
  body: file,
});
```

リクエストBodyはバイナリになる

# サーバーサイド(Nodejs)での受け取り方

Nodejsではリクエストを読み取り可能なストリームとして扱う。
"data"イベントにcallbackを設定すると、chunkを消費するようになる。
以下では全chunkをconcatしてリクエストボディ全体をconsoleで見えるようにしている。

```javascript
import { createServer } from "http";

createServer((req, res) => {
    if (req.method === "POST") {
      console.log("content-type:", req.headers["content-type"]);
      let body: any = [];
      req
        .on("data", (chunk) => {
          // 読み取り可能なストリームのチャンクを扱える。
          console.log(`Received ${chunk.length} bytes of data.`);
          body.push(chunk);
        })
        .on("end", () => {
          // 消費するチャンクが無くなったら、"end"イベントがemitされる。
          body = Buffer.concat(body);
          console.log("【request body】\n" + body);
          res.writeHead(200).end();
        });
    }
}).listen(3000, () => {
console.log("> Ready on http://localhost:3000");
});
```

`application/octet-stream` でpng画像を送信し、NFSなどに画像を保存するようなユースケースでは、
writableなstreamを作成し、chunkを書き出すことができる。

```javascript
const writable = fs.createWriteStream("./src/tmp/data.png");
req
  .on("data", (chunk) => {
    writable.write(chunk);
  })
  .on("end", () => {
    res.writeHead(200).end();
  });
```

よりシンプルな書き方
```javascript
const writable = fs.createWriteStream("./src/tmp/data.png");
req.pipe(writable)
```

# ライブラリの紹介

特に`multipart/form-data` では、パースしたりいろいろ処理が複雑なのでライブラリに任せてしまった方が良い気がする。
busboy



