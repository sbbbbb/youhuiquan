var app = getApp();

Page({
    data: {
        wenzi: [ {
            name: "问题1",
            checked: 0,
            daan: "答案1"
        }, {
            name: "问题2",
            checked: 0,
            daan: "答案2"
        }, {
            name: "问题3",
            checked: 0,
            daan: "答案3"
        }, {
            name: "问题4",
            checked: 0,
            daan: "答案4"
        }, {
            name: "问题5",
            checked: 0,
            daan: "答案5"
        }, {
            name: "问题6",
            checked: 0,
            daan: "答案6"
        } ]
    },
    onLoad: function(a) {
        this.Headcolor();
    },
    Headcolor: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Headcolor",
            method: "POST",
            success: function(a) {
                var o = a.data.data.config.search_color, e = a.data.data.config.share_icon;
                a.data.data.config.head_color;
                app.globalData.Headcolor = a.data.data.config.head_color;
                var n = a.data.data.config.title, t = a.data.data.yesno, c = a.data.data.config.shenhe, d = a.data.data.config.text;
                i.setData({
                    search_color: o,
                    share_icon: e,
                    yesno: t,
                    shenhe: c,
                    text: d
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: app.globalData.Headcolor
                }), wx.setNavigationBarTitle({
                    title: n
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    dinajf: function(a) {
        for (var o = a.currentTarget.dataset.index, e = [], n = this.data.wenzi, t = 0; t < n.length; t++) n[t].checked = 0, 
        n[o].checked = 1, e.push(n[t]);
        console.log(n), this.setData({
            wenzi: e
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});