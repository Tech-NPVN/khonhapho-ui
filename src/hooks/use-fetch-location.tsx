import { CityType, DistrictType, locationApi, StreetType } from '@/apis/location';
import { useCallback, useState } from 'react';

const useFetchLocation = () => {
  // List location state
  const [cities, setCities] = useState<Array<CityType>>([]);
  const [districts, setDistricts] = useState<Array<DistrictType>>([]);
  const [streets, setStreets] = useState<Array<StreetType>>([]);

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

  return {
    fetchCities,
    fetchDistricts,
    fetchStreets,
    cities,
    districts,
    streets,
    setCities,
    setDistricts,
    setStreets,
  };
};

export default useFetchLocation;
