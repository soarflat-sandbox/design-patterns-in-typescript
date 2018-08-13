"use strict";
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
var CommandPattern;
(function (CommandPattern) {
    var Command = /** @class */ (function () {
        function Command() {
        }
        Command.prototype.execute = function () {
            throw new Error('Abstract method!');
        };
        return Command;
    }());
    CommandPattern.Command = Command;
    var ConcreteCommand1 = /** @class */ (function (_super) {
        __extends(ConcreteCommand1, _super);
        function ConcreteCommand1(receiver) {
            var _this = _super.call(this) || this;
            _this.receiver = receiver;
            return _this;
        }
        ConcreteCommand1.prototype.execute = function () {
            console.log('`execute` method of ConcreteCommand1 is being called!');
            this.receiver.action();
        };
        return ConcreteCommand1;
    }(Command));
    CommandPattern.ConcreteCommand1 = ConcreteCommand1;
    var ConcreteCommand2 = /** @class */ (function (_super) {
        __extends(ConcreteCommand2, _super);
        function ConcreteCommand2(receiver) {
            var _this = _super.call(this) || this;
            _this.receiver = receiver;
            return _this;
        }
        ConcreteCommand2.prototype.execute = function () {
            console.log('`execute` method of ConcreteCommand2 is being called!');
            this.receiver.action();
        };
        return ConcreteCommand2;
    }(Command));
    CommandPattern.ConcreteCommand2 = ConcreteCommand2;
    var Invoker = /** @class */ (function () {
        function Invoker() {
            this.commands = [];
        }
        Invoker.prototype.storeAndExecute = function (cmd) {
            this.commands.push();
            cmd.execute();
        };
        return Invoker;
    }());
    CommandPattern.Invoker = Invoker;
    var Receiver = /** @class */ (function () {
        function Receiver() {
        }
        Receiver.prototype.action = function () {
            console.log('action is being called!');
        };
        return Receiver;
    }());
    CommandPattern.Receiver = Receiver;
})(CommandPattern || (CommandPattern = {}));
(function main() {
    var receiver = new CommandPattern.Receiver();
    var command1 = new CommandPattern.ConcreteCommand1(receiver);
    var command2 = new CommandPattern.ConcreteCommand2(receiver);
    var invoker = new CommandPattern.Invoker();
})();
