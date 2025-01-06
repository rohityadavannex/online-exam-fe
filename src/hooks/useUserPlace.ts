import { useCallback } from "react";
import cities from "src/utils/cities.json";
import { ADDRESS } from "src/utils/constants";
import countries from "src/utils/countries.json";
import states from "src/utils/states.json";

const useUserPlace = () => {
  const getUserPlaceByType = useCallback((val: string, type: ADDRESS) => {
    switch (type) {
      case ADDRESS.CITY:
        return cities.find((city) => val === city.value)?.label;
      case ADDRESS.STATE:
        return states.find((state) => val === state.value)?.label;
      case ADDRESS.COUNTRY:
        return countries.find((country) => val === country.value)?.label;
      default:
        return "";
    }
  }, []);

  const handleSearchByType = useCallback((val: string, type: ADDRESS) => {
    let list = [{ label: "", value: "" }];
    switch (type) {
      case ADDRESS.COUNTRY:
        list = countries;
        break;
      case ADDRESS.STATE:
        list = states;
        break;
      case ADDRESS.CITY:
        list = cities;
        break;

      default:
        list = [];
        break;
    }
    if (!val) {
      return list;
    }

    return list.filter(
      ({ label, value }) =>
        label.toLowerCase().includes(val?.toLowerCase()) ||
        value.toLowerCase().includes(val?.toLowerCase())
    );
  }, []);

  return {
    getUserPlaceByType,
    handleSearchByType,
  };
};

export default useUserPlace;
