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
  rules,
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
      />
    )}
    rules={rules}
    control={control}
    name={name ?? ""}
    defaultValue=""
    {...rest}
  />
);
