import { Grid, Box } from "@mui/material";

const DetailPage = () => {
  return(
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <h3>Details</h3>
        <Grid container spacing={2}>
          <Grid item lg={6}>Price: Rs.80,000</Grid>
          <Grid item lg={6}>Condition: New</Grid>
          <Grid item lg={12}>
            <h3>Description</h3>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6}>
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
          <img src='./982990.jpg' alt='some image' style={{width: 'auto', height: '100%'}} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default DetailPage;