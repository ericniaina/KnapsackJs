/**
 * Author Rakotonirina Eric Niaina
 * 
 */

var assert = require('assert');
var expect = require('chai').expect;
var KnapsackJs = require("../lib/GuillotineBinPack.js").KnapsackJs;

describe('KnapsackJs', function () {
    describe("constructor", function () {
        /**
         * Correct format
         * {
         *    bin:{w:20,h:20}
         * }
         * @returns {undefined}
         */
        it('should contains the bin property', function () {
            try {
                var knapsack = new KnapsackJs(null);
            } catch (err) {
                expect(err).to.eql(new Error('Property does not exist in model schema.'));
                done();
            }
        });
    });
});