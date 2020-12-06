import React from "react";
import { Controller } from "react-hook-form";
import { InputTM } from "./inputTM";

type ControlledProps = React.ComponentProps<typeof InputTM> &
  Omit<React.ComponentProps<typeof Controller>, "as">;

export const InputCTL = ({
  control,
  name,
  onFocus: ignored,
  onChange = (e) => e.target.value,
  disabled,
  ...rest
}: ControlledProps) => (
  <Controller
    render={(props) => (
      <InputTM
        {...props}
        {...rest}
        onChange={(e) => {
          props.onChange(onChange(e));
        }}
        disabled={disabled}
      />
    )}
    control={control}
    name={name ?? ""}
    defaultValue=""
    {...rest}
  />
);
