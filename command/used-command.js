"use strict";
// http://www.techscore.com/tech/DesignPattern/Command.html/#dp22-2
// をTypeScriptに書き直したもの
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UsedCommand;
(function (UsedCommand) {
    var Beaker = /** @class */ (function () {
        function Beaker(water, salt) {
            this.water = 0;
            this.salt = 0;
            this.melted = false;
            this.water = water;
            this.salt = salt;
            this.mix();
        }
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
        return Beaker;
    }());
    UsedCommand.Beaker = Beaker;
    // 実験コマンドのスーパークラス（Commandオブジェクトの共通のインターフェイス）
    var Command = /** @class */ (function () {
        function Command() {
        }
        // リクエストを実行する抽象メソッド
        Command.prototype.execute = function () {
            throw new Error('Abstract method!');
        };
        return Command;
    }());
    UsedCommand.Command = Command;
    // 食塩を1gずつ加える実験コマンドクラス（Commandオブジェクト）
    var AddSaltCommand = /** @class */ (function (_super) {
        __extends(AddSaltCommand, _super);
        function AddSaltCommand(beaker) {
            var _this = _super.call(this) || this;
            _this.beaker = beaker;
            return _this;
        }
        AddSaltCommand.prototype.execute = function () {
            // 食塩を1gずつ加えて飽和食塩水を作る実験をする場合
            // 完全に溶けている間は食塩を加える
            while (this.beaker.isMelted()) {
                this.beaker.addSalt(1); // 食塩を1g入れる
                this.beaker.mix(); // かき混ぜる
            }
            // 実験結果をノートに記述する
            console.log('水を10gずつ加える実験');
            this.beaker.note();
        };
        return AddSaltCommand;
    }(Command));
    UsedCommand.AddSaltCommand = AddSaltCommand;
    // 水を10gずつ加える実験コマンドクラス（Commandオブジェクト）
    var AddWaterCommand = /** @class */ (function (_super) {
        __extends(AddWaterCommand, _super);
        function AddWaterCommand(beaker) {
            var _this = _super.call(this) || this;
            _this.beaker = beaker;
            return _this;
        }
        AddWaterCommand.prototype.execute = function () {
            // 水を10gずつ加えて飽和食塩水を作る実験をする場合
            // 溶け残っている間は水を加える
            while (!this.beaker.isMelted()) {
                this.beaker.addWater(10); // 水を10g入れる
                this.beaker.mix(); // かき混ぜる
            }
            // 実験結果をノートに記述する
            console.log('水を10gずつ加える実験');
            this.beaker.note();
        };
        return AddWaterCommand;
    }(Command));
    UsedCommand.AddWaterCommand = AddWaterCommand;
    var commandAddSaltCommand = new AddSaltCommand(new Beaker(100, 0));
    var commandAddWater = new AddWaterCommand(new Beaker(0, 10));
    commandAddSaltCommand.execute();
    commandAddWater.execute();
})(UsedCommand || (UsedCommand = {}));
