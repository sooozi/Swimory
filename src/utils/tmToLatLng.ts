export function tmToLatLng(x: number, y: number): { lat: number; lng: number } {
    const RE = 6371000.0;
    const GRID = 5.0;
    const XO = 200000.0;
    const YO = 500000.0;

    const DEGRAD = Math.PI / 180.0;
    const RADDEG = 180.0 / Math.PI;

    const lon = (x - XO) / RE / Math.cos(38 * DEGRAD) + 127.5;
    const lat = (y - YO) / RE + 38.0;

    return { lat, lng: lon };
}
