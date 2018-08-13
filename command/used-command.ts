// http://www.techscore.com/tech/DesignPattern/Command.html/#dp22-2
// をTypeScriptに書き直したもの

namespace UsedCommand {
  export class Beaker {
    private water = 0;
    private salt = 0;
    private melted = false;

    constructor(water: number, salt: number) {
      this.water = water;
      this.salt = salt;
      this.mix();
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

  // 実験コマンドのスーパークラス（Commandオブジェクトの共通のインターフェイス）
  export class Command {
    // リクエストを実行する抽象メソッド
    public execute(): void {
      throw new Error('Abstract method!');
    }
  }

  // 食塩を1gずつ加える実験コマンドクラス（Commandオブジェクト）
  export class AddSaltCommand extends Command {
    private beaker: Beaker;

    constructor(beaker: Beaker) {
      super();
      this.beaker = beaker;
    }

    public execute(): void {
      // 食塩を1gずつ加えて飽和食塩水を作る実験をする場合
      // 完全に溶けている間は食塩を加える
      while (this.beaker.isMelted()) {
        this.beaker.addSalt(1); // 食塩を1g入れる
        this.beaker.mix(); // かき混ぜる
      }

      // 実験結果をノートに記述する
      console.log('水を10gずつ加える実験');
      this.beaker.note();
    }
  }

  // 水を10gずつ加える実験コマンドクラス（Commandオブジェクト）
  export class AddWaterCommand extends Command {
    private beaker: Beaker;

    constructor(beaker: Beaker) {
      super();
      this.beaker = beaker;
    }

    public execute(): void {
      // 水を10gずつ加えて飽和食塩水を作る実験をする場合
      // 溶け残っている間は水を加える
      while (!this.beaker.isMelted()) {
        this.beaker.addWater(10); // 水を10g入れる
        this.beaker.mix(); // かき混ぜる
      }

      // 実験結果をノートに記述する
      console.log('水を10gずつ加える実験');
      this.beaker.note();
    }
  }

  const commandAddSaltCommand = new AddSaltCommand(new Beaker(100, 0));
  const commandAddWater = new AddWaterCommand(new Beaker(0, 10));

  commandAddSaltCommand.execute();
  commandAddWater.execute();
}
