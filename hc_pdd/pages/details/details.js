var app = getApp();

Page({
    data: {
        imgUrls: [ "../../images/3f324f22fd3acff9407605642d12ebsa7.png", "../../images/3f324f22fd3acff9407605642d12ebsa7.png", "../../images/3f324f22fd3acff9407605642d12ebsa7.png" ],
        fen: 0,
        is_index: 0,
        myuser_id: 1
    },
    onLoad: function(a) {
        var e = this, t = e.data.myuser_id, o = app.globalData.openId, i = a.user_id, n = a.goods_id;
        if (e.setData({
            openId: o
        }), null != a.user_id && null == app.globalData.user_id) {
            t = 0;
          console.log("dddddxxxx" + s);

            if (null != o) {
              console.log("dddddxxxx");
                var s = e.data.fen;
                i = a.user_id;
                e.setData({
                    fen: 0,
                    user_id: i
                });
            } else {
                i = a.user_id, s = 1;
                e.setData({
                    fen: s,
                    user_id: i
                });
            }
            e.setData({
                myuser_id: t,
                openId: o
            });
        } else {
            i = app.globalData.user_id;
            o = app.globalData.openId, t = 1, s = e.data.fen;
          console.log("ddsssdddxxxx" + s);

            e.setData({
                user_id: i,
                fen: s,
                myuser_id: t,
                openId: o
            });
        }
      console.log("ddssssxw3dddxxxx" + s);

        e.setData({
            goods_id: n,
            myuser_id: t,
            user_id: i,
            openId: o,
            fen: s
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: app.globalData.Headcolor
        }), app.util.request({
            url: "entry/wxapp/Goodsdetail",
            method: "POST",
            data: {
                goods_id_list: n,
                user_id: e.data.user_id
            },
            success: function(a) {
                var t = a.data.data;
                e.setData({
                    goods: t
                });
            },
            fail: function(a) {}
        }), e.Shareurl(), e.Headcolor();
    },
    Shareurl: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Shareurl",
            method: "POST",
            data: {
                goods_id: e.data.goods_id,
                user_id: e.data.user_id
            },
            success: function(a) {
                app.globalData.we_app_info = a.data.data.we_app_info;
                var t = a.data.data.we_app_info;
                e.setData({
                    we_app_info: t
                });
            },
            fail: function(a) {}
        });
    },
    submitInfotwo: function(a) {
        console.log("获取id");
        var t = a.detail.formId;
        console.log(t), console.log("获取formid结束"), this.setData({
            formid: t
        }), app.util.request({
            url: "entry/wxapp/formid",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                formid: this.data.formid
            },
            success: function(a) {
                app.util.request({
                    url: "entry/wxapp/Formid",
                    method: "POST",
                    data: {
                        user_id: app.globalData.user_id
                    },
                    success: function(a) {
                        console.log(a);
                    }
                });
            }
        });
    },
    submitInfodetails: function(a) {
        this.submitInfotwo(a), this.fanhui();
    },
    submitInfomai: function(a) {
        this.submitInfotwo(a);
    },
    submitInfen: function(a) {
        this.submitInfotwo(a), this.fen();
    },
    Headcolor: function() {
        var p = this;
        app.util.request({
            url: "entry/wxapp/Headcolor",
            method: "POST",
            data: {
                user_id: p.data.user_id
            },
            success: function(a) {
                var t = a.data.data.config;
                console.log("sdfdf" + JSON.stringify(t));
                var e = t.client_id, o = t.client_secret, i = t.pid, n = t.enable, s = a.data.data.config.shenhe, d = a.data.data.config.is_index, u = a.data.data.is_daili;
                console.log(n);
                var r = t.zzappid;
                if (wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: a.data.data.config.head_color
                }), p.setData({
                    config: t,
                    client_id: e,
                    client_secret: o,
                    pid: i,
                    enable: n,
                    shenhe: s,
                    is_index: d,
                    appid: r,
                    is_daili: u
                }), 0 == n) {
                    r = p.data.appid;
                    var c = "/hc_zhongzhuan/pages/index/index?goods_id=" + p.data.goods_id + "&user_id=" + p.data.user_id + "&client_id=" + p.data.client_id + "&client_secret=" + p.data.client_secret + "&pid=" + p.data.pid;
                    p.setData({
                        appid: r,
                        path: c
                    });
                } else app.util.request({
                    url: "entry/wxapp/Shareurl",
                    method: "POST",
                    data: {
                        goods_id: p.data.goods_id,
                        user_id: p.data.user_id
                    },
                    success: function(a) {
                        app.globalData.we_app_info = a.data.data.we_app_info;
                        var t = a.data.data.we_app_info, e = t.app_id, o = t.page_path;
                        p.setData({
                            appid: e,
                            path: o
                        });
                    },
                    fail: function(a) {}
                });
            }
        });
    },
    mai: function() {
        var a = this;
        0 == a.data.enable ? wx.navigateToMiniProgram({
            appId: a.data.appid,
            path: "/hc_zhongzhuan/pages/index/index?goods_id=" + a.data.goods_id + "&user_id=" + a.data.user_id + "&client_id=" + a.data.client_id + "&client_secret=" + a.data.client_secret + "&pid=" + a.data.pid,
            extraData: {},
            envVersion: "release",
            success: function(a) {
                console.log("成功");
            },
            fail: function(a) {
                console.log(a);
            }
        }) : wx.navigateToMiniProgram({
            appId: a.data.we_app_info.app_id,
            path: a.data.we_app_info.page_path,
            extraData: {
                user_id: a.data.user_id
            },
            envVersion: "release",
            success: function(a) {
                console.log("成功");
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    Goodszhuce: function() {
        app.util.request({
            url: "entry/wxapp/Goodszhuce",
            method: "POST",
            data: {
                user_id: this.data.user_id,
                myuser_id: this.data.myuser_id
            },
            success: function(a) {
                console.log(a);
            }
        });
    },
    onReady: function() {},
    fen: function() {
        wx.navigateTo({
            url: "../share/share?goods_id=" + this.data.goods_id + "&user_id=" + this.data.user_id
        });
    },
    fanhui: function() {
        console.log(111), wx.switchTab({
            url: "../index/index"
        });
    },
    getUserInfo: function(t) {
        var e = this;
        wx.getSetting({
            success: function(a) {
                a.authSetting["scope.userInfo"] ? (e.login(t), wx.showLoading({
                    title: "登录中..."
                })) : wx.showModal({
                    title: "提示",
                    content: "获取用户信息失败,需要授权才能继续使用！",
                    showCancel: !1,
                    confirmText: "授权",
                    success: function(a) {
                        a.confirm && wx.openSetting({
                            success: function(a) {
                                a.authSetting["scope.userInfo"] ? wx.showToast({
                                    title: "授权成功"
                                }) : wx.showToast({
                                    title: "未授权..."
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    register: function(c) {
        var p = this;
        wx.getStorage({
            key: "user",
            success: function(a) {
                var t, e = (t = a.data.detail).openid, o = t.session_key, i = (t = t.userInfo).country, n = t.province, s = t.city, d = t.gender, u = t.nickName, r = t.avatarUrl;
                app.util.request({
                    url: "entry/wxapp/Goodszhuce",
                    method: "post",
                    dataType: "json",
                    data: {
                        user_id: p.data.user_id,
                        openid: e,
                        session_key: o,
                        nickname: u,
                        gender: d,
                        country: i,
                        province: n,
                        city: s,
                        avatar: r
                    },
                    success: function(a) {
                        app.globalData.user_id = a.data.data, p.setData({
                            myuser_id: a.data.data
                        }), "function" == typeof c && c(a.data.data);
                    }
                });
            },
            fail: function(a) {}
        });
    },
    login: function(e) {
        var o = this;
        app.globalData.userInfo ? "function" == typeof cb && cb(app.globalData.userInfo) : wx.login({
            success: function(a) {
                var t = e.detail;
                app.globalData.userInfo = t.userInfo, t.act = "autologin", t.code = a.code, app.util.request({
                    url: "entry/wxapp/getopenid",
                    method: "post",
                    dataType: "json",
                    data: t,
                    success: function(a) {
                        0 == a.data.errno && (t.session_key = a.data.data.session_key, t.openid = a.data.data.openid, 
                        app.globalData.userInfo = t, wx.setStorageSync("user", e), "function" == typeof cb && cb(app.globalData.userInfo), 
                        o.register(function(a) {}));
                    }
                });
            },
            fail: function(a) {
                console.log("获取失败");
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var t = this;
        return "button" === a.from && console.log(a.target), {
            title: t.data.goods.goods_name,
            path: "hc_pdd/pages/details/details?goods_id=" + t.data.goods.goods_id + "&user_id=" + t.data.user_id + "&appid=" + t.data.we_app_info.app_id + "&path=" + t.data.guanggao_lujing,
            imageUrl: t.data.goods.goods_thumbnail_url,
            success: function(a) {},
            fail: function(a) {}
        };
    }
});