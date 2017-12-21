'use strict';
var Index = {
    init: function() {
        Index.initTool();
        Index.initDOM();
        Index.initEvent();
    },
    initDOM: function() {},
    initTool: function() {
        Index.showResult();
        //获取用户名和picker 如果有的话，则直接显示详情



        // if (u != '' && u != null && p != '' && p != null) {
        //    
        // }



    },
    initEvent: function() {
        $("#againBtn").click(function() {
            window.location.href = "index.html"
        });
    },
    showResult: function(u, p) {

        var u = Index.getParam('userName');
        var p = Index.getParam('picker')
        var age = Index.brithdayConAges(p)
            // 样式控制
            // 显示数据
        var array = u.split('');
        var pinyin = '';
        for (var i in array) {
            pinyin += PinYin.convertPinyin(array[i])
        }



        var res = getResult(Index.formatDate(p, 'yyyy'), Index.formatDate(p, 'MM'), Index.formatDate(p, 'dd'), pinyin)
        $("#userNameR").html(u)
        $("#pickerR").html(p + " (" + age + "岁)")


        for (var i in res) {
            $("#" + i).html(res[i])
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
        setTimeout(function() {
            $("body").height(document.body.scrollHeight);
        }, 500)

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
    brithdayConAges: function(strBirthday) {
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
jQuery(document).ready(function($) {
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
    var d = strAdd(dd);
    p.d = dd + '/' + d;
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
    p.l2 = parseInt(currentYear() + (monthStart + monthAdd - 1) / 12) + '年' + (monthStart + monthAdd - 1) % 12 + '月';
    var mm = strAdd2(pinyin2num(name));
    var m = strAdd(mm);
    p.m = mm + '/' + m;
    var nn = strAdd2(yuanyin2num(name));
    var nn2 = strAdd2(nn);
    var n = strAdd(nn);
    p.n = nn + '/' + nn2 + '/' + n;
    var oo = mm - nn;
    var o = strAdd(oo);
    p.o = oo + '/' + o;
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
    list.push((mm + '').split('')[0]);
    list.push((mm + '').split('')[1]);
    list.push((nn + '').split('')[1]);
    list.push((nn + '').split('')[0]);
    list.push((nn2 + '').split('')[0]);
    list.push((nn2 + '').split('')[1]);
    list.push((oo + '').split('')[0]);
    list.push((oo + '').split('')[1]);
    list.push(p.p);
    for (var i = 1; i < 10; i++) {
        var ex = false;
        for (var n in list) {
            if (i == list[n]) {
                ex = true;
                break;
            }
        }
        if (!ex) {
            p.u = i;
        }
    }

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