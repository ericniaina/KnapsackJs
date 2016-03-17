/**
 * Author Rakotonirina Eric Niaina
 * 
 */

var assert = require('assert');
var expect = require('chai').expect;
var GuillotineBinPack = require("../lib/GuillotineBinPack.js").GuillotineBinPack;
var Rect = require("../lib/Rect.js").Rect;

describe('GuillotineBinPack', function () {
    describe("Insert", function () {
        it('Identical size should perfectly fit', function () {
            var bin = new GuillotineBinPack(200, 300);
            var insertedRect = bin.Insert(200, 300, false, 'RectBestAreaFit', 'SplitShorterLeftoverAxis');
            assert.equal(200, insertedRect.width);
            assert.equal(300, insertedRect.height);
            assert.equal(1, bin.Occupancy());
        });
        it('Divided by two should perfectly fit', function () {
            var bin = new GuillotineBinPack(200, 300);
            var insertedRect = bin.Insert(200, 150, false, 'RectBestAreaFit', 'SplitShorterLeftoverAxis');
            assert.equal(200, insertedRect.width);
            assert.equal(150, insertedRect.height);
            assert.equal(0.5, bin.Occupancy());

            var insertedRect2 = bin.Insert(200, 150, false, 'RectBestAreaFit', 'SplitShorterLeftoverAxis');
            assert.equal(200, insertedRect2.width);
            assert.equal(150, insertedRect2.height);
            assert.equal(1, bin.Occupancy());
        });
        it('Should return 0 when full', function () {
            var bin = new GuillotineBinPack(500, 600);
            bin.Insert(600, 500, false, 'RectBestAreaFit', 'SplitShorterLeftoverAxis');
            var insertedRect = bin.Insert(200, 150, false, 'RectBestAreaFit', 'SplitShorterLeftoverAxis');
            assert.equal(0, insertedRect.height);
        });
    });
    describe("Inserts", function () {
        it('Identical size should perfectly fit', function () {
            var rects = [new Rect(0, 0, 200, 300)];
            var bin = new GuillotineBinPack(200, 300);
            bin.Inserts(rects, false, 'RectBestAreaFit', 'SplitShorterLeftoverAxis');
            assert.equal(1, bin.Occupancy());
        });
        it('Divided by two should perfectly fit', function () {
            var rects = [new Rect(0, 0, 200, 150), new Rect(0, 0, 200, 150)];
            var bin = new GuillotineBinPack(200, 300);
            bin.Inserts(rects, false, 'RectBestAreaFit', 'SplitShorterLeftoverAxis');
            assert.equal(1, bin.Occupancy());
        });
        it('Should leave rects that didn\'t fit', function () {
            var rects = [new Rect(0, 0, 200, 150), new Rect(0, 0, 200, 150), new Rect(0, 0, 100, 150), new Rect(0, 0, 100, 150)];
            var bin = new GuillotineBinPack(200, 300);
            bin.Inserts(rects, false, 'RectBestAreaFit', 'SplitShorterLeftoverAxis');
            expect(rects).to.have.lengthOf(2);
        });
    });
});