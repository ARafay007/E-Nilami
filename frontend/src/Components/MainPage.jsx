import { Link } from 'react-router-dom';
import {Grid, Card, CardActionArea, CardMedia, CardContent, Typography} from '@mui/material';
import Banner from './Banner'

const MainPage = () => {

  const banner = {
    title: 'E-Nilami Marketplace',
    description:
      " Pakistan's Only Auction and Classified Advertisment System.Best way to sell the things that you are not using and earn some cash.",
    image: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    imageText: 'graphic',
    linkText: 'Comming Soon',
  };

  const items = () => {
    const itemsArray = [];

    for(let i=0; i<5; i++){
      itemsArray.push(<Grid item xs={12} lg={4}>
        <Link to='/detail' style={{textDecoration: 'none'}}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="./982990.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </Grid>);
    }

    return itemsArray;
  }

  return(
    <Grid container spacing={1}>
    <Grid xs={12}>
      <Banner post={banner} />
     </Grid>
    <Grid container spacing={2}>
      {items()}
    </Grid>
    </Grid>
  );
}

export default MainPage;