"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChessAIWorker = void 0;
var ChessAIWorker = /** @class */ (function () {
    function ChessAIWorker(workerPath) {
        var _this = this;
        this.worker = null;
        this.listeners = [];
        this.worker = new Worker(workerPath);
        this.worker.onmessage = function (message) {
            if (_this.listeners[message.data.event]) {
                for (var _i = 0, _a = _this.listeners[message.data.event]; _i < _a.length; _i++) {
                    var event = _a[_i];
                    event.apply(event, message.data.arguments);
                }
            }
        };
    }
    ChessAIWorker.prototype.emit = function (event, data) {
        this.worker.postMessage(event);
    };
    ChessAIWorker.prototype.on = function (type, callback) {
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(callback);
    };
    ChessAIWorker.prototype.exec = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.worker.postMessage({
            method: method,
            arguments: Array.prototype.slice.call(arguments).slice(1)
        });
    };
    ChessAIWorker.prototype.destroy = function () {
        this.worker.terminate();
    };
    return ChessAIWorker;
}());
exports.ChessAIWorker = ChessAIWorker;
;
//# sourceMappingURL=ChessAIWorker.js.map