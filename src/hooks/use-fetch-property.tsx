import { locationApi, PropertyType } from '@/apis/location';
import { useCallback, useState } from 'react';

const useFetchProperty = () => {
  // List properties state
  const [contractType, setContractType] = useState<Array<PropertyType>>([]);
  const [legalStatus, setLegalStatus] = useState<Array<PropertyType>>([]);
  const [propertyFeature, setPropertyFeature] = useState<Array<PropertyType>>([]);
  const [propertyType, setPropertyType] = useState<Array<PropertyType>>([]);
  const [saleStatus, setSaleStatus] = useState<Array<PropertyType>>([]);

  const fetchProperties = useCallback(() => {
    const postProperties = async () => {
      try {
        const response = await locationApi.postProperties();

        if (response.data) {
          const { contract_type, legal_status, property_feature, property_type, sale_status } =
            response.data;

          setContractType(contract_type);
          setLegalStatus(legal_status);
          setPropertyFeature(property_feature);
          setPropertyType(property_type);
          setSaleStatus(sale_status);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    postProperties();
  }, []);

  return { contractType, legalStatus, propertyFeature, propertyType, saleStatus, fetchProperties };
};

export default useFetchProperty;
