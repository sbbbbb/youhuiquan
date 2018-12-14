var app = getApp();

Page({
    data: {
        us: [ "全部", "已成团", "已确认收货", "审核成功", "审核失败" ]
    },
    onLoad: function(a) {
        var t = a.chshi;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: app.globalData.Headcolor
        });
        var o = app.globalData.userInfo;
        this.setData({
            userInfo: o,
            chshi: t
        }), this.Orderlist(t);
    },
    qiehuan: function(a) {
        var t = this, o = (t.data.chshi, a.currentTarget.dataset.index);
        t.setData({
            chshi: a.currentTarget.dataset.index
        }), t.Orderlist(o);
    },
    Orderlist: function(a) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/Orderlist",
            method: "POST",
            data: {
                order_status: a,
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data;
                o.setData({
                    Orderlist: t
                });
            },
            fail: function(a) {
                console.log("失败" + a);
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