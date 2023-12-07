import { getErrorMessageByPropertyName } from "@/utils/schemaValidator";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type ISelectOptions = {
  value: string;
  label: string;
};

interface ISelectProps {
  name: string;
  options: ISelectOptions[];
  value?: string | string[] | undefined;
  defaultValue?: ISelectOptions;
  size?: "small" | "large";
  label?: string;
  placeholder?: string;
}

const FormSelectInput = ({
  name,
  options,
  defaultValue,
  value,
  size,
  label,
  placeholder,
}: ISelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(name, errors);
  return (
    <div className="mb-5">
      {label && <div className="mb-1"> {label ? label : ""}</div>}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <select
            onChange={onChange}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected>
              {label}
            </option>
            {options &&
              options?.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        )}
      />
      {errorMessage && (
        <div className="text-red-500 mt-1 text-sm">{errorMessage}</div>
      )}
    </div>
  );
};

export default FormSelectInput;
