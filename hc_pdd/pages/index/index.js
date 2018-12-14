function _defineProperty(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var app = getApp(), pageNum = 0;

Page({
    data: {
        indicatorDots: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        circular: !0,
        previousmargin: "50rpx",
        nextmargin: "50rpx",
        indicatordots: !0,
        swiperCurrent: 0,
        tuhight: 0,
        thiseven: 0,
        gun: !0,
        text: [ "综合", "佣金比例", "销量", "价格" ],
        zoor: 0,
        paper: 0,
        shouquan: 0,
        loding: !0
    },
    bindchange: function(a) {
        this.setData({
            tuhight: a.detail.current
        });
    },
    submitInfo: function(a) {
        console.log("获取id"), console.log(a.detail.target.dataset.name);
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
                    url: "entry/wxapp/Canyusccess",
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
    zai: function() {
        this.data.shenhe;
        this.setData({
            shouquan: 0
        });
    },
    submitIntijiao: function(a) {
        this.submitInfotwo(a), this.fenlei(a);
    },
    submitInsearch: function(a) {
        this.submitInfotwo(a), this.search();
    },
    submitIntinan: function(a) {
        this.submitInfotwo(a), this.zhuti();
    },
    submitInjinri: function(a) {
        this.submitInfotwo(a), this.screen(a);
    },
    submitInfodetails: function(a) {
        this.submitInfotwo(a), this.details(a);
    },
    submitInxauioxi: function(a) {
        this.submitInfotwo(a), this.xauioxi(a);
    },
    submitInfolopes: function(a) {
        this.submitInfotwo(a), this.Redenvelopes();
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
    preventTouchMove: function() {},
    getUserInfo: function(t) {
        var e = this;
        wx.getSetting({
            success: function(a) {
                console.log(a), a.authSetting["scope.userInfo"] ? e.login(t) : wx.showModal({
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
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    login: function(e) {
        var i = this;
        app.globalData.userInfo ? ("function" == typeof cb && cb(app.globalData.userInfo), 
        i.register(function(a) {})) : wx.login({
            success: function(a) {
                var t = e.detail;
                app.globalData.userInfo = t.userInfo, t.act = "autologin", t.code = a.code, app.util.request({
                    url: "entry/wxapp/getopenid",
                    method: "post",
                    dataType: "json",
                    data: t,
                    success: function(a) {
                        0 == a.data.errno && (t.openid = a.data.data.openid, t.session_key = a.data.data.session_key, 
                        app.globalData.userInfo = t, app.globalData.session_key = a.data.data.session_key, 
                        wx.setStorageSync("user", e), "function" == typeof cb && cb(app.globalData.userInfo), 
                        i.register(function(a) {}), i.setData({
                            session_key: a.data.data.session_key
                        }));
                    }
                });
            },
            fail: function(a) {
                console.log("获取失败");
            }
        });
    },
    onLoad: function(a) {
        var t = this;
        t.setData({
            qieone: 0,
            qietwo: 0,
            qiethree: 0
        }), t.geezer(), t.Headcolor(), t.shangpin();
        var e = a.user_id;
        t.setData({
            activation: e
        }), console.log(a.user_id), console.log("接收首页user_id");
    },
    geezer: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Shenhe",
            method: "POST",
            success: function(a) {
                var t = a.data.data;
                1 == t.shenhe ? wx.reLaunch({
                    url: "../geezer/geezer?img=" + t.shenhe_pic
                }) : e.home();
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    shangpin: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Goodslist",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.list, e = a.data.data.toplist;
                i.setData({
                    goodsist: t,
                    toplist: e
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    zhuti: function() {
        0 == this.data.theme.jump ? wx.navigateTo({
            url: "../Preferential/Preferential"
        }) : wx.navigateTo({
            url: "../Extension/Extension"
        });
    },
    screen: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../screen/screen?screen_id=" + t
        });
    },
    xauioxi: function() {
        wx.navigateTo({
            url: "../logs/logs"
        });
    },
    tu: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Share",
            method: "POST",
            success: function(a) {
                var t = a.data.data.fenxtu;
                e.setData({
                    fenxtu: t
                });
            }
        });
    },
    fenlei: function(a) {
        var t = a.currentTarget.dataset.cateid;
        wx.navigateTo({
            url: "../classify/classify?cateid=" + t
        });
    },
    jaizai: function(a) {
        var i = this, o = i.data.goodsist;
        app.util.request({
            url: "entry/wxapp/Goodslist",
            method: "POST",
            data: {
                pageNum: a,
                user_id: app.globalData.user_id
            },
            success: function(a) {
                for (var t = a.data.data.list, e = 0; e < t.length; e++) o.push(t[e]);
                i.setData({
                    goodsist: o,
                    loding: !0
                });
            }
        });
    },
    onReachBottom: function() {
        console.log(this.data.goods), pageNum++, this.jaizai(pageNum), this.setData({
            loding: !1
        });
    },
    details: function(a) {
        var t = a.currentTarget.dataset.id, e = (a.currentTarget.dataset.jump, a.currentTarget.dataset.hui);
        "" != t && wx.navigateTo({
            url: "../details/details?goods_id=" + t + "&hui=" + e
        });
    },
    detailsaa: function(a) {
        var t = a.currentTarget.dataset.id, e = a.currentTarget.dataset.jump, i = a.currentTarget.dataset.hui;
        if (1 == e) "" != t && wx.navigateTo({
            url: "../details/details?goods_id=" + t + "&hui=" + i
        }); else if (2 == e) wx.navigateTo({
            url: "../classify/classify?cateid=" + t
        }); else if (3 == e) {
            var o = a.currentTarget.dataset.appid, s = a.currentTarget.dataset.path;
            wx.navigateToMiniProgram({
                appId: o,
                path: s,
                extraData: {
                    user_id: this.data.user_id
                },
                envVersion: "release",
                success: function(a) {
                    console.log("成功");
                },
                fail: function(a) {
                    console.log(a);
                }
            });
        } else if (4 == e) wx.reLaunch({
            url: "../soso/soso"
        }); else if (5 == e) {
            var n = a.currentTarget.dataset.diypic;
            wx.navigateTo({
                url: "../danye/danye?diypic=" + n
            });
        }
    },
    search: function() {
        wx.navigateTo({
            url: "../search/search"
        });
    },
    dianji: function(a) {
        var t = this, e = t.data.cateid;
        null == e && (e = "");
        var i = a.currentTarget.dataset.index;
        if (0 == i) {
            t.data.qieone;
            0 == t.data.qieone ? (t.setData({
                qieone: 0
            }), t.paixu(0, e)) : (t.setData({
                qieone: 1
            }), t.paixu(1, e));
        }
        if (1 == i) {
            t.data.qieone;
            1 == t.data.qieone ? (t.setData({
                qieone: 2
            }), t.paixu(2, e)) : (t.setData({
                qieone: 1
            }), t.paixu(1, e));
        } else 1 != i && t.setData({
            qieone: 0
        });
        if (2 == i) {
            t.data.qietwo;
            1 == t.data.qietwo ? (t.setData({
                qietwo: 2
            }), t.paixu(6, e)) : (t.setData({
                qietwo: 1
            }), t.paixu(5, e));
        } else 2 != i && t.setData({
            qietwo: 0
        });
        if (3 == i) {
            t.data.qiethree;
            1 == t.data.qiethree ? (t.setData({
                qiethree: 2
            }), t.paixu(4, e)) : (t.setData({
                qiethree: 1
            }), t.paixu(3, e));
        } else 2 != i && t.setData({
            qiethree: 0
        });
        t.setData({
            thiseven: a.currentTarget.dataset.index
        });
    },
    qirw: function(a) {
        this.setData({
            zoor: a.currentTarget.dataset.index
        });
    },
    paixu: function(a, t) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Goodslist",
            method: "POST",
            data: {
                rankno: a,
                cateid: t,
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.list;
                e.setData({
                    goodsist: t
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    Headcolor: function() {
        var x = this;
        app.util.request({
            url: "entry/wxapp/Headcolor",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t;
                console.log(a);
                var e = a.data.data.yesno, i = a.data.data.config.search_color, o = a.data.data.config.share_icon;
                a.data.data.config.head_color;
                app.globalData.Headcolor = a.data.data.config.head_color;
                var s = a.data.data.config.title, n = a.data.data.banner, r = a.data.data.nav, d = a.data.data.show, u = a.data.data.config.shenhe, c = a.data.data.config.text, l = a.data.data.theme, p = a.data.data.config, f = (p.enable, 
                a.data.data.hongbao), g = a.data.data.hb, h = a.data.data.is_daili;
                x.setData((_defineProperty(t = {
                    banner: n,
                    yesno: e,
                    nav: r,
                    show: d,
                    search_color: i,
                    share_icon: o,
                    shenhe: u,
                    text: c,
                    theme: l,
                    config: p,
                    hongbao: f
                }, "config", p), _defineProperty(t, "hb", g), _defineProperty(t, "is_daili", h), 
                t)), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: app.globalData.Headcolor
                }), wx.setNavigationBarTitle({
                    title: s
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    Redenvelopes: function() {
        this.data.paper;
        this.setData({
            paper: 0
        }), app.util.request({
            url: "entry/wxapp/Hblog",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {},
            fail: function(a) {
                console.log("失败" + a);
            }
        }), this.Hongbaolist();
    },
    Hongbaolist: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Hongbaolist",
            method: "POST",
            data: {
                user_id: app.globalData.user_id,
                hbmoney: i.data.hbmoney
            },
            success: function(a) {
                var t = a.data.data.list, e = a.data.data;
                i.setData({
                    goodsist: t,
                    goodsistcsa: e
                }), wx.navigateTo({
                    url: "../redpacket/redpacket?goodsistcsa=" + e.hongbao.end_time + "&hubo=" + !0 + "&endtime=" + i.data.hb.endtime
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    fenxaiocsdad: function() {
        this.setData({
            showModalStatus: !1
        });
    },
    home: function() {
        var t = this;
        wx.getSetting({
            success: function(a) {
                if (a.authSetting["scope.userInfo"]) wx.checkSession({
                    success: function(a) {
                        t.register(function(a) {});
                    },
                    fail: function(a) {
                        t.data.shouquan;
                        t.setData({
                            shouquan: 1
                        });
                    }
                }); else {
                    t.data.shouquan;
                    t.setData({
                        shouquan: 1
                    });
                }
            }
        });
    },
    register: function(c) {
        var l = this;
        wx.getStorage({
            key: "user",
            success: function(a) {
                var t = a.data.detail.userInfo;
                app.globalData.openId = a.data.detail.openid, app.globalData.userInfo = a.data.detail.userInfo;
                var e = a.data.detail.openid;
                app.globalData.openId = a.data.detail.openid;
                var i = a.data.detail.session_key;
                app.globalData.session_key = a.data.detail.session_key;
                var o = (t = a.data.detail.userInfo).country, s = t.province, n = t.city, r = t.gender, d = t.nickName, u = t.avatarUrl;
                app.util.request({
                    url: "entry/wxapp/zhuce",
                    method: "post",
                    dataType: "json",
                    data: {
                        openid: e,
                        session_key: i,
                        nickname: d,
                        gender: r,
                        country: o,
                        province: s,
                        city: n,
                        avatar: u
                    },
                    success: function(a) {
                        l.data.shouquan;
                        l.setData({
                            shouquan: 0
                        }), app.globalData.user_id = a.data.data, l.Headcolor(), l.shangpin(), l.hinf(), 
                        "function" == typeof c && c(a.data.data);
                    }
                });
            },
            fail: function(a) {
                l.data.shouquan;
                l.setData({
                    shouquan: 1
                });
            }
        });
    },
    onShow: function() {
        this.geezer();
    },
    hinf: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Headcolor",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.hongbao, e = t.is_open;
                i.setData({
                    hongbao: t,
                    paper: e
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    onShareAppMessage: function(a) {
        if ("button" === a.from) {
            var t = this, e = a.target.dataset.src, i = a.target.dataset.id, o = a.target.dataset.name, s = a.target.dataset.goods_title;
            return t.setData({
                goods_src: e,
                goods_id: i,
                goods_name: o,
                goods_title: s
            }), {
                title: t.data.goods_title,
                path: "hc_pdd/pages/details/details?goods_id=" + t.data.goods_id + "&user_id=" + app.globalData.user_id,
                imageUrl: t.data.goods_src,
                success: function(a) {},
                fail: function(a) {}
            };
        }
        var n = (t = this).data.config;
        return t.setData({
            config: n
        }), 0 == t.data.is_daili ? {
            title: t.data.config.indextitle,
            path: "hc_pdd/pages/index/index",
            imageUrl: t.data.config.indexpic,
            success: function(a) {},
            fail: function(a) {}
        } : {
            title: t.data.config.indextitle,
            path: "hc_pdd/pages/index/index?user_id=" + app.globalData.user_id,
            imageUrl: t.data.config.indexpic,
            success: function(a) {},
            fail: function(a) {}
        };
    }
});