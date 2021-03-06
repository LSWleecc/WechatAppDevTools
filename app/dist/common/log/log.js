"use strict";

function init() {
    var e, t = require("fs"),
        i = require("log"),
        r = require("path"),
        o = require("../../config/dirConfig.js"),
        s = o.WeappLog,
        a = 10;
    if (global.isDev || process.execPath.match("nw.exe") || process.execPath.match("nwjs.app")) e = console;
    else {
        var n = JSON.parse(localStorage.logFiles || "[]"),
            l = new Date,
            g = l.getFullYear() + "-" + (l.getMonth() + 1) + "-" + l.getDate() + "-" + l.getHours() + "-" + l.getMinutes() + "-" + l.getMilliseconds() + ".log",
            c = r.join(s, g);
        if (n.length > a) {
            var p = n.shift();
            t.unlink(p, function() {})
        }
        n.push(c), localStorage.setItem("logFiles", JSON.stringify(n)), e = new i("info", t.createWriteStream(c))
    }
    _exports = e
}
var _exports;
init(), module.exports = _exports;
