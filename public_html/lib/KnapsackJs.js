/**
 * This library is using the GuillotineBinPack algorithme
 * To fit all the defined cuts in the necessary amout of bin
 */

var GuillotineBinPack = require("./GuillotineBinPack.js").GuillotineBinPack;
// KnapsackJs.js
(function (exports) {
    "use strict";

    /**
     * Constructor
     * @param Array cuts An Array containing all cuts that need to be done.
     * Each element of the Array should have the following format:
     * {
     *   width: 200, 
     *   height: 300,
     *   number: 20,
     *   type: "bin_2" // idendifier for the bin type
     * }
     * @param Array bins An Array  containing all bins that can be used
     * Each element of the Array should have the following format:
     * Each element of the Array should have the following format:
     * {
     *   width: 200, 
     *   height: 300,
     *   number: 20,
     *   type: "bin_2" // idendifier for the bin type
     * }
     * @returns {KnapsackJs_L7.KnapsackJs}
     */
    function KnapsackJs(cuts, usableBins) {
        this.usableBins = usableBins;
        this.cuts = cuts;
        this.usedBins = {};
    }
    exports.KnapsackJs = KnapsackJs;

    KnapsackJs.prototype = {
        /**
         * this phase is used to flatten the cuts
         * and separate cut lists by type
         * @returns {undefined}
         */
        init: function () {
            this.flatten_cuts = this.flatten(this.cuts);
            this.flatten_usableBins = this.flatten(this.usableBins);
        },
        flatten: function (bins) {
            var flattened = {};
            for (var i = 0; i < bins.length; ++i) {
                var current = bins[i];
                do {
                    var by_type = (typeof flattened[current.type] != 'undefined' && flattened[current.type] instanceof Array) ? flattened[current.type] : [];
                    by_type.push({
                        width: current.width,
                        height: current.height,
                        number: 1,
                        type: current.type
                    });
                    current.number = current.number - 1;
                    flattened[current.type] = by_type;
                } while (current.number > 0);
            }
            return flattened;
        },
        do_cuts: function () {
            for (var type in  this.flatten_cuts) {
                var current_type_cut = this.flatten_cuts[type];
                while (current_type_cut.length > 0) {
                    var bin = this.flatten_usableBins[type].pop();
                    var guillotine = new GuillotineBinPack(bin.width, bin.height);
                    guillotine.bin = bin;
                    guillotine.Inserts(current_type_cut, false, 'RectBestAreaFit', 'SplitShorterLeftoverAxis');
                    var by_type = (typeof this.usedBins[type]!= 'undefined' && this.usedBins[type] instanceof Array) ? this.usedBins[type] : [];
                    by_type.push(guillotine);
                    this.usedBins[type] = by_type;
                }
            }
        }};
})(this);