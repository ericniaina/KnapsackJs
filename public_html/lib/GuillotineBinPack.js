/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function (exports) {
    "use strict";
    var libs = require("./Rect.js");
    var Rect = libs.Rect;
    function GuillotineBinPack(width, height) {
        this.width = width;
        this.height = height;
        // init
        this.usedRectangles = [];
        var n = new Rect(0, 0, width, height);
        this.freeRectangles = [];
        this.freeRectangles.push(n);
    }
    exports.GuillotineBinPack = GuillotineBinPack;
    GuillotineBinPack.prototype = {
        FreeRectChoiceHeuristic: {
            'RectBestAreaFit': function (width, height, freeRect) {
                return freeRect.width * freeRect.height - width * height;
            },
        },
        ScoreByHeuristic: function (width, height, freeRect, rectChoice) {
            return FreeRectChoiceHeuristic[rectChoice](width, height, freeRect);
        },
        Inserts: function (rects, merge, rectChoice, splitMethod) {
            var bestFreeRect = 0;
            var bestRect = 0;
            var bestFlipped = false;
            while (rects.length > 0) {
                var bestScore = Number.MAX_SAFE_INTEGER;
                for (i = 0; i < this.freeRectangles.length; ++i) {
                    for (j = 0; j < rects.length; ++i) {
                        // If this rectangle is a perfect match, we pick it instantly.
                        if (rects[j].width === this.freeRectangles[i].width && rects[j].height === this.freeRectangles[i].height)
                        {
                            bestFreeRect = i;
                            bestRect = j;
                            bestFlipped = false;
                            bestScore = Number.MIN_SAFE_INTEGER;
                            i = this.freeRectangles.length; // Force a jump out of the outer loop as well - we got an instant fit.
                            break;
                        }
                        // If flipping this rectangle is a perfect match, pick that then.
                        else if (rects[j].height === this.freeRectangles[i].width && rects[j].width === this.freeRectangles[i].height)
                        {
                            bestFreeRect = i;
                            bestRect = j;
                            bestFlipped = true;
                            bestScore = Number.MIN_SAFE_INTEGER;
                            i = this.freeRectangles.length; // Force a jump out of the outer loop as well - we got an instant fit.
                            break;
                        }
                        // Try if we can fit the rectangle upright.
                        else if (rects[j].width <= this.freeRectangles[i].width && rects[j].height <= this.freeRectangles[i].height)
                        {
                            var score = ScoreByHeuristic(rects[j].width, rects[j].height, this.freeRectangles[i], rectChoice);
                            if (score < bestScore)
                            {
                                bestFreeRect = i;
                                bestRect = j;
                                bestFlipped = false;
                                bestScore = score;
                            }
                        }
                        // If not, then perhaps flipping sideways will make it fit?
                        else if (rects[j].height <= this.freeRectangles[i].width && rects[j].width <= this.freeRectangles[i].height)
                        {
                            var score = ScoreByHeuristic(rects[j].height, rects[j].width, this.freeRectangles[i], rectChoice);
                            if (score < bestScore)
                            {
                                bestFreeRect = i;
                                bestRect = j;
                                bestFlipped = true;
                                bestScore = score;
                            }
                        }
                    }
                }

                // If we didn't manage to find any rectangle to pack, abort.
                if (bestScore === Number.MAX_SAFE_INTEGER)
                    return;
                // Otherwise, we're good to go and do the actual packing.
                var newNode = new Rect(this.freeRectangles[bestFreeRect].x, this.freeRectangles[bestFreeRect].y, rects[bestRect].width, rects[bestRect].height);
                if (bestFlipped) {
                    var temp = newNode.width;
                    newNode.width = newNode.height;
                    newNode.height = temp;
                }
                // Remove the free space we lost in the bin.
                SplitFreeRectByHeuristic(this.freeRectangles[bestFreeRect], newNode, splitMethod);
                this.freeRectangles.splice(bestFreeRect, 1);
                // Remove the rectangle we just packed from the input list.
                rects.splice(bestRect, 1);
                // Perform a Rectangle Merge step if desired.
                if (merge)
                    MergeFreeList();
                // Remember the new used rectangle.
                this.usedRectanglesusedRectangles.push(newNode);
            }
        },
        SplitFreeRectByHeuristic: function (freeRect, placedRect, splitMethod) {
            // Compute the lengths of the leftover area.
            var w = freeRect.width - placedRect.width;
            var h = freeRect.height - placedRect.height;
            // Placing placedRect into freeRect results in an L-shaped free area, which must be split into
            // two disjoint rectangles. This can be achieved with by splitting the L-shape using a single line.
            // We have two choices: horizontal or vertical.	

            // Use the given heuristic to decide which choice to make.

            var splitHorizontal;
            switch (splitMethod)
            {
                case 'SplitShorterLeftoverAxis':
                    // Split along the shorter leftover axis.
                    splitHorizontal = (w <= h);
                    break;
                case 'SplitLongerLeftoverAxis':
                    // Split along the longer leftover axis.
                    splitHorizontal = (w > h);
                    break;
                case 'SplitMinimizeArea':
                    // Maximize the larger area == minimize the smaller area.
                    // Tries to make the single bigger rectangle.
                    splitHorizontal = (placedRect.width * h > w * placedRect.height);
                    break;
                case 'SplitMaximizeArea':
                    // Maximize the smaller area == minimize the larger area.
                    // Tries to make the rectangles more even-sized.
                    splitHorizontal = (placedRect.width * h <= w * placedRect.height);
                    break;
                case 'SplitShorterAxis':
                    // Split along the shorter total axis.
                    splitHorizontal = (freeRect.width <= freeRect.height);
                    break;
                case 'SplitLongerAxis':
                    // Split along the longer total axis.
                    splitHorizontal = (freeRect.width > freeRect.height);
                    break;
                default:
                    splitHorizontal = true;
            }

            // Perform the actual split.
            SplitFreeRectAlongAxis(freeRect, placedRect, splitHorizontal);
        },
        SplitFreeRectAlongAxis: function (freeRect, placedRect, splitHorizontal) {
            // Form the two new rectangles.
            var bottom = new Rect(0, 0, 0, 0);
            bottom.x = freeRect.x;
            bottom.y = freeRect.y + placedRect.height;
            bottom.height = freeRect.height - placedRect.height;
            var right = new Rect(0, 0, 0, 0);
            right.x = freeRect.x + placedRect.width;
            right.y = freeRect.y;
            right.width = freeRect.width - placedRect.width;
            if (splitHorizontal)
            {
                bottom.width = freeRect.width;
                right.height = placedRect.height;
            }
            else // Split vertically
            {
                bottom.width = placedRect.width;
                right.height = freeRect.height;
            }

            // Add the new rectangles into the free rectangle pool if they weren't degenerate.
            if (bottom.width > 0 && bottom.height > 0)
                this.freeRectangles.push(bottom);
            if (right.width > 0 && right.height > 0)
                this.freeRectangles.push(right);
        },
        MergeFreeList: function () {
            // Do a Theta(n^2) loop to see if any pair of free rectangles could me merged into one.
            // Note that we miss any opportunities to merge three rectangles into one. (should call this function again to detect that)
            for (var i = 0; i < this.freeRectangles.size(); ++i) {
                for (var j = i + 1; j < this.freeRectangles.size(); ++j)
                {
                    if (this.freeRectangles[i].width == this.freeRectangles[j].width && this.freeRectangles[i].x == this.freeRectangles[j].x)
                    {
                        if (this.freeRectangles[i].y == this.freeRectangles[j].y + this.freeRectangles[j].height)
                        {
                            this.freeRectangles[i].y -= this.freeRectangles[j].height;
                            this.freeRectangles[i].height += this.freeRectangles[j].height;
                            this.freeRectangles.erase(this.freeRectangles.begin() + j);
                            --j;
                        }
                        else if (this.freeRectangles[i].y + this.freeRectangles[i].height == this.freeRectangles[j].y)
                        {
                            this.freeRectangles[i].height += this.freeRectangles[j].height;
                            this.freeRectangles.erase(this.freeRectangles.begin() + j);
                            --j;
                        }
                    }
                    else if (this.freeRectangles[i].height == this.freeRectangles[j].height && this.freeRectangles[i].y == this.freeRectangles[j].y)
                    {
                        if (this.freeRectangles[i].x == this.freeRectangles[j].x + this.freeRectangles[j].width)
                        {
                            this.freeRectangles[i].x -= this.freeRectangles[j].width;
                            this.freeRectangles[i].width += this.freeRectangles[j].width;
                            this.freeRectangles.erase(this.freeRectangles.begin() + j);
                            --j;
                        }
                        else if (this.freeRectangles[i].x + this.freeRectangles[i].width == this.freeRectangles[j].x)
                        {
                            this.freeRectangles[i].width += this.freeRectangles[j].width;
                            this.freeRectangles.erase(this.freeRectangles.begin() + j);
                            --j;
                        }
                    }
                }
            }
        },
        Insert: function (width, height, merge, rectChoice, splitMethod) {
            var freeNodeIndex = 0;
            var newRect = FindPositionForNewNode(width, height, rectChoice, freeNodeIndex);
        },
        FindPositionForNewNode: function (width, height, rectChoice, nodeIndex) {
            
        }
    };
})(this);