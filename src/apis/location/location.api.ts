import http from '@/lib/http';
import {
  CityType,
  DistrictType,
  ProjectRequest,
  ProjectResponse,
  PropertyResponse,
  StreetType,
} from './location.type';

const __location_endpoint = process.env.NEXT_PUBLIC_LOCATION_API;
const __project_endpoint = process.env.NEXT_PUBLIC_PROJECT_API;
const __property_endpoint = process.env.NEXT_PUBLIC_PROPERTY_API;

const locationApi = {
  getCities: () =>
    http.get<Array<CityType>>('/cities', {
      base_url: __location_endpoint,
      cache: 'force-cache',
      next: { revalidate: 3600 },
    }),
  getDistricts: (city_id: number) =>
    http.get<Array<DistrictType>>(`/districts/${city_id}`, {
      base_url: __location_endpoint,
      cache: 'force-cache',
      next: { revalidate: 3600 },
    }),
  getStreets: (city_id: number, district_id: number) =>
    http.get<Array<StreetType>>(`/streets/${city_id}/${district_id}`, {
      base_url: __location_endpoint,
      cache: 'force-cache',
      next: { revalidate: 3600 },
    }),

  // Require authentication
  postProjects: (data: ProjectRequest) =>
    http.post<ProjectResponse, ProjectRequest>('/search', data, {
      base_url: __project_endpoint,
      cache: 'force-cache',
      next: { revalidate: 3600 },
    }),
  postProperties: () =>
    http.post<PropertyResponse, undefined>('/getFilter', undefined, {
      base_url: __property_endpoint,
      cache: 'force-cache',
      next: { revalidate: 10000 },
    }),
};

export { locationApi };
