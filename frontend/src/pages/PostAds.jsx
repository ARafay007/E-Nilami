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

// const initialState = {
//   image: []
// };

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

// const reducer = (state, action) => {
//   const {type, payload, fieldName} = action;

//   switch(type){
//     case 'ADD_IMAGE':
//       const imgs = [];
//       for(let key in payload){
//         if(!isNaN(key)) imgs.push(payload[key]);
//       }
//       return {...state, [fieldName]: [...state[fieldName], ...imgs]};
//     default: return state;
//   }
// };

const PostAds = () => {
  // const [adDetail, dispatch] = useReducer(reducer, initialState);
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

  const onChangeValue = (event, fieldName) => {
    setImages((preValue) => [...preValue, ...event.target.files]);
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
        console.log(data);
        
        
        await axios.put(data.url, images[0], {
          headers: {
            'Content-Type': images[0].type
          }
        });
      }
      
      // const promises = adDetail.image.map(async el => {
      //   const formData = new FormData();
      //   formData.append('file', el);
      //   formData.append("upload_preset", "yyedzrrl");

      //   const cloudi = await fetch(`https://api.cloudinary.com/v1_1/dwx3wmzsm/image/upload`, {
      //     method: 'POST',
      //     body: formData
      //   });

      //   return await cloudi.json();
      // });

      // const allImagePromises = await Promise.all(promises);

      // const {item_name, price, condition, activity, category, location, image} = adDetail;

      // const formData = new FormData();
      // formData.append('user_id', user.data._id);
      // formData.append('item_name', item_name);
      // formData.append('price', price);
      // formData.append('condition', condition)
      // formData.append('activity', activity);
      // formData.append('category', category);
      // formData.append('date', new Date().getTime());
      
      // for(let i=0; i<image.length; i++){
      //   formData.append('images', image[i]);
      // }

      // const imagesPublicId = allImagePromises.map(el => el.public_id);
      // console.log(imagesPublicId);

      // const data = {
      //   user_id: user.data._id,
      //   item_name,
      //   price,
      //   condition,
      //   activity,
      //   category,
      //   location,
      //   date: new Date().getTime(),
      //   images: imagesPublicId,
      // };

      // const resp = await fetch('http://localhost:3005/api/v1/user/userActivity', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     authorization: `Bearer ${user.token}`,
      //   },
      //   body: JSON.stringify(data)
      // });

      // console.log(resp)
      // if(resp.status === 200) navigate('/');

      // const data = await resp.json();
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
                    onChange={e => onChangeValue(e, 'image')}
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