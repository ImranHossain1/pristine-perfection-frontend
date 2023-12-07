import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ISelectProps {
  name: string;
  value?: number | undefined;
  label?: string;
}

const FormRatingInput = ({ name, value, label }: ISelectProps) => {
  const { control } = useFormContext();
  return (
    <>
      {label ? label : ""}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <input
            type="radio"
            name="rating"
            className="mask mask-star"
            onChange={onChange}
            value="value"
            defaultValue={""}
          />
        )}
      />
    </>
  );
};

export default FormRatingInput;
