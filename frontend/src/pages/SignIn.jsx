import React, {useState, useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {
  Avatar, 
  Button, 
  CssBaseline, 
  Snackbar,
  Paper, 
  Box, 
  Grid, 
  Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {UserContext} from '../ContextAPI/userContext';
import { useForm } from "react-hook-form";
import { InputField } from '../Components';
import api from '../utils/axiosInstance';
import { apiEndPoint } from "../utils/apiEndpoints";

export default function SignInPage() {
  const {defineUser, lastPageVisited} = useContext(UserContext);
  const navigate = useNavigate();
  const [toggleNotification, setToggleNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });
  
  const onHandleSubmit = async (payload) => {
    try{ 
      const {data} = await api.post(apiEndPoint.login, payload);
      sessionStorage.setItem('token', `Bearer ${data.token}`);
      
      defineUser(data);
  
      lastPageVisited ? navigate(lastPageVisited, {state: {userId: data.data}}) : navigate('/');  
    }
    catch(_){
      setToggleNotification(true);
      setNotificationMsg('Email or password is incorrect.');
    }
  };

  const onHandleCloseNotification = () => {
    setToggleNotification(false);
  }

  return (
    <Grid container component="main" sx={{ height: 'auto' }}>
      <CssBaseline />
      <Grid
        item
        sm={2}
        md={3.5}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ display: "flex", alignItems: 'center'}}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onHandleSubmit)} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputField
                  fieldName="email"
                  control={control}
                  rules={{ required: { value: true, message: "Email Address is required" } }}
                  label="Email Address"
                  autoComplete={true}
                  required={true}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  fieldName="password"
                  control={control}
                  rules={{ required: { value: true, message: "Password Address is required" } }}
                  label="Password"
                  type="password"
                  required={true}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                />
              </Grid>
            </Grid>
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Link to="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link to="/signUp" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Snackbar
        open={toggleNotification}
        onClose={onHandleCloseNotification}
        message={notificationMsg}
        autoHideDuration={4000}
      />
    </Grid>
  );
}