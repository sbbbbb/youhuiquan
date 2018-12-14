var app = getApp();

Page({
    data: {
        imgUrl: [],
        title_disabled: !0,
        management_good: !0,
        select_all: !1,
        middlearr: [],
        items: [ {
            name: "1",
            checked: !1
        }, {
            name: "2",
            checked: !1
        }, {
            name: "3",
            checked: !1
        }, {
            name: "4",
            checked: !1
        }, {
            name: "5",
            checked: !1
        }, {
            name: "6",
            checked: !1
        } ]
    },
    change_classname: function() {
        this.setData({
            title_disabled: !this.data.title_disabled
        });
    },
    finish_classname: function() {
        this.setData({
            title_disabled: !this.data.title_disabled
        });
    },
    select: function(e) {
        var a = this, t = [];
        if (0 != a.data.management_good) {
            var o = a.data.items, l = e.currentTarget.dataset.id;
            o[l].checked = !o[l].checked, console.log(o);
            for (var n = 0; n < o.length; n++) o[n].checked && t.push(o[n]);
            a.setData({
                items: o,
                middlearr: t
            });
        }
    },
    deleteitem: function() {
        var e = this.data.items, a = [];
        console.log(e);
        for (var t = 0; t < e.length; t++) 0 == e[t].checked && a.push(e[t]);
        this.setData({
            items: a,
            middlearr: []
        });
    },
    select_all: function() {
        var e = this;
        if (e.setData({
            select_all: !e.data.select_all
        }), e.data.select_all) {
            for (var a = e.data.items, t = [], o = 0; o < a.length; o++) 1 == a[o].checked || (a[o].checked = !0), 
            t.push(a[o]);
            e.setData({
                items: t,
                middlearr: t
            });
        }
    },
    select_none: function() {
        var e = this;
        e.setData({
            select_all: !e.data.select_all
        });
        for (var a = e.data.items, t = [], o = 0; o < a.length; o++) a[o].checked = !1, 
        t.push(a[o]);
        e.setData({
            items: t,
            middlearr: []
        });
    },
    onLoad: function(e) {
        this.Headcolor();
    },
    Headcolor: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Headcolor",
            method: "POST",
            success: function(e) {
                var a = e.data.data.config.head_color;
                app.globalData.Headcolor = e.data.data.config.head_color, t.setData({
                    Headcolor: a
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: app.globalData.Headcolor
                }), wx.setNavigationBarTitle({
                    title: title
                });
            },
            fail: function(e) {
                console.log("失败" + e);
            }
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