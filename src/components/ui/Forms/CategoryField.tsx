import { useCategoriesQuery } from "@/redux/api/categoryApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";

type DriverFieldProps = {
  name: string;
  label: string;
};

const CategoryField = ({ name, label }: DriverFieldProps) => {
  const { data, isLoading } = useCategoriesQuery({ limit: 100 });

  const categoryOptions = data?.map((d: any) => {
    return {
      label: d?.title,
      value: d?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={categoryOptions as SelectOptions[]}
    />
  );
};

export default CategoryField;
