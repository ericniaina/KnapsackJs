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
         * Correct format
         * {
         *    bin:{w:20,h:20},
         *    cuts: [{w:20,h:20}, ... {w:20,h:20}]
         * }
         * @returns {undefined}
         */
        it('should contains the bin property', function () {
            var knapsack = new KnapsackJs(null, null);
        });
    });
});