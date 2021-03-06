"use strict";

function init() {
    function e(e) {
        if (void 0 === e.device) t = "iOS" === e.os ? s.defaultUa : s.Android_useragent, w = 375, I = 627, v = 2;
        else {
            var i = _[e.device];
            t = i["user-agent"], w = i.screen.vertical.width, I = i.screen.vertical.height - 40, v = i.screen["device-pixel-ratio"]
        }
        t = t.replace("{{version}}", e.version)
    }
    var t, i = require("events").EventEmitter,
        r = require("../common/jssdk/sdk.js"),
        n = require("../common/getA8key/getA8key.js"),
        o = require("../config/errcodeConfig.js"),
        s = require("../config/config.js"),
        S = require("../common/log/log.js"),
        _ = require("../config/DeviceModules.js"),
        c = require("../config/wordingConfig.js"),
        u = {},
        f = {},
        E = 0,
        a = "iPhone 6",
        w = 375,
        I = 627,
        v = 2,
        m = "app/html/about.html",
        A = {},
        T = localStorage["webview-network-type"] ? localStorage["webview-network-type"] : "wifi",
        g = JSON.parse(localStorage.getItem("setting"));
    g ? e(g) : t = s.defaultUa.replace("{{version}}", s.defaultWechatVersion);
    var d = Object.assign({}, i.prototype, {
            addWebviewPorts: function(e, t) {
                return A[e] = t, A
            },
            delWebviewPorts: function(e) {
                return delete A[e], A
            },
            getNetworkType: function() {
                return T
            },
            setNetworkType: function(e) { T = e, localStorage["webview-network-type"] = T },
            getWebviewPorts: function() {
                return A
            },
            deleteWebviewID: function(e) { S.info("webviewStores.js deleteWebviewID " + e), this.emit("DELETE_WEBVIEW_ID", e) },
            changeWebviewID: function(e) { E = e, S.info("webviewStores.js changeWebviewID " + e), this.emit("CHANGE_WEBVIEW_ID", e) },
            getSnapShot: function(e) {
                return f[e]
            },
            setSnapShot: function(e, t) { f[e] = t, this.emit("SET_WEBVIEW_SNAPSHOT", e, t) },
            getInitURL: function() {
                return m
            },
            setInitURL: function(e) { m = e },
            getUA: function() {
                return t
            },
            setUA: function(i) { e(i), S.info("webviewStores.js setUA " + t), this.emit("SET_WEBVIEW_UA", t) },
            setInfo: function(e) { S.info("webviewStores.js setInfo " + JSON.stringify(e)), a = e.device, I = e.height, w = e.width, v = e.dpr, this.emit("SET_WEBVIEW_INFO", e) },
            getInfo: function() {
                return { model: a, dpr: v, width: w, height: I }
            },
            getOffset: function() {
                return { height: I, width: w, dpr: v }
            },
            getCurrentWebviewID: function() {
                return E
            },
            showShare: function(e, t) { this.emit("SHOW_SHARE_WEBVIEW_" + e, e, t) },
            stopPullDownRefresh: function() { this.emit("STOP_PULL_DOWN_REFRESH") },
            upStatus: function(e, t) { u[e] || (u[e] = {}), this.emit("UP_WEBVIEW_STATUS_" + e, e, t), this.emit("UP_WEBVIEW_STATUS", e, t) },
            setAction: function(e, t) { u[e] || (u[e] = {}), this.emit("SET_WEBVIEW_ACTION_" + e, e, t) },
            execJSSDK: function(e, t) {
                var i = this;
                u[e] || (u[e] = {}), S.info("webviewStores.js execJSSDK begin: " + e + " " + JSON.stringify(t)), r.exec(t, u[e], function(r, n, s) {
                    var _ = t.sdkName,
                        c = s.type;
                    if (S.info("webviewStores.js execJSSDK end: " + e + " " + _ + " " + c + " " + r + " " + JSON.stringify(n) + " " + JSON.stringify(s)), "CARD_SDK" === c && r) {
                        var f = s.error;
                        if (f) {
                            if (f.errcode === o.NOT_LIMITS_CARD) return S.info("webviewStores.js getA8key NOT_LIMITS_CARD"), void i.emit("NOT_LIMITS_CARD");
                            if (0 !== f.errcode) {
                                S.info("webviewStores.js getA8key " + f.errcode);
                                var E = require("../common/jssdk/sdkNameTrans.js");
                                return n = { errMsg: E.getSdkDisplayName(_) + ":fail" }, void i.emit("GET_JSSDK_RES_" + e, e, _, n, t.ext)
                            }
                        } else i.emit("CRAD_SDK_RES", e, _, n, r, t)
                    } else "PREVERIFY_SDK" === c ? (u[e].purviewFromPreVerify = s.purviewFromPreVerify || {}, t.sdkResExt = s, i.emit("GET_JSSDK_RES_" + e, e, _, n, t)) : "SHARE_SDK" === c ? i.emit("SHOW_SHARE_WEBVIEW_" + e, e, t, n) : "REGISTER_SDK" === c || ("INTERFACE_SDK" === c ? (i.emit("SET_INTERFACE_RES_" + e, e, _, r, t), i.emit("GET_JSSDK_RES_" + e, e, _, n, t.ext)) : "WEBVIEW_SDK" === c ? (i.emit("WEBVIEW_SDK", e, t, _, n), i.emit("GET_JSSDK_RES_" + e, e, _, n, t.ext)) : i.emit("GET_JSSDK_RES_" + e, e, _, n, t.ext))
                })
            },
            sendJSSDKRes: function(e, t, i, r) { this.emit("GET_JSSDK_RES_" + e, e, t, i, r) },
            getA8key: function(e, t) {
                var i = this;
                u[e] = {};
                var r = t.isSync;
                S.info("webviewStores.js getA8key begin: " + e + " " + JSON.stringify(t)), n.get(t, function(n) {
                    S.info("webviewStores.js getA8key end: " + JSON.stringify(n));
                    var s = n.baseresponse,
                        _ = parseInt(s.errcode);
                    if (_ === o.NOT_LOGIN) return S.info("webviewStores.js getA8key NOT_LOGIN"), void i.emit("NOT_LOGIN");
                    if (_ === o.NOT_LIMITS) return S.info("webviewStores.js getA8key NOT_LIMITS"), void i.emit("NOT_LIMITS");
                    if (_ === o.NOT_LIMITS_QY) return S.info("webviewStores.js getA8key NOT_LIMITS_QY"), void i.emit("NOT_LIMITS_QY");
                    if (_ === o.INVALID_LOGIN || _ === o.INVALID_TOKEN) return S.info("webviewStores.js getA8key INVALID_LOGIN"), void i.emit("INVALID_LOGIN");
                    u[e].purviewFormGetA8key = n.purviewFormGetA8key;
                    var f = n.resp_url;
                    if (r || _ === o.ILLEGAL_URL) return void setTimeout(function() { i.emit("SET_WEBVIEW_ACTION_" + e, e, { act: "load", url: f, from: t.from }) });
                    if (0 !== _) {
                        S.info("webviewStores.js getA8key " + _);
                        var E = require("../actions/windowActions.js");
                        return void E.showTipsMsg({ msg: c[0] + " " + _, type: "error" })
                    }
                    var a = /\#wechat_redirect$/.test(t.url);
                    return a && t.url.replace(/\#wechat_redirect$/, "") === f ? (f = f.replace(/\#wechat_redirect/, ""), S.info("webviewStores.js getA8key GETA_8KEY_NOT_SUPPORT " + f), void windowActions.showTipsMsg({ msg: "" + c[1], type: "error" })) : void 0
                })
            },
            getWebviewByID: function(e) {
                return u[e]
            },
            clearData: function(e) { this.emit("CLEAR_WEBVIEW_DATA", e) },
            setInterfaceFromPageFrame: function(e, t) { this.emit("SET_INTERFACT_FROMPAGEFRAME_" + e, t) },
            cleanWebview: function(e) { this.emit("CLEAN_WEBVIEW_" + e), this.emit("CLEAN_WEBVIEW", e) },
            asTojs: function(e) { this.emit("AS_TO_JS", e) },
            upASData: function(e, t) { this.emit("UP_AS_DATA", e, t) },
            asPublish: function(e) { this.emit("AS_PUBLISH", e) },
            postMessageToAS: function(e) { this.emit("POST_MSG_TOAS", e) },
            sendASSdk: function(e, t, i) { this.emit("SEND_AS_SDK", e, t, i) },
            authorizeSdkShowDialog: function(e, t, i, r, n) { this.emit("SHOW_AUTHORIZE_SDK_DIALOG_" + e, e, t, i, r, n) },
            authorizeSdkReturn: function(e, t, i) { this.emit("AUTHORIZE_SDK_RETURN_" + e, e, t, i) },
            showScanCodeDialog: function(e) { this.emit("SHOW_SCAN_CODE_DIALOG", e) },
            scanCodeReturn: function(e) { this.emit("SCAN_CODE_RETURN", e) }
        }),
        h = d.on,
        D = {};
    d.on = function() {
        var e = arguments,
            t = e[0];
        D[t] || (D[t] = 0), D[t]++, D[t] >= 10 && S.error("webviewStores.js on " + t + " - times: " + D[t]), h.apply(this, arguments)
    };
    var N = d.removeListener;
    d.removeListener = function() {
        var e = arguments,
            t = e[0];
        D[t] && D[t]--, D[t] >= 10 && S.error("webviewStores.js on " + t + " - times: " + D[t]), N.apply(this, arguments)
    }, _exports = d
}
var _exports;
init(), module.exports = _exports;
