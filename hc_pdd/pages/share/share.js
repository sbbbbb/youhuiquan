var app = getApp();

Page({
    data: {
        imgUrls: [ {
            xian: !1,
            img: "../../resource/images/3f324f22fd3acff9407605642d12ebsa7.png"
        }, {
            xian: !1,
            img: "../../resource/images/3f324f22fd3acff9407605642d12ebsa7.png"
        }, {
            xian: !1,
            img: "../../resource/images/3f324f22fd3acff9407605642d12ebsa7.png"
        } ],
        shu: 0
    },
    onLoad: function(a) {
        var t = this, o = app.globalData.openId, s = a.user_id, e = a.goods_id;
        s = null != s ? a.user_id : app.globalData.user_id, t.setData({
            goods_id: e,
            openId: o,
            user_id: s
        }), console.log(t.data.user_id), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: app.globalData.Headcolor
        }), app.util.request({
            url: "entry/wxapp/Goodsdetail",
            method: "POST",
            data: {
                goods_id_list: e,
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var o = a.data.data;
                t.setData({
                    goods: o
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        }), t.Shareurl();
    },
    Shareurl: function() {
        var s = this;
        app.util.request({
            url: "entry/wxapp/Shareurl",
            method: "POST",
            data: {
                goods_id: s.data.goods_id,
                user_id: app.globalData.user_id
            },
            success: function(a) {
                app.globalData.we_app_info = a.data.data.we_app_info;
                var o = a.data.data.we_app_info, t = a.data.data.wenan;
                s.setData({
                    we_app_info: o,
                    wenan: t
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    pengyiud: function() {
        var o = this;
        wx.showLoading({
            title: "图片保存中"
        }), app.util.request({
            url: "entry/wxapp/Create",
            method: "POST",
            data: {
                goodname: o.data.goods.goods_name,
                yuanjia: o.data.goods.min_group_price,
                xianjia: o.data.goods.now_price,
                youhuiquan: o.data.goods.coupon_discount,
                src_path: o.data.goods.goods_gallery_urls[0],
                user_id: app.globalData.user_id,
                path: app.globalData.we_app_info.page_path,
                goods_id: o.data.goods_id
            },
            success: function(a) {
                o.bao();
            },
            fail: function(a) {
                o.bao();
            }
        });
    },
    bao: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/CreatePoster",
            method: "POST",
            success: function(a) {
                var o = a.data.data;
                t.setData({
                    imgcxs: o
                }), wx.downloadFile({
                    url: t.data.imgcxs,
                    success: function(a) {
                        console.log(a);
                        var o = a.tempFilePath;
                        wx.showToast({
                            title: "保存成功",
                            icon: "success",
                            duration: 2e3
                        }), wx.saveImageToPhotosAlbum({
                            filePath: o,
                            success: function(a) {
                                console.log(a);
                            },
                            fail: function(a) {}
                        });
                    }
                });
            },
            fail: function(a) {
                console.log(a), console.log("失败" + a);
            }
        });
    },
    copy: function() {
        var a;
        a = this.data.wenan, wx.setClipboardData({
            data: a,
            success: function(a) {
                wx.getClipboardData({
                    success: function(a) {
                        console.log(a.data);
                    }
                });
            }
        });
    },
    duabnb: function() {
        this.data.imgcxs;
        this.setData({
            fenxia: !1
        }), wx.clearStorageSync();
    },
    baocun: function() {
        wx.downloadFile({
            url: this.data.imgcxs,
            success: function(a) {
                console.log(a);
                var o = a.tempFilePath;
                wx.showToast({
                    title: "保存成功",
                    icon: "success",
                    duration: 2e3
                }), wx.saveImageToPhotosAlbum({
                    filePath: o
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var o = this, t = o.data.goods.goods_thumbnail_url, s = o.data.goods.goods_name, e = o.data.goods.goods_title;
        return o.setData({
            goods_src: t,
            goods_name: s,
            goods_title: e
        }), {
            title: o.data.goods_title,
            path: "hc_pdd/pages/details/details?goods_id=" + o.data.goods_id + "&user_id=" + o.data.user_id,
            imageUrl: o.data.goods_src,
            success: function(a) {},
            fail: function(a) {}
        };
    }
});