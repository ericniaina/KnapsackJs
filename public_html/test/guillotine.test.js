/**
 * Author Rakotonirina Eric Niaina
 * 
 */

var assert = require('assert');
var expect = require('chai').expect;
var GuillotineBinPack = require("../lib/GuillotineBinPack.js").GuillotineBinPack;

describe('GuillotineBinPack', function () {
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
                var GuillotineBinPack = new GuillotineBinPack(null);
            } catch (err) {
                expect(err).to.eql(new Error('Property does not exist in model schema.'));                
            }
        });
    });
});