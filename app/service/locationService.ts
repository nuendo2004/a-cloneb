import axios from "axios";

const getAttractions = (
  radius: number,
  latlng: number[],
  kind: string,
  listSize: number
) => {
  const url = `${process.env.NEXT_PUBLIC_MAP_PLACES_API}/radius?radius=${radius}&lon=${latlng[1]}&lat=${latlng[0]}&kind=${kind}&format=json&limit=${listSize}&apikey=${process.env.NEXT_PUBLIC_MAP_PLACES_KEY}`;
  return axios.get(url);
};

export { getAttractions };
