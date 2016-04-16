/**
 * Author Rakotonirina Eric Niaina
 * 
 */

var assert = require('assert');
var libs = require("../lib/KnapsackJs.js");
KnapsackJs = libs.KnapsackJs;

describe('KnapsackJs', function () {
    describe("constructor", function () {
        /**
         * Correct format for each bin and cuts element
         * {
         *   width: 200, 
         *   height: 300,
         *   number: 20,
         *   type: "bin_2" // idendifier for the bin type
         * }
         * @returns {undefined}
         */
        it('should flatten the cut list and bin list after init', function () {
            var cuts = [];
            cuts.push({
                width: 600,
                height: 800,
                number: 4,
                type: "type_2" // idendifier for the bin type
            });
            cuts.push({
                width: 400,
                height: 500,
                number: 4,
                type: "type_1" // idendifier for the bin type
            });
            var bins = [];
            bins.push({
                width: 1200,
                height: 1300,
                number: 10,
                type: "type_2" // idendifier for the bin type
            });
            bins.push({
                width: 1500,
                height: 1250,
                number: 20,
                type: "type_1" // idendifier for the bin type
            });
            var knapsack = new KnapsackJs(cuts, bins);
            knapsack.init();
            assert.equal(4, knapsack.flatten_cuts.type_1.length);
            assert.equal(4, knapsack.flatten_cuts.type_2.length);
            assert.equal(10, knapsack.flatten_usableBins.type_2.length);
            assert.equal(20, knapsack.flatten_usableBins.type_1.length);
        });
    });
});