import {
  CityType,
  DistrictType,
  locationApi,
  ProjectRequest,
  ProjectType,
  StreetType,
} from '@/apis/location';
import { useCallback, useState } from 'react';

const useFetchLocation = () => {
  // List location state
  const [cities, setCities] = useState<Array<CityType>>([]);
  const [districts, setDistricts] = useState<Array<DistrictType>>([]);
  const [streets, setStreets] = useState<Array<StreetType>>([]);

  // List project state
  const [projects, setProjects] = useState<Array<ProjectType>>([]);

  const fetchCities = useCallback(() => {
    const getCities = async () => {
      try {
        const response = await locationApi.getCities();
        setCities(response);
        setDistricts([]);
        setStreets([]);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    getCities();
  }, []);

  const fetchDistricts = useCallback((city_id: number) => {
    const getDistricts = async () => {
      try {
        const response = await locationApi.getDistricts(city_id);
        setDistricts(response);
        setStreets([]);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };

    getDistricts();
  }, []);

  const fetchStreets = useCallback((city_id: number, district_id: number) => {
    const getStreets = async () => {
      try {
        const response = await locationApi.getStreets(city_id, district_id);
        setStreets(response);
      } catch (error) {
        console.error('Error fetching streets:', error);
      }
    };

    getStreets();
  }, []);

  const fetchProjects = useCallback((data: ProjectRequest) => {
    const postProjects = async () => {
      try {
        const response = await locationApi.postProjects(data);
        setProjects(response.data?.list ?? []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    postProjects();
  }, []);

  return {
    fetchCities,
    fetchDistricts,
    fetchStreets,
    fetchProjects,
    cities,
    districts,
    streets,
    projects,
    setCities,
    setDistricts,
    setStreets,
    setProjects,
  };
};

export default useFetchLocation;
