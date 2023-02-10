import { Fragment } from "react";
import { Grid, Box, Divider } from "@mui/material";

const Listings = () => {
  const renderList = () => {
    const list = [];

    for(let i=0; i<10; i++){
      list.push(
        <Fragment key={i}>
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
              <img src='./982990.jpg' alt='some' style={{width: 'auto', height: '100%'}} />
            </Box>
          </Grid>
          <Grid item xs={12} lg={8} sx={{textAlign: 'left'}}>
            <p>Title</p>
            <p><strong>Rs.12000</strong></p>
            <p>Address</p>
            <Divider light={false} />
          </Grid>
        </Fragment>
      );
    }

    return list;
  }

  return (
    <Grid container spacing={2}>
      {renderList()}
    </Grid>
  );
};

export default Listings;