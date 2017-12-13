'use strict';
var Index = {
    init: function() {
        Index.initTool();
        Index.initDOM();
        Index.initEvent();
    },
    initDOM: function() {
        $('#version').html('版本号:' + Config.version);
    },
    initTool: function() {
        Index.randomBackground();
    },
    initEvent: function() {

        $('.inputArea input').blur(function() {
            Index.blurInput(this);
        });
        $('#IndexBtn').click(function() {
            Index.cheackIndex();
        });
        $('#password').keydown(function(e) {
            if (e.keyCode == 13) {
                Index.cheackIndex();
            }
        });
    },
};
jQuery(document).ready(function($) {
    Index.init();
});