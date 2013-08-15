/*
 * jquery-auto-height.js
 *
 * Copyright (c) 2010 Tomohiro Okuwaki (http://www.tinybeans.net/blog/)
 * Licensed under MIT Lisence:
 * http://www.opensource.org/licenses/mit-license.php
 * http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 *
 * Since:   2010-04-19
 * Update:  2010-07-02
 * version: 0.03
 * Comment: 
 *
 * jQuery 1.2 later
 * 
 */

 (function($){
    $.fn.autoHeight = function(options){
        var op = $.extend({
        
            column  : 0,
            clear   : 0,
            height  : 'minHeight',
            reset   : '',
            descend : function descend (a,b){ return b-a; }
        
        },options || {}); // optionsに値があれば上書きする

        var self = $(this);
        var n = 0,
            hMax,
            hList = new Array(),
            hListLine = new Array();
            hListLine[n] = 0;

        // 要素の高さを取得
        self.each(function(i){
            if (op.reset == 'reset') {
                $(this).removeAttr('style');
            }
            var h = $(this).height();
            hList[i] = h;
            if (op.column > 1) {
                // op.columnごとの最大値を格納していく
                if (h > hListLine[n]) {
                    hListLine[n] = h;
                }
                if ( (i > 0) && (((i+1) % op.column) == 0) ) {
                    n++;
                    hListLine[n] = 0;
                };
            }
        });

        // 取得した高さの数値を降順に並べ替え
        hList = hList.sort(op.descend);
        hMax = hList[0];
        
        // 高さの最大値を要素に適用
        var browser = $.browser.version;
        if (op.column > 1) {
            for (var j=0; j<hListLine.length; j++) {
                for (var k=0; k<op.column; k++) {
                    if (browser == '6.0') {
                        self.eq(j*op.column+k).height(hListLine[j]);
                        if (k == 0 && op.clear != 0) self.eq(j*op.column+k).css('clear','both');
                    } else {
                        self.eq(j*op.column+k).css(op.height,hListLine[j]);
                        if (k == 0 && op.clear != 0) self.eq(j*op.column+k).css('clear','both');
                    }
                }
            }
        } else {
            if (browser == '6.0') {
                self.height(hMax);
            } else {
                self.css(op.height,hMax);
            }
        }
    };
})(jQuery);

