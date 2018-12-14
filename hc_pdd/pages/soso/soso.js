var app = getApp();

Page({
    data: {},
    onLoad: function(o) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: app.globalData.Headcolor
        }), this.tudizhi();
    },
    onReady: function() {},
    submitInfotwo: function(o) {
        console.log("获取id");
        var t = o.detail.formId;
        console.log(t), console.log("获取formid结束"), this.setData({
            formid: t
        }), app.util.request({
            url: "entry/wxapp/formid",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                formid: this.data.formid
            },
            success: function(o) {
                app.util.request({
                    url: "entry/wxapp/Formid",
                    method: "POST",
                    data: {
                        user_id: app.globalData.user_id
                    },
                    success: function(o) {
                        console.log(o);
                    }
                });
            }
        });
    },
    submitInsearch: function(o) {
        this.submitInfotwo(o), this.search();
    },
    onShow: function() {
        this.tudizhi();
    },
    search: function() {
        wx.navigateTo({
            url: "../search/search"
        });
    },
    tudizhi: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Chaojiso",
            method: "POST",
            success: function(o) {
                var t = o.data.data;
                a.setData({
                    Notice: t
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});