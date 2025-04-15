"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMask = void 0;
var bbox_1 = require("@turf/bbox");
var difference_1 = require("@turf/difference");
var flatten_1 = require("@turf/flatten");
var helpers_1 = require("@turf/helpers");
var union_1 = require("@turf/union");
var geoUtils_1 = require("./geoUtils");
function setMask(picked, setData) {
    var _a;
    var diff = (0, difference_1.default)((0, helpers_1.featureCollection)([
        (0, helpers_1.polygon)([
            [
                [180, 90],
                [-180, 90],
                [-180, -90],
                [180, -90],
                [180, 90],
            ],
        ]),
        picked,
    ]));
    if (!diff) {
        return;
    }
    diff.properties = { isMask: true };
    var bb = (0, geoUtils_1.unwrapBbox)((0, bbox_1.default)(picked));
    // bigger features (continents, oceans) have bigger tolerance
    // because of the used source data simplification
    var tolerance = (bb[2] - bb[0]) / 360 / 1000;
    var leaksLeft = bb[0] < -180;
    var leaksRight = bb[2] > 180;
    var flattened = (0, flatten_1.default)(picked);
    if (flattened.features.length > 1 && (leaksLeft || leaksRight)) {
        for (var _i = 0, _b = flattened.features; _i < _b.length; _i++) {
            var poly = _b[_i];
            var bb_1 = (0, geoUtils_1.unwrapBbox)((0, bbox_1.default)(poly));
            if (leaksRight && bb_1[0] < -180 + tolerance) {
                for (var _c = 0, _d = poly.geometry.coordinates; _c < _d.length; _c++) {
                    var ring = _d[_c];
                    for (var _e = 0, ring_1 = ring; _e < ring_1.length; _e++) {
                        var position = ring_1[_e];
                        position[0] += 360 - tolerance;
                    }
                }
            }
            if (leaksLeft && bb_1[2] > 180 - tolerance) {
                for (var _f = 0, _g = poly.geometry.coordinates; _f < _g.length; _f++) {
                    var ring = _g[_f];
                    for (var _h = 0, ring_2 = ring; _h < ring_2.length; _h++) {
                        var position = ring_2[_h];
                        position[0] -= 360 - tolerance;
                    }
                }
            }
        }
    }
    setData((0, helpers_1.featureCollection)([
        flattened.features.length < 2 ? picked : ((_a = (0, union_1.default)(flattened)) !== null && _a !== void 0 ? _a : picked),
        diff,
    ]));
}
exports.setMask = setMask;
