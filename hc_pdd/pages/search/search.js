var app = getApp(), pageNum = 0;

Page({
    data: {
        goodsist: [],
        thiseven: 0,
        gun: !0,
        text: [ "综合", "佣金比例", "销量", "价格" ],
        zoor: 0,
        searchinput: "",
        rankno: 0,
        tiaotwo: 7
    },
    bindchange: function(a) {
        this.setData({
            tuhight: a.detail.current
        });
    },
    onLoad: function() {
        var a = this;
        a.setData({
            qieone: 0,
            qietwo: 0,
            qiethree: 0
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: app.globalData.Headcolor
        }), a.Headcolor(), a.History();
    },
    bindHideKeyboard: function(a) {
        var t = a.detail.value;
        console.log(t), this.setData({
            inputValue: t
        });
    },
    bindViewTap: function() {
        console.log("搜索");
        var s = this, a = s.data.inputValue;
        s.setData({
            inputValue: a
        }), app.util.request({
            url: "entry/wxapp/Soso",
            method: "POST",
            data: {
                inputValue: a,
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.list, e = a.data.data.banner, i = a.data.data.nav;
                if (console.log(t), t.length <= 0) {
                    t = null;
                    s.setData({
                        goodsist: t
                    });
                }
                s.setData({
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
    sio: function(a) {
        var s = this, t = a.currentTarget.dataset.text;
        s.setData({
            inputValue: t,
            searchinput: t
        }), app.util.request({
            url: "entry/wxapp/Soso",
            method: "POST",
            data: {
                inputValue: t,
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.list, e = a.data.data.banner, i = a.data.data.nav;
                if (console.log(t), t.length <= 0) {
                    t = null;
                    s.setData({
                        goodsist: t
                    });
                }
                s.setData({
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
    History: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/History",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data;
                e.setData({
                    History: t
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    shangpin: function() {
        var s = this;
        app.util.request({
            url: "entry/wxapp/Soso",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.list, e = a.data.data.banner, i = a.data.data.nav;
                s.setData({
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
        var s = this, t = a.currentTarget.dataset.cateid;
        s.setData({
            cateid: t
        }), app.util.request({
            url: "entry/wxapp/Soso",
            method: "POST",
            data: {
                cateid: t,
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.list, e = a.data.data.banner, i = a.data.data.nav;
                s.setData({
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
        var i = this, s = i.data.goodsist;
        app.util.request({
            url: "entry/wxapp/Soso",
            method: "POST",
            data: {
                pageNum: a,
                rankno: i.data.rankno,
                inputValue: i.data.inputValue,
                user_id: app.globalData.user_id
            },
            success: function(a) {
                for (var t = a.data.data.list, e = 0; e < t.length; e++) s.push(t[e]);
                i.setData({
                    goodsist: s
                });
            }
        });
    },
    onReachBottom: function() {
        console.log(this.data.goods), pageNum++, this.jaizai(pageNum);
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
        var n = this;
        app.util.request({
            url: "entry/wxapp/Headcolor",
            method: "POST",
            data: {
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.search_color, e = a.data.data.config.share_icon, i = a.data.data.config.shenhe, s = a.data.data.is_daili, o = a.data.data.config;
                n.setData({
                    search_color: t,
                    share_icon: e,
                    shenhe: i,
                    config: o,
                    is_daili: s
                });
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    },
    paixu: function(a, t) {
        var s = this;
        a = a;
        s.setData({
            rankno: a
        }), app.util.request({
            url: "entry/wxapp/Soso",
            method: "POST",
            data: {
                rankno: a,
                inputValue: t,
                user_id: app.globalData.user_id
            },
            success: function(a) {
                var t = a.data.data.list, e = a.data.data.banner, i = a.data.data.nav;
                s.setData({
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
    shan: function() {
        this.data.History;
        this.setData({
            History: []
        }), app.util.request({
            url: "entry/wxapp/History",
            method: "POST",
            data: {
                del: 1,
                user_id: app.globalData.user_id
            },
            success: function(a) {},
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
    onShareAppMessage: function(a) {
        a.from;
        var t = a.target.dataset.src, e = a.target.dataset.id, i = a.target.dataset.name, s = a.target.dataset.goods_title;
        return this.setData({
            goods_src: t,
            goods_id: e,
            goods_name: i,
            goods_title: s
        }), {
            title: this.data.goods_title,
            path: "hc_pdd/pages/details/details?goods_id=" + this.data.goods_id + "&user_id=" + app.globalData.user_id,
            imageUrl: this.data.goods_src,
            success: function(a) {},
            fail: function(a) {}
        };
    }
});