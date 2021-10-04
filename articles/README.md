#  概要

画像アップロード機能を実装する上で、学んだことを共有する。
* MIMEType毎に違うリクエストボディ
* 画像アップロード時に指定するべきMIMEType
* サーバーサイドでの受け取り方


# MIMEType毎に違うリクエストボディ

## application/x-www-form-urlencoded

画像アップロードする際にはこのMIME Typeは使用しないが、HTML formのデフォルトの指定なので紹介する。

``` html
<form method="POST">
    <input type="text" name="textfield">
    <input type="file" name="filefield">
    <input type="submit">
</form>
```
↑のようにHTMLのFormでPOSTする時、特に`enctype`属性を指定しない場合、
リクエストbodyのタイプは`application/x-www-form-urlencoded`になる

`application/x-www-form-urlencoded`ではリクエストbodyは 
`key=value`の形でキーと値の一組になり、`&`で区切られてエンコードされ
キーや値の英数字以外の文字は、パーセントエンコーディングされる。
なのでバイナリには向かないらしい。

↓ textとpngファイルを`application/x-www-form-urlencoded` でpostした時のリクエストbody。  
nodejsではそもそもファイルのバイナリは受け取れないのだろうか?

```
text=aaa&file=index.png
```

## multipart/form-data

ともあれ、バイナリデータを扱う場合は `multipart/form-data` を使用する。
HTMLのFormタグでは`enctype`を指定することで可能になる。

```html
<form method="POST" enctype="multipart/form-data">
    <input type="text" name="textfield">
    <input type="file" name="filefield">
    <input type="submit">
</form>
```

`multipart/form-data` の場合リクエストは全く異なる形式になり、
multipartという名の通り、リクエストヘッダーのcontent-typeのboundaryに記載されている文字列(`------WebKitFormBoundaryx3hBAQSURnKvmgYA--`)でformデータが区切られ、各partごとにContent-DispositionとContent-Typeが記載される。

↓ リクエストheaderのcontent-type
```html
multipart/form-data; boundary=----WebKitFormBoundaryx3hBAQSURnKvmgYA
```

↓ リクエストbody。画像のバイナリを受け取っていることがわかる。
```
------WebKitFormBoundaryx3hBAQSURnKvmgYA
Content-Disposition: form-data; name="text"

aaa
------WebKitFormBoundaryx3hBAQSURnKvmgYA
Content-Disposition: form-data; name="file"; filename="index.png"
Content-Type: image/png

�PNG

IHDR��|�Z
...省略
@�"0t?@  `聒E$`�~�@@��%�H�������J����C�,"C��(YD��
                                                =P��
                                                   z�d  � 0�@�"0t?@  `聒E$`�~�@@��%�H�������J����C�,"C��(YD�}���F[�IEND�B`�
------WebKitFormBoundaryx3hBAQSURnKvmgYA--

```

## application/octet-stream
