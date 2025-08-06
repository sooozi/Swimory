import proj4 from 'proj4';

proj4.defs('EPSG:5174', '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs');

const tmToWgs84 = (x: number, y: number): { lat: number; lng: number } => {
  const [lng, lat] = proj4('EPSG:5174', 'WGS84', [x, y]);
  console.log(`🚩 변환된 위경도: ${lat}, ${lng}`); // 여기 반드시 찍어보세요!
  return { lat, lng };
};

export type Pool = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

export async function fetchPools(): Promise<Pool[]> {
  const serviceKey = process.env.REACT_APP_SEOUL_SPORTS_API_KEY;
  const url = `http://openapi.seoul.go.kr:8088/${serviceKey}/xml/LOCALDATA_103501/1/1000`;

  const res = await fetch(url);
  const xmlText = await res.text();

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
  const rows = Array.from(xmlDoc.getElementsByTagName('row'));

  console.log('✅ XML에서 추출한 rows 수:', rows.length);

  const result: Pool[] = [];

  for (const row of rows) {
    const name = row.getElementsByTagName('BPLCNM')[0]?.textContent || '';
    const address = row.getElementsByTagName('RDNWHLADDR')[0]?.textContent || '';
    const x = parseFloat(row.getElementsByTagName('X')[0]?.textContent || '');
    const y = parseFloat(row.getElementsByTagName('Y')[0]?.textContent || '');
    const category = row.getElementsByTagName('UPJONGNM')[0]?.textContent || '';
    const status = row.getElementsByTagName('TRDSTATENM')[0]?.textContent || '';

    if (
      !isNaN(x) &&
      !isNaN(y) &&
      (name.includes('수영') || category.includes('수영') || status === '영업')
    ) {
      const { lat, lng } = tmToWgs84(x, y);
      result.push({ name, address, lat, lng });
    }
  }

  return result;
}
