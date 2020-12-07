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
  error?: boolean;
  helperText?: any;
  disabled?: boolean;
  style?: any;
};

export function AutoCompleteCTL({
  label,
  options,
  name,
  control,
  error,
  helperText,
  disabled = false,
  style
}: Props) {
  return (
    <Controller
      render={({ onChange, value = {}, ...props }) => {
        return (
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.label ?? ""}
            renderOption={(option) => option.label}
            disabled={disabled}
            style={style}
            renderInput={(params) => (
              <InputTM
                {...params}
                label={label}
                error={!!error}
                helperText={!!error && helperText}
              />
            )}
            value={value}
            onChange={(e, data) => onChange(data)}
            getOptionSelected={(option, value) => option.id === value.id}
            size="small"
            {...props}
          />
        );
      }}
      onChange={(data: any) => data}
      name={name}
      control={control}
    />
  );
}
