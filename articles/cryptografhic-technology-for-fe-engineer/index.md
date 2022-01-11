# TLSで学ぶ暗号技術

## TLSとは

インターネットの仕組みの根幹であるTCP/IPプロトコルではセキュリティが考慮されていません。HTTP通信もそのプロトコル上で行われるので安全ではありません。安全ではない基盤の中でセキュアな通信を実現するために生まれたのがTransport Layer Security (以下 TLS)というプロトコルです。

TLSはネットワーク階層で見るとアプリケーション層とセッション層の間に位置します。簡単にいうと、データ送信時には上層から受け取った平文を暗号化処置をして下層に転送、逆にデータ受信時には下層から暗号データを受け取り復号して上層(アプリケーション層)に渡すわけです。ただセキュアな通信ためには、様々な仕組みが必要であり、それを一つずつ理解していきたいと思います。

TODO: 図

<table>
<tr>
<th>階層名</th>
<th>説明</th>
<th>プロトコル</th>
</tr>
<tr>
<td>アプリケーション層</td>
<td>アプリケーションデータを扱う</td>
<td>HTTP</td>
</tr>
<tr>
<td>プレゼンテーション層</td>
<td>データの表現、変換、暗号化を扱う</td>
<td>SSL/TLS</td>
</tr>
<tr>
<td>セッション層</td>
<td>複数のコネクションを管理</td>
<td>-</td>
</tr>
<tr>
<td>トランスポート層</td>
<td>データ通信の制御</td>
<td>TCP</td>
</tr>
<tr>
<td>ネットワーク層</td>
<td>インターネットワークでの通信</td>
<td>IP</td>
</tr>
<tr>
<td>データリンク層</td>
<td>ローカルなデータリンクにおける通信(LAN)</td>
<td>Ethernet</td>
</tr>
<tr>
<td>物理層</td>
<td>物理的なデータのやり取り(ケーブル)</td>
<td>CAT5</td>
</tr>
</table>


## 情報セキュリティーと暗号技術

セキュアな通信を実現するのがTLSですが、そもそもセキュリティとはなんでしょうか?    
日本産業規格（JIS）では以下のように定義されています。
> 情報セキュリティとは、情報の機密性、安全性、及び可用性を維持すること。さらに真正性、責任追跡性、否認防止、信頼性などの特性を維持することを含めることもある。(※JIS Q 27000より)

TLSでは、情報セキュリティの中でも機密性、安全性、真正性を満たすために設計されてます。
そして主にこの3つの性質を満たすために暗号技術が使われるのです。


<table>
<tr>
<td>機密性</td>
<td>認可した人以外はアクセスできない事。秘匿性。</td>
</tr>
<tr>
<td>安全性</td>
<td>データは改竄や削除がされていない事。</td>
</tr>
<tr>
<td>真正性</td>
<td>その人が本物であること。</td>
</tr>
</table>

## 安全な通信をするために必要なもの

より具体的にセキュアな通信についてどのようなものか、そして何が必要そうかイメージしてみましょう。  

- 平文をそのまま送ると盗聴されるので、平文を解読不可能な暗号化する必要がある。暗号化するための処理が必要。
- 届いた暗号文を読むためには平文に戻す(復号)ための処理が必要がある。
- 暗号化と復号は同じ処理を利用する? 違う鍵でする? その処理(特に復号処理)は誰でも簡単に予想できないものでなくてはならない。
- 暗号と復号で同じ処理を使うとすると、他の人にはバレないように事前に処理方法の共有が必要がある。しかもその通信はまだ暗号化できない。
- 今鍵共有しようとしている相手が偽物かもしれないので、本物か証明/検証するための仕組みが必要
- 晴れて暗号化されて届いたメッセージも正しいとは限らない。途中で暗号文が別の暗号文に置き換えられているかもしれないのでメッセージが改竄されてないことを証明/検証する仕組みが必要

TODO: 図

## セキュア通信について自分で考えてみる

## 暗号技術

暗号技術は、様々な要素技術によって構成されています。

- 暗号化/復号
  - 共通鍵暗号
    - ストリーム暗号、ブロック暗号
  - 公開鍵暗号
- 認証
  - MAC(メッセージ認証コード)
  - 署名
- ハッシュ
- 鍵共有


## TLSのプロトコル

- TLSは主にレコードプロトコルとそのサブプロトコルであるハンドシェイクプロトコルで構成される


## レコードプロトコル

- ペイロードに上位プロトコルであるハンドシェイクプロトコル、アラートプロトコル、暗号仕様変更プロトコル、アプリケーションデータプロトコルをカプセル化する
- 主な役割
  - 適切なレコードの分割
    - レコードサイズが 16384 バイトに収まるようにデータを分割し、一つのレコードを作成する
    - 各レコードのヘッダーにコンテントタイプ、プロトコルのバージョン、レコード長、ペイロードに分割したアプリケーションデータが格納される
  - ペイロードの保護/脱保護
    - ハンドシェイク時にClient-Server間で取り決めした暗号方式で暗号化する
    - TLS1.3の暗号方式ではAEAD(認証付き暗号)が必須になった
    - AES-GCMやCHACHA20_POLY1305など
    - ハンドシェイクのClientHelloとServerHelloは暗号方式の取り決めや鍵共有をする必要があるので暗号化はされない
    - それ以降は暗号化される
  - 安全性の検証
  - 次のネットワークレイヤにデータの転送を行う

