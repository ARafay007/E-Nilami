import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

const InputField = ({
  fieldName, 
  control, 
  rules = {}, 
  label,
  autoComplete = "",
  id = null,
  helperText = "",
  inputProps = {},
  error=false,
  type="text",
}) => (
  <Controller 
    name={fieldName}
    control={control}
    rules={rules}
    render={({ field }) => (
      <TextField
        {...field}
        required={true}
        fullWidth={true}
        id={id || fieldName}
        label={label}
        autoComplete={autoComplete && fieldName}
        helperText={helperText}
        error={error}
        type={type}
        inputProps={inputProps}
      />
    )}
  />
);

export default InputField;