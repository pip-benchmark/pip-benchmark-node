"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require('util');
class Formatter {
    static padLeft(value, length, padSymbol) {
        let output = '';
        output += padSymbol;
        output += value;
        output += padSymbol;
        while (output.length < length + 2) {
            output = padSymbol + output;
        }
        return output;
    }
    static padRight(value, length, padSymbol) {
        let output = '';
        output += padSymbol;
        output += value;
        output += padSymbol;
        while (output.length < length + 2) {
            output += padSymbol;
        }
        return output;
    }
    static formatNumber(value, decimals = 2) {
        value = value || 0;
        return value.toFixed(decimals || 2);
    }
    static formatDate(date) {
        date = date || new Date();
        var value = date.toISOString();
        var pos = value.indexOf('T');
        return value.substring(0, pos);
    }
    static formatTime(date) {
        date = date || new Date();
        var value = date.toISOString();
        var pos = value.indexOf('T');
        value = value.substring(pos + 1);
        pos = value.indexOf('.');
        return pos > 0 ? value.substring(0, pos) : value;
    }
    static formatTimeSpan(ticks) {
        let millis = (ticks % 1000).toFixed(0);
        let seconds = ((ticks / 1000) % 60).toFixed(0);
        let minutes = ((ticks / 1000 / 60) % 60).toFixed(0);
        let hours = (ticks / 1000 / 60 / 60).toFixed(0);
        return util.format("%d:%d:%d.%d", hours, minutes, seconds, millis);
    }
}
exports.Formatter = Formatter;
//# sourceMappingURL=Formatter.js.map