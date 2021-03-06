'use strict';
var Index = {
    init: function () {
        Index.initTool();
        Index.initDOM();
        Index.initEvent();
    },
    initDOM: function () { },
    initTool: function () {
        Index.showResult();
        //获取用户名和picker 如果有的话，则直接显示详情



        // if (u != '' && u != null && p != '' && p != null) {
        //    
        // }



    },
    initEvent: function () {
        $("#againBtn").click(function () {
            window.location.href = "index.html"
        });
        $("#detail1").click(function () {
            Index.showDetail()
        })
        $("#closeDialog").click(function () {
            Index.closeDialog()
        })
    },

    isBlank: function (obj) {
        if (obj == undefined || obj == null || obj == 'null' || obj == '' || obj.length == 0) {
            return true;
        } else if (typeof obj == "object" && obj.length == undefined) {
            for (var name in obj) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    },
    showDetail: function () {
      
        var val = $("#n").html()
        var  list = val.split('/')
        val = list[list.length -1]
        var res = ''
        switch (val) {
            case '1':
                res = `<p>内驱1：（纯正能量）独立、自信、不依赖、有力量。最man的男人和最有主见的女人</p><p class="red">修行功课：允许自己做不到，不要为了证明自己可以而勉强自己</p>`
                break;
            case '2':
                res = `<p>内驱2：（纯正能量）体贴、包容、合作、舒服。暖男和温柔似水的女性</p><p class="red">修行功课：不要为了关系和谐而委屈自己。</p>`
                break;
            case '3':
                res = `<p>内驱3：（纯正能量）简单 、直接 、幽默、好玩 、颜值、 面子</p><p class="red">修行功课：不要为了面子而做事</p>`
                break;
            case '4':
                res = `<p>内驱4：（纯正能量）现实、 诚信、稳重 、忠诚。靠谱的男人和居家过日子的女人</p><p class="red">修行功课：不要为了安全感不足而做事，学会享受并活在当下</p>`
                break;
            case '5':
                res = `<p>内驱5：（纯正能量）精力旺盛、魅力、爱自由、多变</p><p class="red">修行功课：不要为了尝试刺激而冒险</p>`
                break;
            case '6':
                res = `<p>内驱6：（纯正能量）善良、顾家、责任心、付出</p><p class="red">修行功课：不要一味地付出，爱别人而忘记了自己</p>`
                break;
            case '7':
                res = `<p>内驱7：（纯正能量）学习、思考、涵养、被懂大于一切</p><p class="red">修行功课：有些话不说出来别人是真的不知道，尝试表达出内心的想法</p>`
                break;
            case '8':
                res = `<p>内驱8：（纯正能量）权威、事业心、领袖、心想事成。有远大抱负的人</p><p class="red">修行功课：接纳失败是生命的一部分，越挫越勇</p>`
                break;
            case '9':
                res = `<p>内驱9：（纯正能量）大爱、无我、被需要。最富有同情心的人</p><p class="red">修行功课：爱别人之前要爱自己，分清界限</p>`
                break;
        }
        $("#dialogContent").html(res)
        $("#dialog").show()
    },
    closeDialog: function () {
        $("#dialog").hide()
    },
    showResult: function (u, p) {

        var u = Index.getParam('userName');
        var p = Index.getParam('picker')
        var pinyin = Index.getParam('pinyin')
        var age = Index.brithdayConAges(p)
        // 样式控制
        // 显示数据

        if (Index.isBlank(pinyin)) {
            var array = u.split('');
            pinyin = pinyinUtil.getPinyin(u, '');
        }





        var res = getResult(Index.formatDate(p, 'yyyy'), Index.formatDate(p, 'MM'), Index.formatDate(p, 'dd'), pinyin)
        $("#userNameR").html(u)
        $("#pickerR").html(p + " (" + age + "岁)")


        for (var i in res) {
            if (res[i] === 0 || !Index.isBlank(res[i])) {
                $("#" + i).html(res[i])
            }

        }



        if (age >= res.e1 && age <= res.e2) {
            $("#age1").addClass('color_red')
        } else if (age >= res.f1 && age <= res.f2) {
            $("#age2").addClass('color_red')
        } else if (age >= res.g1 && age <= res.g2) {
            $("#age3").addClass('color_red')
        } else if (age >= res.v1) {
            $("#age4").addClass('color_red')
        }


        // //中部正方形
        // $("#a").html(res.a)
        // $("#b").html(res.b)
        // $("#c").html(res.c)
        // $("#d").html(res.d)

        // //下部倒三角
        // $("#h").html(res.h)
        // $("#i").html(res.i)
        // $("#j").html(res.j)
        // $("#k").html(res.k)








        $(".overlayText").fadeOut();
        $(".overlay").fadeOut();
        $("#resultArea").fadeIn();
        $("#inputArea").hide().removeClass("slideOutUp").removeClass("slideInDown");
        setTimeout(function () {
            $("body").height(document.body.scrollHeight);
        }, 500)

    },
    getParam: function (name) {
        return Index.getUrlParam(name) || localStorage.getItem(name) ||
            sessionStorage.getItem(name);
    },

    getUrlParam: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }

        return null;
    },
    formatDate: function (date, format) {
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
        format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
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
    brithdayConAges: function (strBirthday) {
        if (!strBirthday) {
            return 0;
        }

        var returnAge;
        var strBirthdayArr = strBirthday.split('-');
        var birthYear = strBirthdayArr[0];
        var birthMonth = strBirthdayArr[1];
        var birthDay = strBirthdayArr[2];
        var d = new Date();
        var nowYear = d.getFullYear();
        var nowMonth = d.getMonth() + 1;
        var nowDay = d.getDate();

        if (nowYear == birthYear) {
            returnAge = 0; //同年 则为0岁
        } else {
            var ageDiff = nowYear - birthYear; //年之差
            if (ageDiff > 0) {
                if (nowMonth == birthMonth) {
                    var dayDiff = nowDay - birthDay; //日之差
                    if (dayDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                } else {
                    var monthDiff = nowMonth - birthMonth; //月之差
                    if (monthDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                }
            } else {
                returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
            }
        }

        return returnAge; //返回周岁年龄
    },

};
jQuery(document).ready(function ($) {
    Index.init();
});

function getResult(year, month, day, name) {
    var p = {};
    p.a = month;
    var a = strAdd(p.a);
    p.b = day;
    var b = strAdd(p.b);
    p.c = year;
    var c = strAdd(p.c);
    var dd = strAdd2(p.a) + strAdd2(p.b) + strAdd2(p.c);
    var dd2 = strAdd2(dd);
    var d = strAdd2(dd2);
    if (dd2 == d) {
        p.d = dd + '/' + d;
    } else {
        p.d = dd + '/' + dd2 + '/' + d;
    }
    p.e = strAdd(a + b);
    p.e1 = 0;
    p.e2 = 36 - d;
    p.f = strAdd(b + c)
    p.f1 = p.e2 + 1;
    p.f2 = p.f1 + 8;
    p.g = strAdd(p.e + p.f);
    p.g1 = p.f2 + 1;
    p.g2 = p.g1 + 8;
    p.v = strAdd(a + c);
    p.v1 = p.g2 + 1;
    p.h = Math.abs(a - b)
    p.i = Math.abs(b - c)
    p.j = Math.abs(p.h - p.i)
    p.k = Math.abs(a - c)
    p.l = strAdd(p.e + currentYear());
    var monthStart = 10 - p.l;
    var monthAdd;
    if (p.l >= 1 && p.l <= 8) {
        monthAdd = 11;
    } else {
        monthAdd = 20;
    }
    p.l1 = currentYear() + '年' + monthStart + '月';
    var yearEnd = parseInt(currentYear() + (monthStart + monthAdd - 1) / 12);
    var monthEnd = (monthStart + monthAdd - 1) % 12;
    if (monthEnd == 0) {
        monthEnd = 12;
        yearEnd = yearEnd - 1;
    }

    p.l2 = yearEnd + '年' + monthEnd + '月';
    var mm = strAdd2(pinyin2num(name));
    var mm2 = strAdd2(mm);
    var m = strAdd(mm2);
    if (mm2 == m) {
        p.m = mm + '/' + m;
    } else {
        p.m = mm + '/' + mm2 + '/' + m;
    }
    var nn = strAdd2(yuanyin2num(name));
    var nn2 = strAdd2(nn);
    var n = strAdd2(nn2);
    if (nn2 == n) {
        p.n = nn + '/' + n;
    } else {
        p.n = nn + '/' + nn2 + '/' + n;
    }
    var oo = mm - nn;
    var oo2 = strAdd2(oo);
    var o = strAdd2(oo2);
    if (oo2 == o) {
        p.o = oo + '/' + o;
    } else {
        p.o = oo + '/' + oo2 + '/' + o;
    }
    p.p = strAdd(d + m);
    p.q = strAdd(pinyinCount(name, 1) + pinyinCount(name, 8));
    p.r = strAdd(pinyinCount(name, 2) + pinyinCount(name, 3) + pinyinCount(name, 6));
    p.s = strAdd(pinyinCount(name, 4) + pinyinCount(name, 5));
    p.t = strAdd(pinyinCount(name, 7) + pinyinCount(name, 9));
    var list = [];
    list.push(d);
    list.push(p.e);
    list.push(p.f);
    list.push(p.g);
    list.push(p.h);
    list.push(p.i);
    list.push(p.j);
    list.push(p.k);
    list.push(m);
    list.push(n);
    list.push(o);
    list.push((dd + '').split('')[0]);
    list.push((dd + '').split('')[1]);
    if (dd2 != d) {
        list.push((dd2 + '').split('')[0]);
        list.push((dd2 + '').split('')[1]);
    }
    list.push((mm + '').split('')[0]);
    list.push((mm + '').split('')[1]);
    if (mm2 != m) {
        list.push((mm2 + '').split('')[0]);
        list.push((mm2 + '').split('')[1]);
    }
    list.push((nn + '').split('')[1]);
    list.push((nn + '').split('')[0]);
    if (nn2 != n) {
        list.push((nn2 + '').split('')[0]);
        list.push((nn2 + '').split('')[1]);
    }
    list.push((oo + '').split('')[0]);
    list.push((oo + '').split('')[1]);
    list.push(p.p);
    list.push(p.v);
    p.u = '';
    for (var i = 1; i < 10; i++) {
        var ex = false;
        for (var n in list) {
            if (i == list[n]) {
                ex = true;
                break;
            }
        }
        if (!ex) {
            p.u += ',' + i;
        }
    }
    p.u = p.u.substr(1);
    return p;
}


function strAdd(str) {
    var num = strAdd2(str);
    var str = num + '';
    if (str.length == 1) {
        return num;
    }
    return strAdd(str);
}


function strAdd2(str) {
    if (str.length == 1) {
        return parseInt(str);
    }
    str = str + ''
    var num = 0;
    var array = str.split('');
    for (var s in array) {
        num = num + parseInt(array[s]);
    }
    return num;
}


function currentYear() {
    return new Date().getFullYear();
}


function pinyin2num(name) {
    var s = '';
    var array = name.split('');
    for (var i in array) {
        var str = array[i];
        if (str == 'a' || str == 'j' || str == 's') {
            s = s + 1;
        } else if (str == 'b' || str == 'k' || str == 't') {
            s = s + 2;
        } else if (str == 'c' || str == 'l' || str == 'u') {
            s = s + 3;
        } else if (str == 'd' || str == 'm' || str == 'v') {
            s = s + 4;
        } else if (str == 'e' || str == 'n' || str == 'w') {
            s = s + 5;
        } else if (str == 'f' || str == 'o' || str == 'x') {
            s = s + 6;
        } else if (str == 'g' || str == 'p' || str == 'y') {
            s = s + 7;
        } else if (str == 'h' || str == 'q' || str == 'z') {
            s = s + 8;
        } else {
            s = s + 9;
        }
    }
    return s;
}


function yuanyin2num(name) {
    var s = '';
    var array = name.split('');
    for (var i in array) {
        var str = array[i]
        if (str == 'a') {
            s = s + 1;
        } else if (str == 'u') {
            s = s + 3;
        } else if (str == 'e') {
            s = s + 5;
        } else if (str == 'o') {
            s = s + 6;
        } else if (str == 'i') {
            s = s + 9;
        }
    }
    return s;
}


function pinyinCount(name, num) {
    var s = pinyin2num(name);
    var n = 0;
    var array = s.split('');
    for (var i in array) {
        var str = array[i]
        if (str == num + '') {
            n++;
        }
    }
    return n;
}