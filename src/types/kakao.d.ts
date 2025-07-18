declare global {
  interface Window {
    kakao: any;
  }
}

declare namespace kakao {
  namespace maps {
    class Map {
      constructor(container: HTMLElement, options: any);
      setCenter(latlng: LatLng): void;
      setLevel(level: number): void;
      getCenter(): LatLng;
      getLevel(): number;
    }

    class LatLng {
      constructor(lat: number, lng: number);
      getLat(): number;
      getLng(): number;
    }

    class Marker {
      constructor(options: any);
      setMap(map: Map | null): void;
      setPosition(latlng: LatLng): void;
      getPosition(): LatLng;
    }

    class InfoWindow {
      constructor(options: any);
      open(map: Map, marker: Marker): void;
      close(): void;
    }

    namespace services {
      class Geocoder {
        constructor();
        addressSearch(
          address: string,
          callback: (result: any, status: any) => void
        ): void;
        coord2Address(
          lng: number,
          lat: number,
          callback: (result: any, status: any) => void
        ): void;
      }

      const Status: {
        OK: string;
        ZERO_RESULT: string;
        ERROR: string;
      };
    }
  }
}

export {}; 