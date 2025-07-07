import { useEffect, useState, useReducer, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  Grid, 
  Divider, 
  Box, 
  FormLabel, 
  FormControlLabel, 
  FormHelperText, 
  RadioGroup, 
  Radio, 
  FormControl, 
  Button, 
  InputLabel, 
  Select, 
  MenuItem, 
  Typography,
  Snackbar,
} from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import {UserContext} from '../ContextAPI/userContext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { InputField } from "../Components";
import { Controller, useForm } from "react-hook-form";
import api from '../utils/axiosInstance';
import { apiEndPoint } from '../utils/apiEndpoints';
import axios from 'axios';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const PostAds = () => {
  const [imgsPreview, setImgsPreview] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [images, setImages] = useState([]);
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      item_name: '',
      price: '',
      condition: '',
      activity: '',
      category: '',
      location: '',
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    if(!images.length) return;
    
    setImgsPreview(images.map(el => URL.createObjectURL(el)));

    return () => URL.revokeObjectURL(imgsPreview);
  }, [images]);

  const onChangeValue = (event) => {
    const cloneImages = structuredClone(images);

    for(let i=0; i<event.target.files.length; i++){
      if(cloneImages.length > 4) break;

      cloneImages.push(event.target.files[i]);
    }

    setImages(cloneImages);
  };

  const deleteImg = (event) => {
    console.log(event.target.parentElement.dataset.imageNumber);
  }

  const otherImages = () => {
    const imgs = [];
    for(let i=1; i<5; i++){
      imgs.push(
        <Grid item xs={3} lg={2} key={i}>
          <div className='secondary-imgs-container'>
            <img src={imgsPreview[i] || './982990.jpg'} alt='some' className='image' />
            <div className="overlay">
              <div className="text" data-image-number={i}>{<DeleteForeverRoundedIcon sx={{fontSize: 20}} onClick={deleteImg} />}</div>
            </div>
          </div>
        </Grid>
      );
    }

    return imgs;
  };



  const onHandleSubmit = async (formData) => {
    try{
      if(!images.length) setShowNotification(true);
      else{    
        const {data} = await api.get(`${apiEndPoint.signedURL}/${user.data._id}/${images.length}`);

        const {item_name, price, condition, activity, category, location} = formData;
        
        const payload = {
          user_id: user.data._id,
          item_name,
          price,
          condition,
          activity,
          category,
          location,
          date: new Date().getTime(),
          images: data.keyAndUrlList.map(el => el.url.split("?")[0]),
        };
        
        const s3ImageUploadPromises = data.keyAndUrlList.map((el, index) =>
          axios.put(el.url, images[index], {
              headers: {
                'Content-Type': images[index].type
              }
            }
          )
        );

        await Promise.all(s3ImageUploadPromises);

        const {data: uploadedAdData} = await api.post(apiEndPoint.postAds, payload);
        console.log(uploadedAdData);
      }
    }
    catch(error){
      console.log(error);
    }
  };

  const handleCloseNotification = () => {setShowNotification(false);};

  return (
    <Box component='form' noValidate onSubmit={handleSubmit(onHandleSubmit)}>
      <Grid item xs={12} lg={12} sx={{marginBottom: 5}}>
        <Typography variant="h5" sx={{textAlign: 'left'}}>Post An Ad</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12} lg={12} sx={{marginBottom: 5}}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InputField 
                  fieldName='item_name'
                  control={control}
                  label='Item Name'
                  rules={{ required: { value: true, message: "Item name is required" } }}
                  required={true}
                  autoComplete={true}
                  error={!!errors.item_name}
                  helperText={errors.item_name ? errors.item_name?.message : ""}
                  inputProps={{
                    sx: {width: {xs: '300px', md: '200px'}}
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField 
                  fieldName='price'
                  control={control}
                  label='Price'
                  rules={{ required: { value: true, message: "Price is required" } }}
                  autoComplete={true}
                  error={!!errors.price}
                  helperText={errors.price ? errors.price?.message : ""}
                  inputProps={{
                    sx: {width: {xs: '300px', md: '200px'}}
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField 
                  fieldName='condition'
                  control={control}
                  label='Condition'
                  rules={{ required: { value: true, message: "Condition is required." } }}
                  required={true}
                  autoComplete={true}
                  error={!!errors.condition}
                  helperText={errors.condition ? errors.condition.message : ""}
                  inputProps={{
                    sx: {width: {xs: '300px', md: '200px'}}
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller 
                  name="category"
                  control={control}
                  rules={{required: {value: true, message: 'Please select category.'}}}
                  render={({field}) => (
                    <FormControl sx={{width: {xs: '100%'}}} error={!!errors.category}>
                      <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                      <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Option"
                      >
                        <MenuItem value='Vehicle'>Vehicle</MenuItem>
                        <MenuItem value='Electronics'>Electronics</MenuItem>
                        <MenuItem value='House'>House</MenuItem>
                      </Select>
                      <FormHelperText>{errors.category?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller 
                  name="location"
                  control={control}
                  rules={{required: {value: true, message: 'Please select location.'}}}
                  render={({field}) => (
                    <FormControl  sx={{width: {xs: "100%"}}} error={!!errors.location}>
                      <InputLabel id="demo-simple-select-label">City</InputLabel>
                      <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="City"
                      >
                        <MenuItem value={'Hyderabad'}>Hyderabad</MenuItem>
                        <MenuItem value={'Karachi'}>Karachi</MenuItem>
                        <MenuItem value={'Multan'}>Multan</MenuItem>
                        <MenuItem value={'Lahore'}>Lahore</MenuItem>
                        <MenuItem value={'Faislabad'}>Faislabad</MenuItem>
                        <MenuItem value={'Peshawar'}>Peshawar</MenuItem>
                        <MenuItem value={'Islamabad'}>Islamabad</MenuItem>
                        <MenuItem value={'Rawalpindi'}>Rawalpindi</MenuItem>
                      </Select>
                      <FormHelperText>{errors.location?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller 
                  name="activity"
                  control={control}
                  rules={{required: {value: true, message: 'Please select activity.'}}}
                  render={({field}) => (
                    <FormControl sx={{textAlign: 'left', width: {xs: "95%"}}} error={!!errors.activity}>
                      <FormLabel id="demo-row-radio-buttons-group-label">Ad Type</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel 
                          {...field}
                          value="SELL" 
                          control={<Radio />} 
                          label="Sell" 
                        />
                        <FormControlLabel 
                          {...field}
                          value="BID" 
                          control={<Radio />} 
                          label="Bid" 
                        />
                      </RadioGroup>
                      <FormHelperText>{errors.activity?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  color='success' 
                >
                  Upload file
                  <VisuallyHiddenInput 
                    type="file" 
                    onChange={e => onChangeValue(e)}
                    hidden
                    accept="image/png, image/jpeg"
                    multiple
                  />
                </Button>
              </Grid>
              <Grid item xs={12} md={12}>
                <Divider sx={{mb: 2}} />
                <Button variant='contained' type="submit">Post Ad</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <div className='primary-img-container' style={{width: "100%", background: 'yellow'}}>
                  <img src={imgsPreview[0] || './982990.jpg'} alt='some' className='image' style={{width: "100%"}} />
                  <div className="overlay">
                    <div className="text" data-image-number='0'>{<DeleteForeverRoundedIcon sx={{fontSize: 60}} onClick={deleteImg} />}</div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Grid container spacing={1}>
                  {otherImages()}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        message="Please upload at least one image."
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Box>
  );
};

export default PostAds;