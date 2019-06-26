export const wgs84 = "EPSG:4326";
export const wm = "EPSG:3857";

export const myGeoServer = "https://geoserver.wildsong.biz/geoserver";
export const workspace = "clatsop_wm";
export const astoria_ll = [-123.834,46.187];

// Limits for Clatsop County
export const MINZOOM =  8   // entire county will be visible at this level
export const MAXZOOM = 20
export const XMIN = -124.2
export const YMIN =  45.75
export const XMAX = -123.3
export const YMAX =  46.3
export const DEFAULT_CENTER = [ XMIN + (XMAX-XMIN)/2, YMIN + (YMAX-YMIN)/2 ]

export const usngPrecision = [
// dec   zoom
    0, // 0
    0, // 1
    0, // 2
    1, // 3
    1, // 4
    2, // 5
    2, // 6
    3, // 7
    3, // 8
    3, // 9
    3, // 10
    4, // 11
    4, // 12
    5, // 13
    5, // 14
    5, // 15
    5, // 16
    6, // 17
    6, // 18
    6, // 19
    6, // 20
];
