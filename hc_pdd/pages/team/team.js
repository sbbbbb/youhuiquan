var app = getApp(), pageNum = 0;

Page({
    data: {
        yiji: [ "一级", "二级", "三级" ],
        chshi: 0
    },
    onLoad: function(a) {
        var t = Number(this.data.chshi) + 1;
        this.team(t), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: app.globalData.Headcolor
        });
    },
    team: function(a) {
        var i = this;
        app.util.request({
            url: "entry/wxapp/myteam",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                level: a
            },
            success: function(a) {
                var t = a.data.data.info, e = a.data.data.data, o = a.data.data.list, n = t.fx_level;
                i.setData({
                    yuca: e,
                    info: t,
                    goodslist: o,
                    fx_level: n
                });
            }
        });
    },
    jaizai: function(a) {
        var o = this, n = o.data.goodsist;
        app.util.request({
            url: "entry/wxapp/myteam",
            method: "POST",
            data: {
                pageNum: a,
                user_id: app.globalData.user_id
            },
            success: function(a) {
                for (var t = a.data.data.list, e = 0; e < t.length; e++) n.push(t[e]);
                o.setData({
                    goodsist: n
                });
            }
        });
    },
    onReachBottom: function() {
        console.log(this.data.goods), pageNum++, this.jaizai(pageNum);
    },
    qiehuan: function(a) {
        var t = Number(a.currentTarget.dataset.index) + 1;
        a.currentTarget.dataset.index;
        this.setData({
            chshi: a.currentTarget.dataset.index
        }), this.team(t);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onShareAppMessage: function() {}
});