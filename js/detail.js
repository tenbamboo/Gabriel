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
            // 样式控制
            // 显示数据
        $("#userNameR").html(u)
        $("#pickerR").html(p)
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
};
jQuery(document).ready(function($) {
    Index.init();
});