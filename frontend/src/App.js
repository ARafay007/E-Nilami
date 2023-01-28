import {Routes, Route} from 'react-router-dom';
import {Container, Grid} from '@mui/material';
import { styled, Paper } from '@mui/material';
import SearchSection from './Components/SearchSection';
import MainPage from './Components/MainPage';
import DetailPage from './Components/detailPage';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    // <Box sx={{ width: 1 }}>
    //   <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
    //     <Box gridColumn="span 12">
    //     <SearchSection/>
    //     </Box>
    //     <Box gridColumn="span 12">
    //     </Box>
    //   </Box>
    // </Box>
    <Container fixed>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <Item> <SearchSection /> </Item>
        </Grid>
        <Grid item xs={12} lg={12}>
          {/* <div style={{border: '1px solid black'}}></div> */}
          <Item>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/detail' element={<DetailPage />} />
            </Routes>
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
