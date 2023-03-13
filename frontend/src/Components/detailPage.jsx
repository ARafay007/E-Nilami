import {useState, useContext, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import { Grid, Box, TextField, Button } from "@mui/material";
import { UserContext } from '../ContextAPI/userContext';

const AuctionEndCounter = ({end_date}) => {
  const [counter, setCounter] = useState('');
  useEffect(() => {
    const endDate = new Date(end_date).getTime();
    
    let time = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeLeft = endDate - currentTime;
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      setCounter(`${days}:${hours}:${minutes}:${seconds}`);
    }, 1000);
    return () => {clearInterval(time)};
  }, []);

  return (
    <Grid item lg={12}>
      <h2>Auction ends in {counter || 'TT:MM:SS'}</h2>
    </Grid>
  );
};

const DetailPage = () => {
  const location = useLocation();
  const {user: {data: userInfo}} = useContext(UserContext);
  const [bid, setBid] = useState(0);
  const {adDetail} = location.state;
  const bidContainerStyle = {
    border: '1px solid lightBlue',
    borderRadius: '5px',
    margin: '2px 0',
    paddingBottom: '10px',
  };
console.log(adDetail);
  const otherImages = () => {
    const imgs = [];

    for(let i=1; i<adDetail.image.length; i++){
      imgs.push(
        <Grid item xs={6} lg={2} key={i}>
          <Box
            sx={{
              width: 50,
              height: 50,
              backgroundColor: 'primary.dark',
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <img src={adDetail.image[i]} alt='some image6' style={{width: 'auto', height: '100%'}} />
          </Box>
        </Grid>
      );
    }

    return imgs;
  };

  const placeBid = async () => {
    const resp = await fetch(`http://localhost:3005/api/v1/user/placeBid/${adDetail._id}`, {
          method: 'PATCH',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: userInfo._id,
            name: userInfo.name,
            bid
          })
        });
      
    const data = await resp.json();
    console.log(data);
  }

  const renderBids = () => {
    const bidsList = () => 
      adDetail.highest_bidder.map(({_id, name, bid}) => (
        <Grid container spacing={1} style={bidContainerStyle} key={_id}>
          <Grid item lg={3}>{name}</Grid>
          <Grid item lg={6}>
            Bid: <strong>Rs.{bid}</strong>
          </Grid>
        </Grid>
    ));

    if(userInfo && adDetail.user_id._id === userInfo._id){
      return (<>{bidsList()}</>);
    }
    else if(userInfo && adDetail.user_id._id !== userInfo._id){
      return (
        <>
          <Grid container spacing={1} style={bidContainerStyle}>
            <Grid item lg={3}>User Name</Grid>
            <Grid item lg={6}>
              <TextField sx={{width: 200}} type='number' value={bid} onChange={event => {setBid(event.target.value)}} label="Bid" variant="standard" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
            </Grid>
            <Grid item lg={3}>
              <Button color='primary' variant='contained' onClick={placeBid}>Place Bid</Button>
            </Grid>
          </Grid>
          {bidsList()}
        </>
      );
    }
    else{
      return (
        <>
          <Grid container spacing={1} style={bidContainerStyle}>
            <Grid item lg={12}><h3>Please login to place your bid.</h3></Grid>
          </Grid>
          {bidsList()}
        </>
      );
    }
  };

  return(
    <Grid container spacing={2}>
      {adDetail?.end_date && <AuctionEndCounter end_date={adDetail.end_date}/>}
      <Grid item xs={12} lg={6}>
        <h3>Details</h3>
        <Grid container spacing={2}>
          <Grid item lg={4}><strong>Item Name</strong>: {adDetail.item_name}</Grid>
          <Grid item lg={4}><strong>Price</strong>: Rs.{adDetail.price}</Grid>
          <Grid item lg={4}><strong>Condition</strong>: {adDetail.condition}</Grid>
          <Grid item lg={4}><strong>Type</strong>: {adDetail.category}</Grid>
          {/* <Grid item lg={12} sx={{textAlign:'left'}}>
            <h3>Description</h3>
            <p>
              This is first line.
              This is second line with some more words.
              This is third line on third line.
            </p>
          </Grid> */}
          <Grid item lg={12} sx={{textAlign:'left'}}>
            <h3>Seller Information</h3>
            <p><strong>Name:</strong> {adDetail.user_id.name}</p>
            <p><strong>Contact:</strong> {adDetail.user_id.contact}</p>
            <p><strong>Email:</strong> {adDetail.user_id.email}</p>
            <p><strong>Location:</strong> {adDetail.user_id.location}</p>
            {adDetail.activity === 'BID' && renderBids()}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <Box
              sx={{
                width: 300,
                height: 300,
                backgroundColor: 'primary.dark',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              <img src={adDetail.image[0]} alt='some' style={{width: 'auto', height: '100%'}} />
            </Box>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Grid container spacing={1}>
              {otherImages()}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DetailPage;