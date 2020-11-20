import React from "react";
import { Controller } from "react-hook-form";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import { InputTM } from "./inputTM";

type Props = NumberFormatProps & React.ComponentPropsWithoutRef<typeof InputTM>;

export function MaskedInputTM(props: Props) {
  return <NumberFormat customInput={InputTM} {...props} />;
}

type ControlledProps = React.ComponentPropsWithoutRef<typeof MaskedInputTM> &
  Omit<React.ComponentProps<typeof Controller>, "as">;

export function MaskedInputCTL({
  control,
  name,
  rules,
  ...rest
}: ControlledProps) {
  return (
    <Controller
      as={MaskedInputTM}
      name={name ?? ""}
      control={control}
      rules={rules}
      defaultValue=""
      {...rest}
    />
  );
}
