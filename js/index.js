'use strict';
var Index = {
    init: function() {
        Index.initTool();
        Index.initDOM();
        Index.initEvent();
    },
    initDOM: function() {
        Index.initStartAnimate();
    },
    initTool: function() {
        Nest.init();
        Index.initSize();
        new DateSelector({
            input: 'picker', //点击触发插件的input框的id
            container: 'datePickerTargetContainer', //插件插入的容器id
            type: 0,
            param: [1, 1, 1],
            //设置['year','month','day','hour','minute'],1为需要，0为不需要,需要连续的1
            beginTime: [1900, 1, 1], //如空数组默认设置成1970年1月1日0时0分开始，如需要设置开始时间点，数组的值对应param参数的对应值。
            endTime: [2030, 12, 30], //如空数组默认设置成次年12月31日23时59分结束，如需要设置结束时间点，数组的值对应param参数的对应值。
            recentTime: [1990, 1, 1], //如不需要设置当前时间，被为空数组，如需要设置的开始的时间点，数组的值对应param参数的对应值。
            success: function(arr, arr2) {
                if (arr.length != 0) {

                    $("#picker").val(Index.formatDate(arr.join('-'), 'yyyy-MM-dd'))
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
        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        $("body").width(width);
        $("body").height(height);
    },
    initStartAnimate: function() {
        $("#inputArea").show().addClass("slideInDown")
    },
    gotoDetail: function() {
        $("#inputArea").addClass("slideOutUp");
        setTimeout(function() {
            $(".overlayText").fadeIn();
            $(".overlay").fadeIn();
        }, 100)
        setTimeout(function() {
            Index.showResult()
        }, 4000)
    },
    showResult: function() {
        $(".overlayText").fadeOut();
        $(".overlay").fadeOut();
        $("#resultArea").fadeIn();
        $("#inputArea").hide().removeClass("slideOutUp").removeClass("slideInDown");
        setTimeout(function() {
            $("body").height(document.body.scrollHeight);
        }, 500)
    },
    showBegin: function() {
        // $(window).scrollTop(0);
        $("#resultArea").fadeOut();
        Index.initSize();
        Index.initStartAnimate();
    },
    formatDate: function(date, format) {

        // if (Cain.isNullOrEmpty(date)) {
        //     date = new Date();
        // }
        // if (Cain.isNullOrEmpty(format)) {
        //     format = 'yyyy-MM-dd hh:mm:ss';
        // }

        if (typeof date == 'string') {
            if (date.substring(0, date.lastIndexOf(".")) != '') {
                date = date.substring(0, date.lastIndexOf("."));
            }
            date = date.replace(/-/g, '/');
        }

        date = new Date(date);
        var map = {
            M: date.getMonth() + 1, //月份
            d: date.getDate(), //日
            h: date.getHours(), //小时
            m: date.getMinutes(), //分
            s: date.getSeconds(), //秒
            q: Math.floor((date.getMonth() + 3) / 3), //季度
            S: date.getMilliseconds() //毫秒
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
};
jQuery(document).ready(function($) {
    Index.init();
});