```
struct {
  ContentType type;
  ProtocolVersion legacy_record_version; uint16 length;
  opaque fragment[TLSPlaintext.length];
} TLSPlaintext;
enum {
  invalid(0),
  change_cipher_spec(20),
  alert(21),
  handshake(22),
  application_data(23),
  (255)
} ContentType;
 
```

## ハンドシェイクプロトコル

## ClientHelloメッセージ

- 必要なフィールドはRandom、 CipherSuite、Extensionの3つのみ
- 他にもフィールドがあるがTLS1.3では利用しない
  - session IDやVersion(プロトコルバージョン)はダミー値が入る
  - 利用しないフィールドを残す理由は相互運用上の都合のため
- Randomフィールド
  - 32バイトの暗号学的にランダムなデータを格納する
  - ハンドシェイクを一意にする
- CipherSuiteフィールド
  - クライアントが対応可能な暗号スイートを優先度順に提示
  - TLS1.3で使える暗号スイートは5つのみ。どれもAEAD(認証付き暗号)で
    - TLS_AES_128_GCM_SHA256
    - TLS_AES_256_GCM_SHA384
    - TLS_CHACHA20_POLY1305_SHA256
    - TLS_AES_128_CCM_SHA256
    - TLS_AES_128_CCM_8_SHA256
- Extensionフィールド
  - 拡張
  - supported_groups
    - 提案する鍵交換アルゴリズムを順番に並べる
    - 前方秘密(PFS)がある鍵交換アルゴリズムのみ使用可能
      - DHEおよびECDHEのみ
      - RSAや静的DHは使えない
  - key_share
    - 鍵交換アルゴリズム(group)とそれに必要なに必要な情報(Key Exchange)をセットで任意数提供する。
  - supported_versions
    - 本当のバージョン番号はここで提示される

## ServerHelloメッセージ

- Clientとほぼ同じ構造
- 決定した暗号スイートと鍵交換方式などをクライアントに返す

## 鍵交換方式DHEの仕組み

TODO
https://milestone-of-se.nesuke.com/nw-basic/tls/diffie-hellman-summary/  
これ読む。 DHEパラメータの仕様
https://datatracker.ietf.org/doc/html/rfc7919

- DH鍵交換とHKDF(鍵導入)でPS(前方秘匿性)が得られる

## 暗号スイートAES_GCMの仕組み

## Certificateメッセージ

- 証明書の送信
- 認証。真正性。
- 基本サーバー証明書のみ
- 暗号化されて送られる

## 証明書の検証

- OSに用意されたルートCA証明書を利用して、サーバ証明書を本物かどうか検証する
- 証明書の検証手順
  - https://datatracker.ietf.org/doc/html/rfc5280

## CertificateVerifyメッセージ

- サーバー証明書の秘密鍵を保持していることの証明をするためのメッセージ
- 暗号化されて送られる
- 署名対象コンテンツ
  - トランスクリプトハッシュ
    - 各ハンドシェイクメッセージの連結のハッシュを計算
- 署名に使用される秘密鍵
  - サーバー証明書の秘密鍵
- このメッセージを受け取ったクライアントは、サーバー証明書の公開鍵で検証する

```
struct {
    SignatureScheme algorithm;
    opaque signature<0..2^16-1>;
} CertificateVerify;
```

## Server Finishedメッセージ

- ハンドシェイクの一連のメッセージの完全性を検証
- verify_dataはトランスクリプトハッシュ(Client Hello~CertificateVerify)と鍵スケジュール(HKDF)
  で生成したbaseKeyのserver_handshake_traffic_secretをfinished_keyにしてHMACした値
- 暗号化されて送られる
- 受け取ったら検証する

## Client Finishedメッセージ

- 同様にハンドシェイクの一連のメッセージの完全性を検証
- verify_dataはトランスクリプトハッシュ(Client Hello~CertificateVerify)と鍵スケジュール(HKDF)
  で生成したbaseKeyのclient_handshake_traffic_secretをfinished_keyにしてHMACしたMAC値
- 暗号化されて送られる
- 受け取ったら検証する

```
struct {
opaque verify_data[Hash.length];
} Finished;
```

```
verify_data = HMAC(finished_key,
Transcript-Hash(Handshake Context, Certificate*, CertificateVerify*))
```

## HMACについて

## 鍵スケジュール(HKDF)

## まとめ

TODO

# RFC

TLS1.2: https://datatracker.ietf.org/doc/html/rfc5246
TLS1.3: https://datatracker.ietf.org/doc/html/rfc8446
暗号と認証の仕組みがわかる教科書 プロフェッショナルSSL/TLS 暗号技術入門 【図解】ネットワーク/サーバ/セキュリティの基礎から応用まで







