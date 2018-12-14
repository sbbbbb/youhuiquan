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
        thiseven: 0,
        gun: !0,
        text: [ "综合", "佣金比例", "销量", "价格" ],
        zoor: 0,
        searchinput: "",
        rankno: 0,
        loding: !0
    },
    bindchange: function(a) {
        this.setData({
            tuhight: a.detail.current
        });
    },
    onLoad: function(a) {
        var t = a.screen_id, e = this;
        e.setData({
            qieone: 0,
            qietwo: 0,
            qiethree: 0,
            screen_id: t
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: app.globalData.Headcolor
        }), e.Headcolor(), e.shangpin(t);
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
        this.submitInfotwo(a), this.details(a);
    },
    bindHideKeyboard: function(a) {
        var t = a.detail.value;
        this.setData({
            inputValue: t
        });
    },
    bindViewTap: function() {
        console.log("搜索");
        var n = this, a = n.data.inputValue;
        n.setData({
            inputValue: a
        }), app.util.request({
            url: "entry/wxapp/Showlist",
            method: "POST",
            data: {
                inputValue: a,
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.list, e = a.data.data.banner, i = a.data.data.nav;
                n.setData({
                    goodsist: t,
                    banner: e,
                    nav: i
                }), console.log(t.length);
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    quxiao: function(a) {
        console.log("删除文字");
        this.data.inputValue, this.data.goodsist;
        this.setData({
            searchinput: "",
            inputValue: "",
            goodsist: null
        });
    },
    shangpin: function(a) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Showlist",
            data: {
                screen_id: a,
                user_id: app.globalData.user_id
            },
            method: "POST",
            success: function(a) {
                var t = a.data.data.list;
                a.data.data.banner, a.data.data.nav;
                e.setData({
                    goodsist: t
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    tu: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Share",
            method: "POST",
            success: function(a) {
                a.data.data.fenxtu;
                t.setData({
                    goodsist: goodsist
                });
            }
        });
    },
    fenlei: function(a) {
        var n = this, t = a.currentTarget.dataset.screen_id;
        n.setData({
            screen_id: t
        }), app.util.request({
            url: "entry/wxapp/Showlist",
            method: "POST",
            data: {
                screen_id: t,
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.list, e = a.data.data.banner, i = a.data.data.nav;
                n.setData({
                    goodsist: t,
                    banner: e,
                    nav: i
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    jaizai: function(a) {
        var t, i = this, n = i.data.goodsist, e = i.data.screen_id;
        app.util.request({
            url: "entry/wxapp/Showlist",
            method: "POST",
            data: (t = {
                pageNum: a,
                screen_id: e,
                rankno: i.data.rankno
            }, _defineProperty(t, "screen_id", i.data.screen_id), _defineProperty(t, "user_id", app.globalData.user_id), 
            t),
            success: function(a) {
                for (var t = a.data.data.list, e = 0; e < t.length; e++) n.push(t[e]);
                i.setData({
                    goodsist: n,
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
        var t = a.currentTarget.dataset.id, e = a.currentTarget.dataset.hui;
        wx.navigateTo({
            url: "../details/details?goods_id=" + t + "&hui=" + e
        });
    },
    swiperChange: function(a) {
        this.setData({
            swiperCurrent: a.detail.current
        });
    },
    dianji: function(a) {
        var t = this, e = t.data.inputValue;
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
    Headcolor: function() {
        var o = this;
        app.util.request({
            url: "entry/wxapp/Headcolor",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.search_color, e = a.data.data.config.share_icon, i = a.data.data.config.shenhe, n = a.data.data.config, s = a.data.data.is_daili;
                o.setData({
                    search_color: t,
                    share_icon: e,
                    shenhe: i,
                    config: n,
                    is_daili: s
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    paixu: function(a, t) {
        var n = this;
        a = a;
        n.setData({
            rankno: a
        }), app.util.request({
            url: "entry/wxapp/Goodslist",
            method: "POST",
            data: {
                rankno: n.data.rankno,
                inputValue: t,
                screen_id: n.data.screen_id
            },
            success: function(a) {
                var t = a.data.data.list, e = a.data.data.banner, i = a.data.data.nav;
                n.setData({
                    goodsist: t,
                    banner: e,
                    nav: i
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    onShareAppMessage: function(a) {
        if ("button" === a.from) {
            var t = this, e = a.target.dataset.src, i = a.target.dataset.id, n = a.target.dataset.name, s = a.target.dataset.goods_title;
            return t.setData({
                goods_src: e,
                goods_id: i,
                goods_name: n,
                goods_title: s
            }), {
                title: t.data.goods_title,
                path: "hc_pdd/pages/details/details?goods_id=" + t.data.goods_id + "&user_id=" + app.globalData.user_id,
                imageUrl: t.data.goods_src,
                success: function(a) {},
                fail: function(a) {}
            };
        }
        var o = (t = this).data.config;
        return t.setData({
            config: o
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