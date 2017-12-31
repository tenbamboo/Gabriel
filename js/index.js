'use strict';
var Index = {
    init: function() {
        Index.initTool();
        Index.initDOM();
        Index.initEvent();
    },
    initDOM: function() {},
    initTool: function() {
        Index.initStartAnimate();
        Index.getItemList();
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
            recentTime: [1990, 6, 15], // 如不需要设置当前时间，被为空数组，如需要设置的开始的时间点，数组的值对应param参数的对应值。
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
        $("#picker").click(function() {
            $("#userName").blur()
        });
        $("#searchList").on("click", ".operBtn img[data-search]", function() {
            var h = $(this).parent().siblings(".content").html()
            h = h.split('/')
            window.location.href = "detail.html?userName=" + h[0] + "&picker=" + h[1]
        });
        $("#searchList").on("click", ".operBtn img[data-itemid]", function() {
            Index.removeItem(this)
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
        // $("#inputArea").show().addClass("slideInDown")
    },
    gotoDetail: function() {

        if ($("#userName").val() == '') {
            alert('请输入您的姓名')
            return;
        } else if ($("#picker").val() == '') {
            alert('请选择您的生日')
            return;
        }
        // $("#inputArea").addClass("slideOutUp");
        Index.addItem();
        window.location.href = "detail.html?userName=" + $("#userName").val() + "&picker=" + $("#picker").val()
    },
    getItemList: function() {
        var serachList = localStorage.getItem('serachList')
        if (serachList == null) {
            $("#historyArea").hide();
            return;
        }
        serachList = JSON.parse(serachList);
        if (serachList.length == 0) {
            $("#historyArea").hide();
            return;
        }
        serachList.reverse()
        var html = ""
        for (var i in serachList) {
            html += '<li>' +
                '<span class="content">' + serachList[i].u + '/' + serachList[i].p + '</span>' +
                '<div class="operBtn">' +
                '<img src="img/search.png" data-search>' +
                '<img src="img/delete.png" data-itemId="' + serachList[i].id + '">' +
                '</div>'
            '</li>'
        }
        $("#searchList").html(html)

    },
    addItem: function() {
        var serachList = localStorage.getItem('serachList')
        if (serachList == null) {
            serachList = [];
        } else {
            serachList = JSON.parse(serachList);
        }
        var item = {
            u: $("#userName").val(),
            p: $("#picker").val(),
            id: $("#userName").val() + (new Date().getTime())
        }

        serachList.push(item)
        localStorage.setItem("serachList", JSON.stringify(serachList))
        $("#historyArea").show();
    },
    removeItem: function(dom) {
        var serachList = localStorage.getItem('serachList')
        if (serachList == null) {
            return;
        } else {
            serachList = JSON.parse(serachList);
        }

        var itemId = $(dom).attr("data-itemId");
        for (var i in serachList) {
            if (serachList[i].id == itemId) {
                serachList.splice(i, 1);
                break;
            }
        }


        localStorage.setItem("serachList", JSON.stringify(serachList))
        $(dom).parent().parent().remove();
        if ($("#searchList li").length == 0) {
            $("#historyArea").hide();
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

};
jQuery(document).ready(function($) {
    Index.init();
});