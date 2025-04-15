"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.createOpenLayersMapController = void 0;
var ol_1 = require("ol");
var geom_1 = require("ol/geom");
var Vector_1 = require("ol/layer/Vector");
var proj_1 = require("ol/proj");
var Vector_2 = require("ol/source/Vector");
var Fill_1 = require("ol/style/Fill");
var Icon_1 = require("ol/style/Icon");
var Stroke_1 = require("ol/style/Stroke");
var Style_1 = require("ol/style/Style");
var Text_1 = require("ol/style/Text");
var mask_1 = require("./mask");
var EPSG_4326 = "EPSG:4326";
function defaultStyle(feature) {
    var _a;
    var properties = feature.getProperties();
    var isMask = properties.isMask;
    var type = (_a = feature.getGeometry()) === null || _a === void 0 ? void 0 : _a.getType();
    var weight = isMask
        ? 0
        : type === "LineString" || type === "MultiLineString"
            ? 3
            : 2;
    return new Style_1.default({
        stroke: isMask
            ? undefined
            : new Stroke_1.default({
                color: "#3170fe",
                lineDash: [weight, weight],
                width: weight,
                lineCap: "butt",
            }),
        fill: isMask
            ? new Fill_1.default({
                color: "#00000020",
            })
            : undefined,
        image: new Icon_1.default({
            src: "/icons/marker_".concat(properties.isReverse
                ? "reverse"
                : properties.isSelected
                    ? "selected"
                    : "unselected", ".svg"),
            anchor: [0.5, 1],
        }),
        zIndex: properties.isSelected ? 2 : properties.isReverse ? 0 : 1,
        text: properties.isSelected && properties.tooltip
            ? new Text_1.default({
                backgroundFill: new Fill_1.default({ color: "white" }),
                text: properties.tooltip,
                offsetY: -40,
                backgroundStroke: new Stroke_1.default({
                    color: "white",
                    lineJoin: "round",
                    width: 3,
                }),
                padding: [2, 0, 0, 2],
            })
            : undefined,
    });
}
function createOpenLayersMapController(map, flyToOptions, flyToBounds, fullGeometryStyle) {
    if (flyToOptions === void 0) { flyToOptions = {}; }
    if (flyToBounds === void 0) { flyToBounds = {}; }
    if (fullGeometryStyle === void 0) { fullGeometryStyle = defaultStyle; }
    var prevSelected = -1;
    var prevHovered;
    var eventHandler;
    var reverseMarker;
    var indicatingReverse = false;
    var vectorLayer = new Vector_1.default({
        updateWhileAnimating: true,
    });
    map.addLayer(vectorLayer);
    var source = new Vector_2.default({});
    vectorLayer.setSource(source);
    vectorLayer.setStyle(fullGeometryStyle);
    map.on("click", function (e) {
        map.forEachFeatureAtPixel(e.pixel, function (feature) {
            var id = feature.getId();
            if (!id) {
                return;
            }
            e.stopPropagation();
            eventHandler === null || eventHandler === void 0 ? void 0 : eventHandler({ type: "markerClick", id: id });
            return feature;
        });
    });
    map.on("pointermove", function (e) {
        var featureId = map.forEachFeatureAtPixel(e.pixel, function (feature) {
            return feature.getId();
        });
        if (prevHovered === featureId) {
            return;
        }
        if (prevHovered) {
            eventHandler === null || eventHandler === void 0 ? void 0 : eventHandler({
                type: "markerMouseLeave",
                id: prevHovered,
            });
        }
        if (featureId) {
            eventHandler === null || eventHandler === void 0 ? void 0 : eventHandler({
                type: "markerMouseEnter",
                id: featureId,
            });
        }
        map.getTargetElement().style.cursor = featureId
            ? "pointer"
            : indicatingReverse
                ? "crosshair"
                : "";
        prevHovered = featureId;
    });
    function getProjection() {
        var _a;
        return (_a = (0, proj_1.getUserProjection)()) !== null && _a !== void 0 ? _a : map.getView().getProjection();
    }
    function fromWgs84(geometry) {
        return geometry.transform(EPSG_4326, getProjection());
    }
    var handleMapClick = function (e) {
        eventHandler === null || eventHandler === void 0 ? void 0 : eventHandler({
            type: "mapClick",
            coordinates: (0, proj_1.toLonLat)(e.coordinate, getProjection()),
        });
    };
    return {
        setEventHandler: function (handler) {
            if (handler) {
                eventHandler = handler;
                map.on("click", handleMapClick);
            }
            else {
                eventHandler = undefined;
                map.un("click", handleMapClick);
            }
        },
        flyTo: function (center, zoom) {
            map.getView().animate(__assign(__assign(__assign({ center: (0, proj_1.fromLonLat)(center, getProjection()) }, (zoom ? { zoom: zoom } : {})), { duration: 2000 }), flyToOptions));
        },
        fitBounds: function (bbox, padding, maxZoom) {
            map.getView().fit((0, proj_1.transformExtent)(bbox, EPSG_4326, getProjection()), __assign(__assign(__assign({ padding: [padding, padding, padding, padding] }, (maxZoom ? { maxZoom: maxZoom } : {})), { duration: 2000 }), flyToBounds));
        },
        indicateReverse: function (reverse) {
            indicatingReverse = reverse;
            map.getTargetElement().style.cursor = reverse ? "crosshair" : "";
        },
        setReverseMarker: function (coordinates) {
            if (reverseMarker) {
                if (!coordinates) {
                    source.removeFeature(reverseMarker);
                    reverseMarker.dispose();
                    reverseMarker = undefined;
                }
                else {
                    reverseMarker.getGeometry().setCoordinates((0, proj_1.fromLonLat)(coordinates, getProjection()));
                }
            }
            else if (coordinates) {
                reverseMarker = new ol_1.Feature(new geom_1.Point((0, proj_1.fromLonLat)(coordinates, getProjection())));
                reverseMarker.setProperties({ isReverse: true });
                source.addFeature(reverseMarker);
            }
        },
        setMarkers: function (markedFeatures, picked) {
            function setData(data) {
                var _a;
                if (!data) {
                    return;
                }
                for (var _i = 0, _b = data.features; _i < _b.length; _i++) {
                    var f = _b[_i];
                    var geom = f.geometry.type === "Polygon"
                        ? new geom_1.Polygon(f.geometry.coordinates)
                        : f.geometry.type === "MultiPolygon"
                            ? new geom_1.MultiPolygon(f.geometry.coordinates)
                            : null;
                    if (!geom) {
                        continue;
                    }
                    source.addFeature(new ol_1.Feature({
                        isMask: !!((_a = f.properties) === null || _a === void 0 ? void 0 : _a.isMask),
                        geometry: fromWgs84(geom),
                    }));
                }
            }
            source.clear();
            if (reverseMarker) {
                source.addFeature(reverseMarker);
            }
            if (picked) {
                var handled = false;
                if (picked.geometry.type === "GeometryCollection") {
                    var geoms = picked.geometry.geometries
                        .map(function (geometry) {
                        return geometry.type === "Polygon"
                            ? new geom_1.Polygon(geometry.coordinates)
                            : geometry.type === "MultiPolygon"
                                ? new geom_1.MultiPolygon(geometry.coordinates)
                                : null;
                    })
                        .filter(function (a) { return !!a; });
                    if (geoms.length > 0) {
                        source.addFeature(new ol_1.Feature(fromWgs84(new geom_1.GeometryCollection(geoms))));
                        handled = true;
                    }
                    else {
                        for (var _i = 0, _a = picked.geometry.geometries; _i < _a.length; _i++) {
                            var geometry = _a[_i];
                            if (geometry.type === "LineString") {
                                source.addFeature(new ol_1.Feature(fromWgs84(new geom_1.LineString(geometry.coordinates))));
                                handled = true;
                            }
                            else if (geometry.type === "MultiLineString") {
                                source.addFeature(new ol_1.Feature(fromWgs84(new geom_1.MultiLineString(geometry.coordinates))));
                            }
                            handled = true;
                        }
                    }
                }
                if (handled) {
                    // nothing
                }
                else if (picked.geometry.type === "Polygon") {
                    (0, mask_1.setMask)(picked, setData);
                }
                else if (picked.geometry.type === "MultiPolygon") {
                    (0, mask_1.setMask)(picked, setData);
                }
                else if (picked.geometry.type === "LineString") {
                    source.addFeature(new ol_1.Feature(fromWgs84(new geom_1.LineString(picked.geometry.coordinates))));
                    return; // no pin for (multi)linestrings
                }
                else if (picked.geometry.type === "MultiLineString") {
                    source.addFeature(new ol_1.Feature(fromWgs84(new geom_1.MultiLineString(picked.geometry.coordinates))));
                    return; // no pin for (multi)linestrings
                }
                source.addFeature(new ol_1.Feature(fromWgs84(new geom_1.Point(picked.center))));
            }
            for (var _b = 0, _c = markedFeatures !== null && markedFeatures !== void 0 ? markedFeatures : []; _b < _c.length; _b++) {
                var feature = _c[_b];
                if (feature === picked) {
                    continue;
                }
                var marker = new ol_1.Feature(new geom_1.Point((0, proj_1.fromLonLat)(feature.center, getProjection())));
                marker.setId(feature.id);
                marker.setProperties({
                    fuzzy: !!feature.matching_text,
                    tooltip: feature.place_type[0] === "reverse"
                        ? feature.place_name
                        : feature.place_name.replace(/,.*/, ""),
                });
                source.addFeature(marker);
            }
        },
        setSelectedMarker: function (index) {
            var _a, _b, _c;
            var features = source.getFeatures();
            var offset = ((_a = features[0]) === null || _a === void 0 ? void 0 : _a.getProperties().isReverse) ? 1 : 0;
            if (prevSelected > -1) {
                (_b = features[prevSelected + offset]) === null || _b === void 0 ? void 0 : _b.setProperties({
                    isSelected: false,
                });
            }
            if (index > -1) {
                (_c = features[index + offset]) === null || _c === void 0 ? void 0 : _c.setProperties({
                    isSelected: true,
                });
            }
            prevSelected = index;
        },
        getCenterAndZoom: function () {
            var view = map.getView();
            var center = view.getCenter();
            var zoom = view.getZoom();
            if (!center || zoom === undefined) {
                return undefined;
            }
            return __spreadArray([zoom], (0, proj_1.toLonLat)(center, getProjection()), true);
        },
    };
    // satisfies;
    // MapController;
}
exports.createOpenLayersMapController = createOpenLayersMapController;