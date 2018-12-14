var WxParse = require("../../../wxParse/wxParse.js"), app = getApp();

Page({
    data: {
        logs: []
    },
    onLoad: function() {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: app.globalData.Headcolor
        }), this.Notice();
    },
    Notice: function() {
        var o = this;
        app.util.request({
            url: "entry/wxapp/Notice",
            method: "POST",
            success: function(a) {
                var t = a.data.data;
                o.setData({
                    Notice: t
                });
            }
        });
    }
});