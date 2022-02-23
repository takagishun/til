# お品書き

## WCAGにおける問題点

2017~2018で既存のガイドラインの問題点を調査された
- https://docs.google.com/presentation/d/1POs7orJ4ALB0bq5_vyo4v8RxDcr-5ctwD1noVgpXuJc/edit#slide=id.g321b341b2a_0_159
- https://www.w3.org/WAI/GL/task-forces/silver/wiki/Problem_Statements
- https://www.w3.org/TR/accessibility-conformance-challenges/

TODO: ↑まとめる。一部紹介する。

## WCAG3.0の要件

- https://w3c.github.io/silver/requirements/

WCAGにおける問題点を踏まえてWCAG3.0の要件が作成されている

TODO: ↑まとめる。一部紹介する。

## WCAG3.0の設計指針

WCAGにおける問題点を踏まえてWCAG3.0の設計指針が作成されている

## WCAG3.0の紹介

https://w3c.github.io/silver/guidelines/
https://w3c.github.io/silver/explainer/#guidelines-structure

- 構造
- 適合
- テスト
  - atomic test
  - holistic test
- スコアリング

> It has new scoring. Your site or product no longer has to pass 100% of the guidelines, as long as people with disabilities can use it.

2系の達成基準は1つでも基準に満たなかったらガイドラインに準拠してないことになるが、3.0では障害者が利用できる程度なら必ずしも100%達成する必要がなくなった。
目的が「準拠すること」ではなく、「アクセシブルにする」ことに意識を向けることができそうなので良い方向だと感じた。

## WCAG3.0に触れてみた感想

### 読みやすくなっている

- ガイドラインTOPページ自体がすっきりしている。アコーディオンなどをうまく活用し、みたい情報だけにアクセスできるようになっている。各周辺ドキュメントに情報をうまく移譲していてわかりやすい。
- 各ガイドラインをどう利用するかがわかるhow toというものが新設された。今まではunderstanding(達成基準に対する説明ドキュメント)しかなかったので、各ガイドラインで何をどうしたいのかがわかりにくかった。
  - 例えば: https://www.w3.org/WAI/GL/WCAG3/2021/how-tos/text-alternatives/
  - それぞれが何をすれば良いか、なぜするべきか、誰にメリットがあるかなどが平易な文で書かれていて、プランナー、デザイナー、開発者、テスター別に、何をしたら良いかが丁寧に書かれている、感動!
-

### 実際に障害者が使いやすいかを担保できる

WCAG2系でAAAに適合しても、実際に障害者にとって使いやすくなっているかを担保する仕組みはなかった。
3.0ではテストの仕組みが変わり、実際障害者が使用するハードウェアや支援技術を使用したユーザビリティテストが加わることで、実際に障害者が使いやすいかを担保できるようになるっぽい。


