"use strict";

function init() {
    var e = require("../../lib/react.js"),
        t = require("../../cssStr/cssStr.js"),
        a = require("../../stores/webviewStores.js"),
        i = 2,
        s = 3,
        o = e.createClass({
            displayName: "WebviewAuthorizeDialog",
            getInitialState: function() {
                return { authorizeSdkId: 0, appicon_url: "", appname: 0, scope_list: [], webviewID: parseInt(this.props.webviewID) }
            },
            _authorizeSdkShowDialog: function(e, t, a, o, l) {
                for (var r = 0; r < l.length; ++r) {
                    var c = l[r];
                    c.auth_state == s ? c.checked = !0 : c.checked = c.auth_state == i
                }
                this.setState({ authorizeSdkId: t, appicon_url: a, appname: o, scope_list: l }), this.props.showAuthorizeDialog(!0)
            },
            componentDidMount: function() { a.on("SHOW_AUTHORIZE_SDK_DIALOG_" + this.state.webviewID, this._authorizeSdkShowDialog) },
            componentWillUnmount: function() { a.removeListener("SHOW_AUTHORIZE_SDK_DIALOG_" + this.state.webviewID, this._authorizeSdkShowDialog) },
            handleOnAllow: function() { this.props.getSimulatorActions("S_AUTHORIZE_SDK_RETURN", this.state.webviewID, { authorizeSdkId: this.state.authorizeSdkId, scope_list: this.state.scope_list, isAllowed: !0 }), this.props.showAuthorizeDialog(!1) },
            handleOnCancel: function() { this.props.getSimulatorActions("S_AUTHORIZE_SDK_RETURN", this.state.webviewID, { authorizeSdkId: this.state.authorizeSdkId, scope_list: this.state.scope_list, isAllowed: !1 }), this.props.showAuthorizeDialog(!1) },
            _checkboxChange: function(e) {
                var t = this,
                    a = this.state.scope_list;
                return function() { a[e].checked = !a[e].checked, t.setState({ scope_list: a }) }
            },
            render: function() {
                for (var a = this.props.show ? { position: "absolute", width: "200px", top: "0" } : t.displayNone, i = this.state.scope_list, o = [], l = 0; l < i.length; ++l) {
                    var r = i[l];
                    if (r.auth_state == s) o.push(e.createElement("li", { key: r.scope }, e.createElement("i", { className: "simulator-authorize-dialog-readonly" }), r.desc));
                    else {
                        var c = "authorize_checkbox" + l,
                            h = !!r.checked;
                        o.push(e.createElement("li", { key: r.scope }, e.createElement("label", { className: "simulator-authorize-dialog-checkbox", htmlFor: c }, e.createElement("input", { id: c, type: "checkbox", checked: h, onChange: this._checkboxChange(l) }), e.createElement("i", null)), e.createElement("span", { onClick: this._checkboxChange(l) }, r.desc)))
                    }
                }
                return e.createElement("div", { style: a, className: "simulator-authorize-dialog-wrapper" }, e.createElement("div", { className: "simulator-authorize-dialog-mask" }), e.createElement("div", { className: "simulator-authorize-dialog" }, e.createElement("div", { className: "simulator-authorize-dialog-hd" }, e.createElement("h3", { className: "simulator-authorize-dialog-title" }, "微信登陆")), e.createElement("div", { className: "simulator-authorize-dialog-bd" }, e.createElement("img", { className: "simulator-authorize-dialog-logo", width: "100", src: this.state.appicon_url }), e.createElement("p", { className: "simulator-authorize-dialog-tips" }, this.state.appname, " 申请获得以下权限："), e.createElement("ul", { className: "simulator-authorize-dialog-list" }, o)), e.createElement("div", { className: "simulator-authorize-dialog-ft" }, e.createElement("a", { href: "javascript:;", onClick: this.handleOnAllow }, "允许"), e.createElement("a", { href: "javascript:;", onClick: this.handleOnCancel }, "拒绝"))))
            }
        });
    _exports = o
}
var _exports;
init(), module.exports = _exports;
