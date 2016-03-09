/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// KnapsackJs.js
(function (exports) {
    "use strict";

    function KnapsackJs(bin, cuts) {
        this.bin = bin;
        this.cuts = cuts;
    }
    exports.KnapsackJs = KnapsackJs;

    KnapsackJs.prototype = {
        init: function (target) {
            if (!target)
                throw new Error("missing target");
            return target;
        }
    };
})(this);