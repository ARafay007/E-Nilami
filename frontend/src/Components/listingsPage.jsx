import { Fragment, useState, useEffect, useContext } from "react";
import { UserContext } from "../ContextAPI/userContext";
import { useLocation } from "react-router-dom";
import { Grid, Box, Divider } from "@mui/material";

const Listings = () => {
  const location = useLocation();
  const {ads} = useContext(UserContext);
  const {listingDetail} = location.state;
  const [list, setList] = useState([]);

  useEffect(() => {getData()}, [listingDetail]);

  const getData = async () => {
    if(listingDetail._id){
      const resp = await fetch(`http://localhost:3005/api/v1/user/userAdsList/${listingDetail?._id}`);

      if(resp.status >= 400 && resp.status <= 599) return;

      const {data} = await resp.json();
      setList(data);
    }
    else setList(ads[listingDetail]);
  }

  const priceFormat = new Intl.NumberFormat('en-US');

  const renderList = () => {
    return list.length ? list.map(el => (
      <Fragment key={el.item_name}>
        <Grid item xs={12} lg={4}>
          <Box
            sx={{
              width: 150,
              height: 150,
              backgroundColor: 'primary.dark',
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <img src={el.image[0]} alt='some' style={{width: 'auto', height: '100%'}} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={8} sx={{textAlign: 'left'}}>
          <p>Title: {el.item_name}</p>
          <p><strong>Rs. {priceFormat.format(el.price)}</strong></p>
          {/* <p>Address</p> */}
          <Divider light={false} />
        </Grid>
      </Fragment>
    )) : '';
  }

  return (
    <Grid container spacing={2}>
      {renderList()}
    </Grid>
  );
};

export default Listings;