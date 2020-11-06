import React from "react";
import { Controller } from "react-hook-form";
import { InputTM } from "./inputTM";

type ControlledProps = React.ComponentProps<typeof InputTM> &
  Omit<React.ComponentProps<typeof Controller>, "as">;

export const InputCTL = ({
  control,
  name,
  onFocus,
  ...rest
}: ControlledProps) => (
  <Controller
    render={({ onChange, ...props }) => (
      <InputTM
        {...props}
        {...rest}
        onChange={(...e) => {
          onChange(...e);
        }}
      />
    )}
    control={control}
    name={name ?? ""}
    defaultValue=""
    {...rest}
  />
);
