import { useEffect, useState, useReducer } from 'react';
import { Grid, TextField, Divider, Box, FormLabel, FormControlLabel, RadioGroup, Radio, FormControl, Button} from '@mui/material';
// import {DeleteForeverRoundedIcon} from '@mui/icons-material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const initialState = {
  item_name: '',
  price: '',
  condition: '',
  activity: '',
  image: []
};

const reducer = (state, action) => {
  const {type, payload, fieldName} = action;

  switch(type){
    case 'ON_FIELD_VALUE_INPUT':
      return {...state, [fieldName]: payload};
    case 'ADD_IMAGE':
      const imgs = [];
      for(let key in payload){
        if(!isNaN(key)) imgs.push(payload[key]);
      }
      return {...state, [fieldName]: [...state[fieldName], ...imgs]};
    default: return state;
  }
};

const Ads = () => {
  const [adDetail, dispatch] = useReducer(reducer, initialState);
  const [imgsPreview, setImgsPreview] = useState([]);

  useEffect(() => {
    if(!adDetail.image.length) return;

    setImgsPreview(adDetail.image.map(el => URL.createObjectURL(el)));

    return () => URL.revokeObjectURL(imgsPreview);
  }, [adDetail.image]);

  const onChangeValue = (event, fieldName) => {
    fieldName === 'image' && adDetail.image.length < 6 ? 
    dispatch({type: 'ADD_IMAGE', payload: event.target.files, fieldName}) :
    dispatch({type: 'ON_FIELD_VALUE_INPUT', payload: event.target.value, fieldName})
  };

  const deleteImg = (event) => {
    console.log(event.target.parentElement.dataset.imageNumber);
  }

  const otherImages = () => {
    const imgs = [];
    for(let i=1; i<5; i++){
      imgs.push(
        <Grid item xs={6} lg={2} key={i}>
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

  const submit = async () => {
    const formData = new FormData();
    const {item_name, price, condtion, activity} = adDetail;
    formData.append('itemName', item_name);
    formData.append('price', price);
    formData.append('condition', condtion)
    formData.append('activity', activity);
    // formData.append('images[]', [...adDetail.image]);
    formData.append('images', adDetail.image[0]);

    const resp = await fetch('http://localhost:3005/api/v1/user/userActivity', {
      method: 'POST',
      body: formData
    });

    console.log(resp);
    const data = await resp.json();
    console.log(data);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12} sx={{marginBottom: 5}}>
        <h2 style={{textAlign: 'left'}}>Post An Ad</h2>
        <Divider />
      </Grid>
      <Grid item xs={12} lg={12} sx={{marginBottom: 5}}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <TextField sx={{width: 200}} onChange={e => onChangeValue(e, 'item_name')} value={adDetail.item_name} id="standard-basic" label="Item Name" variant="standard" />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField sx={{width: 200}} onChange={e => onChangeValue(e, 'price')} value={adDetail.price} label="Price" variant="standard" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField sx={{width: 200}} onChange={e => onChangeValue(e, 'condition')} value={adDetail.condition} label="Condition" variant="standard" />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControl sx={{textAlign: 'left'}}>
                  <FormLabel id="demo-row-radio-buttons-group-label">Add Type</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel onChange={e => onChangeValue(e, 'activity')} value="SELL" control={<Radio />} label="Sell" />
                    <FormControlLabel onChange={e => onChangeValue(e, 'activity')} value="BID" control={<Radio />} label="Bid" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Button
                  color='success'
                  variant="contained"
                  component="label"
                >
                  Upload File
                  <input
                    type="file"
                    onChange={e => onChangeValue(e, 'image')}
                    hidden
                    accept="image/png, image/jpeg"
                    multiple
                  />
                </Button>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Button color='primary' variant='contained' onClick={submit}>Post Ad</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={12}>
                <div className='primary-img-container'>
                  <img src={imgsPreview[0] || './982990.jpg'} alt='some' className='image' />
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
    </Grid>
  );
};

export default Ads;