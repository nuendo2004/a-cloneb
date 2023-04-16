import usePlacesAutocomplete, {
  GeocodeResult,
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import Input from "./Input";
import { FieldValues, useForm } from "react-hook-form";
import SearchInput from "./SearchInput";
import { PropertyLocation } from "@/app/types";
import { latLng } from "leaflet";

type AutocompletePrediction = google.maps.places.AutocompletePrediction;
interface AdressSearchProps {
  isLoading: boolean;
  setFormValue: (id: string, value: any) => void;
}

const AdressSearchInput: React.FC<AdressSearchProps> = ({
  isLoading,
  setFormValue,
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleClose = () => {
    setValue("");
  };

  const handleSelect =
    ({ description }: AutocompletePrediction) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results: GeocodeResult[]) => {
        const { lat, lng } = getLatLng(results[0]);
        const location = { city: "", state: "", country: "" };
        results[0].address_components.forEach((ads) => {
          if (ads.types[0] === "locality") location.city = ads.long_name;
          if (ads.types[0] === "administrative_area_level_1")
            location.state = ads.long_name;
          if (ads.types[0] === "country") location.country = ads.long_name;
        });
        let searchRes: PropertyLocation = {
          address: description,
          location,
          latlng: [lat, lng],
        };
        setFormValue("location", searchRes);
        console.log(searchRes);

        // console.log("📍 Coordinates: ", { lat, lng });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion: AutocompletePrediction) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="p-3 hover:bg-rose-200 cursor-pointer"
        >
          <strong>{main_text}</strong>{" "}
          <small className="text-ellipsis overflow-hidden">
            {secondary_text}
          </small>
        </li>
      );
    });

  const {
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { address: "" },
  });

  return (
    <div ref={ref} className="relative">
      <SearchInput
        id="Address"
        label="Adress"
        disabled={!ready}
        value={value}
        placeholder="Adress of your property?"
        onChange={handleInput}
        error={errors}
        required
        className="my-6"
        onClose={handleClose}
      />

      {status === "OK" && (
        <ul className="border-[1px] rounded-lg overflow-auto max-h-[17rem] absolute z-20 bg-white w-full top-[4rem] ">
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
};

export default AdressSearchInput;
