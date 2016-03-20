/**
 * This library is using the GuillotineBinPack algorithme
 * To fit all the defined cuts in the necessary amout of bin
 */
// KnapsackJs.js
(function (exports) {
    "use strict";

    /**
     * Constructor
     * @param Array cuts An Array containing all cuts that need to be done.
     * Each element of the Array should have the following format:
     * {
     *   cut_width: 200, 
     *   cut_height: 300,
     *   cut_number: 20,
     *   bin_type: "bin_2" // idendifier for the bin type
     * }
     * @param Array bins An Array  containing all bins that can be used
     * Each element of the Array should have the following format:
     * @returns {KnapsackJs_L7.KnapsackJs}
     */
    function KnapsackJs(usableBins,cuts) {
        this.usableBins = usableBins;
        this.cuts = cuts;
        this.bins = [];
    }
    exports.KnapsackJs = KnapsackJs;

    KnapsackJs.prototype = {
        /**
         * this phase is used to flatten the cuts
         * and separate cut lists by 
         * @returns {undefined}
         */
        init: function () {
            for (var i = 0; i < this.cuts.length; ++i) {
                
            }
        }
    };
})(this);