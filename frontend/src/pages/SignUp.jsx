import Avatar from "@mui/material/Avatar";
import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Autocomplete,
  Typography,
  Container,
} from "@mui/material";
import { InputField } from "../Components";
import api from "../utils/axiosInstance";
import { apiEndPoint } from "../utils/apis";
import { Controller, useForm } from "react-hook-form";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

export default function SignUp() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      lastname: "",
      contact: "",
      nic: "",
      email: "",
      password: "",
      location: "",
    },
    mode: "onSubmit",
  });

  const cities = [
    { label: "Hyderabad", key: "Hyderabad" },
    { label: "Multan", key: "Multan" },
    { label: "Faislabad", key: "Faislabad" },
    { label: "Peshawar", key: "Peshawar" },
    { label: "Lahore", key: "Lahore" },
    { label: "Karachi", key: "Karachi" },
    { label: "Islamabad", key: "Islamabad" },
    { label: "Rawalpindi", key: "Rawalpindi" },
  ];

  const onHandleSubmit = async (payload) => {
    try {
      const { data } = await api.post(apiEndPoint.signUp, {...payload, location: payload.location.key});
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4" sx={{ display: "flex"}}>
          <Avatar sx={{ mr: 1, bgcolor: "secondary.main" }}>
            <AccountCircleRoundedIcon />
          </Avatar>
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onHandleSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField
                fieldName="name"
                control={control}
                rules={{ required: { value: true, message: "Name is required" } }}
                required={true}
                label= "Name"
                autoComplete={true}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                fieldName="lastname"
                control={control}
                rules={{ required: { value: true, message: "Last name is required" } }}
                required={true}
                label="Last Name"
                error={!!errors.lastname}
                helperText={errors.lastname ? errors.lastname.message : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                fieldName="email"
                control={control}
                rules={{ 
                  required: { value: true, message: "Email is required" },
                  pattern: { value: /^\S+@\S+$/, message: "Invalid email format" } 
                }}
                required={true}
                label="Email Address"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                fieldName="nic"
                control={control}
                rules={{ required: { value: true, message: "NIC is required" } }}
                required={true}
                id="nic"
                label="CNIC"
                inputProps={{ maxLength: 13 }}
                error={!!errors.nic}
                helperText={errors.nic ? errors.nic.message : "Please enter your CNIC without dash."}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                fieldName="password"
                control={control}
                rules={{ 
                  required: { value: true, message: "Password is required" },
                  minLength: { value: 6, message: "Password should be atleast 6 characters long" }
                }}
                required={true}
                id="password"
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : "Password should be atleast 6 characters long."}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                fieldName="contact"
                control={control}
                rules={{ required: { value: true, message: "Phone is required" } }}
                required={true}
                label="Phone"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 13 }}
                error={!!errors.contact}
                helperText={errors.contact ? errors.contact.message : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="location"
                control={control}
                rules={{ required: { value: true, message: "Location is required" } }}
                render={({ field }) => (
                <Autocomplete
                {...field}
                  id="country-select"
                  options={cities}
                  isOptionEqualToValue={(option, value) => value ? option.key === value.key : false}
                  fullWidth
                  autoHighlight
                  value={field.value || null}
                  getOptionLabel={(option) => option.label || ""}
                  onChange={(_, data) => field.onChange(data)}
                  renderOption={(props, option) => {
                    return (
                      <Box component="li" {...props}>
                        {option.label}
                      </Box>
                    )
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose a city"
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
                )}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
