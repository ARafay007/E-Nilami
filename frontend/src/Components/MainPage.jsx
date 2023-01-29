import { Link } from 'react-router-dom';
import {Grid, Card, CardActionArea, CardMedia, CardContent, Typography} from '@mui/material';

const MainPage = () => {

  const items = () => {
    const itemsArray = [];

    for(let i=0; i<8; i++){
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
    <Grid container spacing={2}>
      {items()}
    </Grid>
  );
}

export default MainPage;