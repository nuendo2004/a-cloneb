import useCountries from "@/app/hooks/useCountries";
import React from "react";
import Select from "react-select";
import Input from "./Input";
import { useForm, FieldValues } from "react-hook-form";
import AdressSearchInput from "./AddressSearchInput";
interface CountrySelectProps {
  value?: CountrySelection;
  onChange: (value: CountrySelection) => void;
  className?: string;
}
export type CountrySelection = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  className,
}) => {
  const { getAll } = useCountries();

  return (
    <div className={className}>
      <Select
        classNames={{
          control: () => "p-1",
          input: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#797676",
            primary25: "#e4dddd",
          },
        })}
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelection)}
        formatOptionLabel={(option: any) => (
          <div className="flex items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-400 ml-1">{option.region}</span>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default CountrySelect;
