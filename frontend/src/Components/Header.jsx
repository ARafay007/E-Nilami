import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {
  Button, 
  FormControl, 
  Box,
  Grid,
  Autocomplete,
  TextField,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {UserContext} from '../ContextAPI/userContext';
import { set } from 'react-hook-form';

const categories = ['Vehicle', 'Electronics', 'Lands', 'Auction'];

const cities = [
  { label: "Hyderabad", key: 1 },
  { label: "Multan", key: 2 },
  { label: "Faislabad", key: 3 },
  { label: "Peshawar", key: 4 },
  { label: "Lahore", key: 5 },
  { label: "Karachi", key: 6 },
  { label: "Islamabad", key: 7 },
  { label: "Rawalpindi", key: 8 },
];

function Header() {
  const [age, setAge] = React.useState('');
  const{user, defineUser, setLastPageURL, storeSellerDetail} = useContext(UserContext);
  const [location, setLocation] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const logoutUser = () => {
    sessionStorage.removeItem('chat');
    defineUser({});
    setLastPageURL('');
    storeSellerDetail({});
  };

  const handleLocationSelect = (_, city) => {
    setLocation(city.label);
  };

  const handleItemSearch = (state) => (event) => {
    state(event.target.value);
  };

  const handleToggleDrawer = () => {
    setToggleDrawer(!toggleDrawer);
  };

  return (
    <>
      <Box sx={{ display: {xs: 'none', md: 'block'} }}>
        <Box sx={{ 
            display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', marginBottom: "20px" 
          }}
        >
          <Grid item xs={12} md={2}>
            <Link to="/" underline="hover" style={{ marginBottom: "5px" }}>
              <h2>E-NILAMI</h2>
            </Link>
          </Grid>
          {/* {
            user?.data?.name || <Link to="/signIn" underline="hover"><Button variant="outlined" size="small">Sign In</Button> </Link>
          } */}
          <Grid item xs={12} md={3}>
            <FormControl sx={{ m: 1, minWidth: "100%" }}>
              <Autocomplete
                id="country-select-demo"
                options={cities}
                autoHighlight
                getOptionLabel={(option) => option.label}
                onChange={handleLocationSelect}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a city"
                    inputProps={{
                      ...params.inputProps,
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl sx={{ m: 1, minWidth: "100%" }}>
              <TextField
                id="standard-basic"
                label="Search item"
                onChange={handleItemSearch(setSearchItem)}
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={3} sx={{display: 'flex', justifyContent: 'space-evenly' }}>
            <Link to="/signIn" underline="hover"><Button variant="outlined" size="small">Sign In</Button></Link>
            <Link to="/signUp" underline="hover"><Button variant="outlined" size="small">Sign up</Button></Link>
          </Grid>
        </Box>
        <Box
          component="nav"
          variant="dense"
          sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}
        >
          {
            categories.map(el => (
              <Link
                color="inherit"
                key={el}
                state={{listingDetail: el}}
                to='/listings'
                style={{textDecoration: 'none', color: 'blue'}}
              >
                {el}
              </Link>
            ))
          }
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' }}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
          <Box>
            <Link to="/" underline="hover" style={{ marginBottom: "5px" }}>
              <h2>E-NILAMI</h2>
            </Link>
          </Box>
          <Box>
            <MenuIcon sx={{fontSize: 30}} onClick={handleToggleDrawer} />
          </Box>
        </Box>
        <Drawer
          anchor={'top'}
          open={toggleDrawer}
          onClose={handleToggleDrawer}
        >
          <Grid container sx={{ height: '300px' }}>
            <Grid xs={11} sx={{ background: 'lightblue' }}>
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <Autocomplete
                  id="country-select-demo"
                  options={cities}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  onChange={handleLocationSelect}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose a city"
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid size={12}>
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <TextField
                  id="standard-basic"
                  label="Search item"
                  onChange={handleItemSearch(setSearchItem)}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
          </Grid>
        </Drawer>
      </Box>
    </>
  );
}

// Header.propTypes = {
//   sections: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       url: PropTypes.string.isRequired,
//     }),
//   ).isRequired,
//   title: PropTypes.string.isRequired,
// };

export default Header;