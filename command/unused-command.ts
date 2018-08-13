// http://www.techscore.com/tech/DesignPattern/Command.html/#dp22-2
// をTypeScriptに書き直したもの

namespace UnusedCommand {
  export class Beaker {
    private water = 0;
    private salt = 0;
    private melted = false;

    public static ADD_SALT = 1; // 食塩を加えて、かき混ぜる場合
    public static ADD_WATER = 2; // 水を加えて、かき混ぜる場合

    constructor(water: number, salt: number) {
      this.water = water;
      this.salt = salt;
      this.mix();
    }

    public experiment(param: number): void {
      if (param == Beaker.ADD_SALT) {
        // 食塩を1gずつ加えて飽和食塩水を作る実験をする場合
        // 完全に溶けている間は食塩を加える
        while (this.isMelted()) {
          this.addSalt(1); // 食塩を1g入れる
          this.mix(); // かき混ぜる
        }

        // 実験結果をノートに記述する
        console.log('食塩を1gずつ加える実験');
        this.note();
      } else if (param == Beaker.ADD_WATER) {
        // 水を10gずつ加えて飽和食塩水を作る実験をする場合
        // 溶け残っている間は水を加える
        while (!this.isMelted()) {
          this.addWater(10); // 水を10g入れる
          this.mix(); // かき混ぜる
        }

        // 実験結果をノートに記述する
        console.log('水を10gずつ加える実験');
        this.note();
      }
    }

    // ビーカーに食塩を入れる
    public addSalt(salt: number): void {
      this.salt += salt;
    }

    // ビーカーに水を入れる
    public addWater(water: number): void {
      this.water += water;
    }

    // 溶液をかき混ぜる
    public mix(): void {
      // 常温での飽和食塩水の濃度は約26.4%なので
      // それを下回ったら食塩が溶けたということになる
      if ((this.salt / (this.salt + this.water)) * 100 < 26.4) {
        this.melted = true;
      } else {
        this.melted = false;
      }
    }

    // 食塩を量を返す
    public getSalt(): number {
      return this.salt;
    }

    // 水の量を返す
    public getWater(): number {
      return this.water;
    }

    // 溶けたか溶け残ったか
    public isMelted(): boolean {
      return this.melted;
    }

    // 実験結果をノートに記録する
    public note(): void {
      console.log(`水： ${this.water} g`);
      console.log(`食塩： ${this.salt} g`);
      console.log(`濃度： ${(this.salt / (this.water + this.salt)) * 100} %`);
    }
  }

  const beaker = new Beaker(100, 0);
  beaker.experiment(Beaker.ADD_SALT);

  const beaker2 = new Beaker(0, 10);
  beaker2.experiment(Beaker.ADD_WATER);

  // 以下のような新たな実験を追加したい場合
  // Beakerクラスもかなり修正する必要があるため、拡張性が低く良い設計とは言えない
  // const beaker3 = new Beaker(90, 10);
  // beaker3.experiment(Beaker.MAKE_SALT_WATER);
}
