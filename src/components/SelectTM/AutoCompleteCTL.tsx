import React from "react";

import { Autocomplete } from "@material-ui/lab";
import { InputTM } from "../InputTM/inputTM";
import { Control, Controller } from "react-hook-form";

export type OptionsType = Array<{
  id: string;
  label: string;
}>;
type Props = {
  label: string;
  options: OptionsType;
  name: string;
  control: Control;
  rules?: {};
  error?: boolean;
  helperText?: any;
};

export function AutoCompleteCTL({
  label,
  options,
  name,
  control,
  rules,
  error,
  helperText,
}: Props) {
  return (
    <Controller
      render={({ onChange, value = [], ...props }) => (
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.label}
          renderOption={(option) => option.label}
          renderInput={(params) => (
            <InputTM
              {...params}
              label={label}
              error={!!error}
              helperText={!!error && helperText}
            />
          )}
          onChange={(e, data) => onChange(data)}
          getOptionSelected={(option, value) => option.id === value.id}
          size="small"
          {...props}
        />
      )}
      onChange={(data: any) => data}
      rules={rules}
      name={name}
      control={control}
    />
  );
}
