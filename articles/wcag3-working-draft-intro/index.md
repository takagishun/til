WCAG 3.0 が 2021 年 1 月に Working Draft として公開されてました。
Recommendation になるのはだいぶ先ですが、動向を定期的に追って行こうと思います。

# Silver / WCAG 3.0 とは?

## Silver

W3C WAI の Accessibility Guidelines Working Group が、次世代のガイドラインを開発するために立ち上げたプロジェクト名。Accessibility Guidelines(Ag) を「銀」の化学記号を見立てて「Silver」と名付けられた

## WCAG 3.0

Silver で開発されているガイドライン名  
W3C Accessibility Guidelines 3.0 の略
ちなみに WCAG2 系は Web Contents Accessibility Guidelines の略
Web 以外の幅広い範囲も対象としていることが明示的に表現された

**※まだまだ開発中のため業務でアクセシビリティ対応するときは WCAG 3.0 は参考にしないこと**

# WCAG 3.0 開発背景

WCAG2 系は 10 年以上の歴史があるが、これまでのモデルでは最近の技術の変化や障害者のニーズの変化などに対応しにくくなった。  
そこでより包括的かつ柔軟な新しいモデルが必要となり今回 3.0 の開発がされた。
開発するにあたり様々な調査が行われている。

## WCAG & Silver 簡易年表

- 2008 年 12 月
  - WCAG 2.0 Recommendation
- 2017~18 年
  - Silver Research Project
- 2018 年 3 月
  - Silver Design Sprint
- 2018 年 6 月
  - WCAG 2.1 Recommendation
- 2020 年 2 月
  - WCAG 2.2 Working Draft 公開
- 2021 年 1 月
  - WCAG 3.0 Working Draft 公開
- 2021 年 6 月
  - WCAG 3.0 Working Draft 更新
- 2021 年 12 月
  - WCAG 3.0 Working Draft 更新

## Silver Research Project

2017〜2018 年にかけてこれまでのアクセシビリティガイドラインの構造に対する問題点が調査された。
公開された資料の一部を転載する。内容が面白いのでぜひ資料を読んでみてほしいです。

- ユーザビリティ

  - 読むのも訳すのも難しすぎる。
  - 初心者にとっつきにくい
  - 成功基準の解釈が曖昧。アクセシビリティの専門家により、ガイドラインの解釈が異なる。

- 適合性モデル
  - 厳密なテスト可能性に対する制約がある
  - 手動テストは、テスト担当者によって知識や優先順位が異なるため、異なる結果を得ることにも関連する。
- メンテナンス
  - 技術の進歩に合わせて更新でき、発見しやすく、より役立つ情報を提供するための柔軟性がない。
  - 新しく変化する技術に対応した更新が難しい。時間がかかる

