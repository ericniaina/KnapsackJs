/**
 * Author Rakotonirina Eric Niaina
 * 
 */

var assert = require('assert');
var expect = require('chai').expect;
var GuillotineBinPack = require("../lib/GuillotineBinPack.js").GuillotineBinPack;

describe('GuillotineBinPack', function () {
    describe("Insert", function () {
        /**
         * Correct format
         * {
         *    bin:{w:20,h:20}
         * }
         * @returns {undefined}
         */
        it('should perfectly fit', function () {
            var bin = new GuillotineBinPack(200, 300);
            var insertedRect = bin.Insert(200, 300, false, 'RectBestAreaFit', 'SplitShorterLeftoverAxis');
            assert.equal(200, insertedRect.width);
            assert.equal(300, insertedRect.height);
            assert.equal(1, bin.Occupancy());
        });
    });
});