import { Grid, Box } from "@mui/material";

const DetailPage = () => {

  const otherImages = () => {
    const imgs = [];

    for(let i=0; i<6; i++){
      imgs.push(
        <Grid item xs={6} lg={2}>
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
            <img src='./982990.jpg' alt='some image6' style={{width: 'auto', height: '100%'}} />
          </Box>
        </Grid>
      );
    }

    return imgs;
  };

  return(
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <h3>Details</h3>
        <Grid container spacing={2}>
          <Grid item lg={4}><strong>Price</strong>: Rs.80,000</Grid>
          <Grid item lg={4}><strong>Type</strong>: Painting</Grid>
          <Grid item lg={4}><strong>Condition</strong>: New</Grid>
          <Grid item lg={12} sx={{textAlign:'left'}}>
            <h3>Description</h3>
            <p>
              This is first line.
              This is second line with some more words.
              This is third line on third line.
            </p>
          </Grid>
          <Grid item lg={12} sx={{textAlign:'left'}}>
            <h3>Seller Information</h3>
            <p><strong>Contact:</strong> 03348789876</p>
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
              <img src='./982990.jpg' alt='some' style={{width: 'auto', height: '100%'}} />
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