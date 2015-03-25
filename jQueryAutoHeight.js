/*
 * jquery-auto-height.js
 *
 * Copyright (c) 2010 Tomohiro Okuwaki (http://www.tinybeans.net/blog/)
 * Licensed under MIT Lisence:
 * http://www.opensource.org/licenses/mit-license.php
 * http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 *
 * Since:   2010-04-19
 * Update:  2015-03-26
 * version: 0.05
 * Comment:
 *
 * jQuery 1.2 <-> 1.10.2
 *
 */

 (function($){
    $.fn.autoHeight = function(options){
        var op = $.extend({

            column  : 0,
            clear   : 0,
            height  : 'minHeight',
            reset   : ''
        },options || {}); // optionsに値があれば上書きする

        var self = $(this);
        if (op.reset === 'reset') {
            self.removeAttr('style');
        }

        // 要素の高さを取得
        var hList = self.map(function(){
            return $(this).height();
        }).get();
        var hListLine = [];
        if (op.column > 1) {
            for(var i = 0, l = hList.length; i < Math.ceil(l / op.column); i++) {
                var x = i * op.column;
                // 指定カラム数の配列を切り出し、その中の高さの最大値を取得する
                hListLine.push(Math.max.apply(null, hList.slice(x, x + op.column)));
            }
        }

        // 高さの最大値を要素に適用
        var ie6 = typeof window.addEventListener === "undefined" && typeof document.documentElement.style.maxHeight === "undefined";
        if (op.column > 1) {
            for (var j=0; j<hListLine.length; j++) {
                for (var k=0; k<op.column; k++) {
                    if (ie6) {
                        self.eq(j*op.column+k).height(hListLine[j]);
                    } else {
                        self.eq(j*op.column+k).css(op.height,hListLine[j]);
                    }
                    if (k === 0 && op.clear !== 0) {
                        self.eq(j*op.column+k).css('clear','both');
                    }
                }
            }
        } else {
            // 取得した高さの数値の最大値を取得
            var hMax = Math.max.apply(null, hList);
            if (ie6) {
                self.height(hMax);
            } else {
                self.css(op.height, hMax);
            }
        }
    };
})(jQuery);

