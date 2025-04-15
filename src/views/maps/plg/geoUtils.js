"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unwrapBbox = exports.wrapNum = void 0;
// taken from Leaflet
function wrapNum(x, range, includeMax) {
    var max = range[1], min = range[0], d = max - min;
    return x === max && includeMax ? x : ((((x - min) % d) + d) % d) + min;
}
exports.wrapNum = wrapNum;
function unwrapBbox(bbox0) {
    var bbox = __spreadArray([], bbox0, true), satisfies, BBox;
    if (bbox[2] < bbox[0]) {
        if (Math.abs((bbox[0] + bbox[2] + 360) / 2) >
            Math.abs((bbox[0] - 360 + bbox[2]) / 2)) {
            bbox[0] -= 360;
        }
        else {
            bbox[2] += 360;
        }
    }
    return bbox;
}
exports.unwrapBbox = unwrapBbox;