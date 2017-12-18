'use strict';
var Index = {
    init: function() {
        Index.initTool();
        Index.initDOM();
        Index.initEvent();
    },
    initDOM: function() {},
    initTool: function() {

        //获取用户名和picker 如果有的话，则直接显示详情


        var u = Index.getParam('userName');
        var p = Index.getParam('picker')
        if (u != '' && u != null && p != '' && p != null) {
            Index.showResult(u, p)
        } else {
            Index.initStartAnimate();
        }



        // Nest.init();
        Index.initSize();
        new DateSelector({
            input: 'picker', // 点击触发插件的input框的id
            container: 'datePickerTargetContainer', // 插件插入的容器id
            type: 0,
            param: [1, 1, 1],
            // 设置['year','month','day','hour','minute'],1为需要，0为不需要,需要连续的1
            beginTime: [1900, 1, 1], // 如空数组默认设置成1970年1月1日0时0分开始，如需要设置开始时间点，数组的值对应param参数的对应值。
            endTime: [2080, 12, 30], // 如空数组默认设置成次年12月31日23时59分结束，如需要设置结束时间点，数组的值对应param参数的对应值。
            recentTime: [1990, 1, 1], // 如不需要设置当前时间，被为空数组，如需要设置的开始的时间点，数组的值对应param参数的对应值。
            success: function(arr, arr2) {
                if (arr.length != 0) {
                    $("#picker").val(
                        Index.formatDate(arr.join('-'), 'yyyy-MM-dd'))
                }
            }
        });
    },
    initEvent: function() {
        $("#submitBtn").click(function() {
            Index.gotoDetail();
        });
        $("#againBtn").click(function() {
            Index.showBegin();
        });
    },
    initSize: function() {
        var width = window.innerWidth || document.documentElement.clientWidth ||
            document.body.clientWidth;
        var height = window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;

        $("body").width(width);
        $("body").height(height);
    },
    initStartAnimate: function() {
        $("#inputArea").show().addClass("slideInDown")
    },
    gotoDetail: function() {

        if ($("#userName").val() == '') {
            alert('请输入您的姓名')
            return;
        } else if ($("#picker").val() == '') {
            alert('请选择您的生日')
            return;
        }
        $("#inputArea").addClass("slideOutUp");
        setTimeout(function() {
            $(".overlayText").fadeIn();
            $(".overlay").fadeIn();
        }, 100)
        setTimeout(function() {
            var userName = $("#userName").val();
            var picker = $("#picker").val();
            Index.setRoute(userName, picker);
            Index.showResult(userName, picker);
        }, 1500)
    },
    setRoute: function(u, p) {
        // 控制路由
        var path = window.location.protocol + "//" + window.location.host +
            window.location.pathname;

        path += "?1=1&userName=" + u + "&picker=" + p
        history.pushState({}, "生命地图", path);
    },
    showResult: function(u, p) {

        // 显示数据
        $("#userNameR").html(u)
        $("#pickerR").html(p)

        // 样式控制
        $(".overlayText").fadeOut();
        $(".overlay").fadeOut();
        $("#resultArea").fadeIn();
        $("#inputArea").hide().removeClass("slideOutUp").removeClass(
            "slideInDown");
        setTimeout(function() {
            $("body").height(document.body.scrollHeight);
        }, 500)

    },
    showBegin: function() {
        // $(window).scrollTop(0);
        $("#resultArea").fadeOut();
        Index.initSize();
        Index.initStartAnimate();

        if (window.history.length > 2) {
            window.history.back()
        } else {
            var path = window.location.protocol + "//" + window.location.host +
                window.location.pathname;
            history.replaceState({}, "生命地图", path);
        }

    },
    formatDate: function(date, format) {


        if (typeof date == 'string') {
            if (date.substring(0, date.lastIndexOf(".")) != '') {
                date = date.substring(0, date.lastIndexOf("."));
            }
            date = date.replace(/-/g, '/');
        }

        date = new Date(date);
        var map = {
            M: date.getMonth() + 1, // 月份
            d: date.getDate(), // 日
            h: date.getHours(), // 小时
            m: date.getMinutes(), // 分
            s: date.getSeconds(), // 秒
            q: Math.floor((date.getMonth() + 3) / 3), // 季度
            S: date.getMilliseconds()
                // 毫秒
        };
        format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
            var v = map[t];
            if (v !== undefined) {
                if (all.length > 1) {
                    v = '0' + v;
                    v = v.substr(v.length - 2);
                }

                return v;
            } else if (t === 'y') {
                return (date.getFullYear() + '').substr(4 - all.length);
            }

            return all;
        });

        return format;
    },

    getParam: function(name) {
        return Index.getUrlParam(name) || localStorage.getItem(name) ||
            sessionStorage.getItem(name);
    },

    getUrlParam: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }

        return null;
    },
};
jQuery(document).ready(function($) {
    Index.init();
});
8