import { Input } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

const MyInput = ({
  type,
  label,
  labelPlacement = "inside",
  variant = "bordered",
  placeholder,
  disabled,
  name,
  errors,
  setValue,
  trigger,
  className
}: {
  type: string;
  label: string;
  labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
  variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
  placeholder: string;
  disabled: boolean;
  name: string;
  errors: any;
  setValue: any;
  trigger: any;
  className?:string;
}) => {
  return (
    <div className = {
      twMerge(
        className ? className : ""
      )
    }>
      <Input
        name={name}
        radius="sm"
        type={type}
        label={label}
        labelPlacement={labelPlacement}
        variant={variant}
        placeholder={placeholder}
        disabled={disabled}
        isInvalid={errors[`${name}`] ? true : false}
        errorMessage={errors[`${name}`]?.message}
        onValueChange={(val: string) => {
          setValue(name, val);
          trigger(name);
        }}
      />
    </div>
  );
};

export default MyInput;
