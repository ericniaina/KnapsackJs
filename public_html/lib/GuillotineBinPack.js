/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function (exports) {
    "use strict";
    var libs = require("Rect.js");
    Rect = libs.Rect;

    function GuillotineBinPack(width, height) {
        this.width = width;
        this.height = height;
        // init
        var usedRectangles = [];
        var n = new Rect(0, 0, width, height);
        var freeRectangles = [];
        freeRectangles.push(n);
    }
    exports.GuillotineBinPack = GuillotineBinPack;

    GuillotineBinPack.prototype = {
        init: function (target) {
            if (!target)
                throw new Error("missing target");
            return target;
        }
    };
})(this);