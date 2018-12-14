Page({
    data: {
        orientationList: [ {
            id: "0",
            region: "东北"
        }, {
            id: "1",
            region: "华北"
        }, {
            id: "2",
            region: "华东"
        }, {
            id: "3",
            region: "华南"
        } ],
        mob: 0,
        toView: "inToView01"
    },
    scrollToViewFn: function(t) {
        var e = t.target.dataset.id, i = t.target.dataset.id;
        this.setData({
            toView: "inToView" + e,
            mob: i
        }), console.log(this.data.toView);
    },
    bindscroll: function(t) {
        var o = this;
        wx.createSelectorQuery().in(this).select("#inToView0").boundingClientRect(function(t) {
            t.top;
            var e = t.top, i = o.data.mob;
            e < 100 && (i = 0, o.setData({
                mob: i
            }));
        }).exec(), wx.createSelectorQuery().in(this).select("#inToView1").boundingClientRect(function(t) {
            t.top;
            var e = t.top, i = o.data.mob;
            e < 100 && (i = 1, o.setData({
                mob: i
            }));
        }).exec(), wx.createSelectorQuery().in(this).select("#inToView2").boundingClientRect(function(t) {
            t.top;
            var e = t.top, i = o.data.mob;
            e < 100 && (i = 2, o.setData({
                mob: i
            }));
        }).exec(), wx.createSelectorQuery().in(this).select("#inToView3").boundingClientRect(function(t) {
            t.top;
            var e = t.top, i = o.data.mob;
            e < 100 && (i = 3, o.setData({
                mob: i
            }));
        }).exec();
    },
    onLoad: function(t) {}
});