調査結果の概要:
[Research Summary](https://docs.google.com/presentation/d/1POs7orJ4ALB0bq5_vyo4v8RxDcr-5ctwD1noVgpXuJc/edit#slide=id.gc6f73a04f_0_0)
[Problem Statements](https://www.w3.org/WAI/GL/task-forces/silver/wiki/Problem_Statements#Too_Difficult_to_Read)

## その他の調査

大規模かつ頻繁に更新される動的な Web アプリケーションにおいてアクセシビリティの評価や適合性をどのように適用するかという課題に対する調査・提案
[Challenges with Accessibility Guidelines Conformance and Testing, and Approaches for Mitigating Them](https://www.w3.org/TR/accessibility-conformance-challenges/)

## Silver Design Sprint

2018 年 3 月 18~19 日の 2 日間に専門家 30 名ほどで行われたミーティング

- この 1 年間のリサーチを元に、現在のアクセシビリティガイドラインの問題点が整理された
- その問題に対する解決方法やプロトタイプが提案された

[Report of Silver Design Sprint](https://www.w3.org/community/silver/draft-final-report-of-silver/)  
[参加者リスト](https://www.w3.org/WAI/GL/task-forces/silver/wiki/Design_Sprint_Participants)

# 関連ドキュメント

WCAG 3.0 にはいくつか関連するドキュメントがあるので一部紹介する

## Requirements for WCAG 3.0

WCAG 3.0 における要件  
W3C の勧告候補の段階で使用され、勧告候補移行の際に要件が満たされたことが報告される

[最新 Editor’s Draft](https://w3c.github.io/silver/requirements/)  
[最新 Working Draft](https://www.w3.org/TR/wcag-3.0-requirements/)

## Explainer for WCAG 3.0

WCAG 3.0 の解説書

- WCAG 3.0 開発の背景
- WCAG 3.0 の目標
- 設計上の決定事項の説明
- WCAG 2 ガイドラインとの相違点

[最新 Editor’s Draft](https://w3c.github.io/silver/explainer/)  
[最新 Working Draft](https://www.w3.org/TR/wcag-3.0-explainer/)

## WCAG 3.0 本体

[最新 Editor’s Draft](https://w3c.github.io/silver/guidelines/)
[最新 Working Draft](https://www.w3.org/TR/wcag-3.0/)

# WCAG 3.0 コンテンツ紹介

Working Draft になってまもないので、コンテンツは変更される事が前提だが、一部紹介

## スコアリングの導入

今まで達成基準が達成しているかを評価するテストは合格・不合格の 2 択だったが、合格・不合格に加えて、スケール評価(1,2,3,4 で評価)、パーセンテージ評価などが追加され、テストが柔軟になった。その評価を元にガイドライン全体のスコアを出せるようになった。
合格・不合格の 2 択では評価できない、主に認知障害や知的障害のある人のニーズをサポートするためのガイドライン項目が取り込みやすくなっている。

## Holistic tests の導入

Holistic tests とは、障害者が使用するハードウェアやソフトウェア（支援技術）を使ったユーザビリティテストやマニュアルテストのこと。
WCAG 2 系までの達成基準(WCAG 3.0 では「Outcomes」と呼ばれる)を評価するテストは、Atomic tests を呼ぶようになる。
Holistic tests を導入することで、アクセシビリティ対応が実際に障害者のユーザービリティ向上に繋がるようになることが期待される。
Holistic tests の詳細はまだ決まってない。

## 適合レベルの変更

WCAG2 系までは、A,AA,AAA だったが、 Bronze, Silver, Gold に変更になった。
AA がおおよそ Bronze に対応する(厳密には違う)。Bronze は Atomic tests のスコアの結果で判定される。Silver, Gold は Bronze が達成されているのが前提で、さらに Holistic tests を突破する必要がある。

## how to ドキュメントの導入

各ガイドライン毎に紐づく説明資料が導入された。2 系では understanding というドキュメントが達成基準毎に用意されていたが、立ち位置はそれに似ている。 なぜそのガイドラインが存在しているのかだったり、そのガイドラインに対応すると誰が救われるのかなどのわかりやすい説明がある。個人的に良いと思ったのは、プロジェクトの各フェーズでそれぞれの担当者が考えるべきポイントについてこのように説明があるところ。

https://www.w3.org/TR/wcag-3.0/#text-alternatives
https://www.w3.org/WAI/GL/WCAG3/2021/how-tos/text-alternatives/

# 今後の動き

今はまだ新しい構造に対するフィードバック/ブラッシュアップ期間  
要件や、新しいスコアリングや適合レベルに対して、フィードバックをもらいながら改善しているフェーズ。個別のガイドラインが決定されるのは 2024 年予定。  
Recommendation になるのは 2026 Q2 予定。まだまだ先。。

https://github.com/w3c/silver/wiki
[WCAG 3.0 Schedule](https://docs.google.com/spreadsheets/d/1yzR1H0SnNFRELGchb_BJr4Necsrj6xVjDF1n7Tc0kTc/edit#gid=1414406908)

# 参考となる資料

基本 1 次情報を見るのが良いと思うが、以下の資料で概要を日本語でまとめてくれている

https://docs.google.com/presentation/d/1yP_8JGcRLwghdApymX1Yj6SuFudLaybaeAjvRRuDZWg/edit#slide=id.p
