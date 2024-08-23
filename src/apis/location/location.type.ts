type CityType = {
  _id: number;
  id: number;
  name: string;
  code: string;
  slug: string;
  lat: string;
  lng: string;
  author: string | null;
  updated_date: string;
};

type DistrictType = CityType & {
  city: string;
};

type StreetType = CityType & {
  city: string;
  district: string;
};

export type { CityType, DistrictType, StreetType };
