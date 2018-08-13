"use strict";
// http://www.techscore.com/tech/DesignPattern/Command.html/#dp22-2
// をTypeScriptに書き直したもの
var UnusedCommand;
(function (UnusedCommand) {
    var Beaker = /** @class */ (function () {
        function Beaker(water, salt) {
            this.water = 0;
            this.salt = 0;
            this.melted = false;
            this.water = water;
            this.salt = salt;
            this.mix();
        }
        Beaker.prototype.experiment = function (param) {
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
            }
            else if (param == Beaker.ADD_WATER) {
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
        };
        // ビーカーに食塩を入れる
        Beaker.prototype.addSalt = function (salt) {
            this.salt += salt;
        };
        // ビーカーに水を入れる
        Beaker.prototype.addWater = function (water) {
            this.water += water;
        };
        // 溶液をかき混ぜる
        Beaker.prototype.mix = function () {
            // 常温での飽和食塩水の濃度は約26.4%なので
            // それを下回ったら食塩が溶けたということになる
            if ((this.salt / (this.salt + this.water)) * 100 < 26.4) {
                this.melted = true;
            }
            else {
                this.melted = false;
            }
        };
        // 食塩を量を返す
        Beaker.prototype.getSalt = function () {
            return this.salt;
        };
        // 水の量を返す
        Beaker.prototype.getWater = function () {
            return this.water;
        };
        // 溶けたか溶け残ったか
        Beaker.prototype.isMelted = function () {
            return this.melted;
        };
        // 実験結果をノートに記録する
        Beaker.prototype.note = function () {
            console.log("\u6C34\uFF1A " + this.water + " g");
            console.log("\u98DF\u5869\uFF1A " + this.salt + " g");
            console.log("\u6FC3\u5EA6\uFF1A " + (this.salt / (this.water + this.salt)) * 100 + " %");
        };
        Beaker.ADD_SALT = 1; // 食塩を加えて、かき混ぜる場合
        Beaker.ADD_WATER = 2; // 水を加えて、かき混ぜる場合
        return Beaker;
    }());
    UnusedCommand.Beaker = Beaker;
    var beaker = new Beaker(100, 0);
    beaker.experiment(Beaker.ADD_SALT);
    var beaker2 = new Beaker(0, 10);
    beaker2.experiment(Beaker.ADD_WATER);
    // 以下のような新たな実験を追加したい場合
    // Beakerクラスもかなり修正する必要があるため、拡張性が低く良い設計とは言えない
    // const beaker3 = new Beaker(90, 10);
    // beaker3.experiment(Beaker.MAKE_SALT_WATER);
})(UnusedCommand || (UnusedCommand = {}));
