import React from 'react'
import {Grid, TextField, Button, FormControl, Autocomplete, Box, Link} from '@mui/material';

const SearchSection = () => {
  const cities = [
    {label: 'Hyderabad', key: 1},
    {label: 'Multan', key: 2},
    {label: 'Faislabad', key: 3},
    {label: 'Peshawar', key: 4},
    {label: 'Lahore', key: 5},
    {label: 'Karachi', key: 6},
    {label: 'Islamabad', key: 7},
    {label: 'Rawalpindi', key: 8},
  ]

  const [location, setLocation] = React.useState('');

  const handleChange = (event, city) => {
    console.log(city);
    setLocation(city);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={2}>
      <Link href="/" underline="hover" sx={{marginBottom: '5px'}} >
        <h2 >E-NILAMI</h2>
        </Link>
      </Grid>
      <Grid item xs={12} lg={4}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            options={cities}
            autoHighlight
            getOptionLabel={(option) => option.label}
            onChange={handleChange}
            renderOption={(props, option) => (
              // <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
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
                  // autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} lg={4}>
        <FormControl sx={{ m: 1, minWidth: 160 }}>
          <TextField id="standard-basic" label="Search" variant="outlined" sx={{minWidth: 300}} />
        </FormControl>
      </Grid>
      <Grid item xs={12} lg={1}>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <Button variant="contained">Search</Button>
        </FormControl>
      </Grid>
      <Grid item xs={12} lg={1}>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <Link href="/signIn" underline="hover" sx={{marginBottom: '5px'}}>
            Login
          </Link>
          <Link href="/signUp" underline="hover" sx={{marginBottom: '5px'}} >
            sign up
          </Link>
        </FormControl>
      </Grid>
    </Grid>
  )
};

export default SearchSection