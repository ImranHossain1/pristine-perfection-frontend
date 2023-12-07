import { getErrorMessageByPropertyName } from "@/utils/schemaValidator";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IProps {
  name: string;
  type?: string;
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  size?: "md" | "lg";
}

const FormTextArea = ({
  name,
  type,
  value,
  id,
  placeholder,
  validation,
  label,
  size = "md",
}: IProps) => {
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
        render={({ field }) => (
          <textarea
            placeholder={placeholder}
            {...field}
            value={value ? value : field?.value}
            className={`h-20 p-2 md:text-lg w-11/12 md:w-full rounded bg-transparent border-2 border-solid border-[#FFCF99] focus:outline-none${
              size === "lg" ? "textarea-lg" : "textarea-md"
            }`}
          />
        )}
      />
      {errorMessage && (
        <div className="text-red-500 mt-1 text-sm">{errorMessage}</div>
      )}
    </div>
  );
};

export default FormTextArea;
