import countries, { Country } from "world-countries";

const allCountries = countries.map((country: Country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => allCountries;
  const getCountryByValue = (name: string) => {
    return allCountries.find((country) => country.value === name);
  };
  return {
    getAll,
    getCountryByValue,
  };
};

export default useCountries;
