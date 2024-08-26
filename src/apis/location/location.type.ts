import { ApiResponse } from '../api.type';

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
  city: number;
};

type StreetType = CityType & {
  city: number;
  district: number;
};

type ProjectType = {
  _id: string;
  author_id: number;
  author_name: string;
  city: number;
  city_name: string;
  code: string;
  created_date: string;
  description: string;
  district: number;
  district_name: string;
  name: string;
  order: number;
  updated_date: string;
};

class ProjectRequest {
  city: number;
  district: number;
  key?: string;
  limit?: number;
  page?: number;

  constructor(req: ProjectRequest) {
    this.city = req.city;
    this.district = req.district;
    this.key = '';
    this.limit = -1;
    this.page = 1;
  }
}

class ProjectResponse extends ApiResponse<{
  list: Array<ProjectType>;
  total: number;
}> {
  data?: {
    list: Array<ProjectType>;
    total: number;
  };
}

type PropertyType = {
  _id: string;
  name: string;
  code: string;
};

type PropertyDataType = {
  contract_type: Array<PropertyType>;
  legal_status: Array<PropertyType>;
  property_feature: Array<PropertyType>;
  property_type: Array<PropertyType>;
  sale_status: Array<PropertyType>;
};

class PropertyResponse extends ApiResponse<PropertyDataType> {
  data?: PropertyDataType;
}

export type { CityType, DistrictType, StreetType, ProjectType, PropertyType, PropertyDataType };
export { ProjectRequest, ProjectResponse, PropertyResponse };
