import {useState, useContext, useEffect} from 'react';
import { useLocation, Link } from "react-router-dom";
import { Grid, Box, TextField, Button, Modal, Typography } from "@mui/material";
import { UserContext } from '../ContextAPI/userContext';
// import {Cloudinary} from "@cloudinary/url-gen";
// import {AdvancedImage} from '@cloudinary/react';
// import {fill} from "@cloudinary/url-gen/actions/resize";

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

const style = {
  display: 'flex',
  flexDirection: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DetailPage = () => {
  const location = useLocation();
  const {user: {data: loggedinUser}, setLastPageURL} = useContext(UserContext);
  const [bid, setBid] = useState(0);
  const {adDetail} = location.state;
  const bidContainerStyle = {
    border: '1px solid lightBlue',
    borderRadius: '5px',
    margin: '2px 0',
    paddingBottom: '10px',
  };
  // const cId = new Cloudinary({
  //   cloud: {
  //     cloudName: 'dwx3wmzsm'
  //   }
  // });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // useEffect(() => {
  //   console.log(socket.connected);
  // }, []);

  const otherImages = () => {
    const imgs = [];
    for(let i=1; i<adDetail?.images?.length; i++){
      imgs.push(
        <Grid item xs={2} key={i} sx={{p: 0, mr: '6px'}}>
          {/* <Box
            sx={{
              width: '50',
              '&:hover': {
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          > */}
            <img src={adDetail.images[i]} alt='some image6' style={{width: '100%'}} />
          {/* </Box> */}
        </Grid>
      );
    }

    return imgs;
  };

  const placeBid = async () => {
    if(bid){
      const resp = await fetch(`http://localhost:3005/api/v1/user/placeBid/${adDetail._id}`, {
        method: 'PATCH',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_Id: loggedinUser._id,
          name: loggedinUser.name,
          bid
        })
      });
      const data = await resp.json();
      console.log(data);
    }
  }

  const renderBids = () => {
    const bidsList = () => {
      const bidsInDescendingOrder = adDetail.highest_bidder.sort((a, b) => b.bid - a.bid);

      return bidsInDescendingOrder.map(({_id, name, bid, user_Id}) => (
        <Grid container spacing={1} style={bidContainerStyle} key={_id}>
          <Grid item lg={3}>{name}</Grid>
          <Grid item lg={5}>
            Bid: <strong>Rs.{bid}</strong>
          </Grid>
          <Grid item lg={4}>
            <Link to='/chat' state={{userId: user_Id}} className='chat-btn'>Chat With Bidder</Link>
          </Grid>
        </Grid>
      ))
    };

    if(loggedinUser && adDetail.user_id._id === loggedinUser._id){
      return (<>{bidsList()}</>);
    }
    else if(loggedinUser && adDetail.user_id._id !== loggedinUser._id){
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
      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{textAlign:'left'}}>
            <Typography variant='h5'>Details</Typography>
            <Typography variant='body2'><strong>Item Name</strong>: {adDetail.item_name}</Typography>
            <Typography variant='body2'><strong>Category</strong>: {adDetail.category}</Typography>
            <Typography variant='body2'><strong>Condition</strong>: {adDetail.condition}</Typography>
            <Typography variant='body2'><strong>Price</strong>: Rs.{adDetail.price}</Typography>
          </Grid>

          <Grid item xs={12} sx={{textAlign:'left'}}>
            <Typography variant='h5'>Seller Information</Typography>
            <Typography variant='body2'><strong>Name:</strong> {adDetail.user_id.name}</Typography>
            <Typography variant='body2'><strong>Contact:</strong> {adDetail.user_id.contact}</Typography>
            <Typography variant='body2'><strong>Email:</strong> {adDetail.user_id.email}</Typography>
            <Typography variant='body2'><strong>Location:</strong> {adDetail.location}</Typography>
            {
              loggedinUser?._id !== adDetail?.user_id?._id && 
              <Typography variant='body1' sx={{ mt: 2 }}>
                <Link to='/chat' onClick={() => setLastPageURL('/chat')} state={{sellerDetail: adDetail.user_id}} className='chat-btn'>
                  Chat With Seller
                </Link>
              </Typography>
            }
            {adDetail.activity === 'BID' && renderBids()}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                width: '100%',
                height: {xs: 'auto'},
                '&:hover': {
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              onClick={handleOpen}
            >
              <img src={adDetail.images[0]} alt={adDetail.item_name} style={{width: '100%'}} />
            </Box>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Grid container spacing={1}>
              {otherImages()}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        {/* <AdvancedImage cldImg={mainImage} /> */}
          <img src={adDetail.images[0]} alt='some' style={{width: 'auto', height: '100%'}} />
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </Grid>
  );
}

export default DetailPage;