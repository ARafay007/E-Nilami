import React from 'react'
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import logo from '../logo192.png'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const SearchSection = () => {

    const [location, setLocation] = React.useState('');

    const handleChange = (event) => {
        setLocation(event.target.value);
    };

  return (
    <Grid container spacing={2}>
  <Grid item xs={3}>
  <img width={50} height={50} src={logo} alt="Logo" />
  </Grid>
  <Grid item xs={2}>
        {/* <InputLabel id="demo-simple-select-autowidth-label">Location</InputLabel> */}
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select"
          value={location}
          onChange={handleChange}
          autoWidth
          label="Location"
        >
          <MenuItem value="All Pakistan">
            <em>All Pakistan</em>
          </MenuItem>
          <MenuItem value={10}>Islamabad</MenuItem>
          <MenuItem value={21}>Karachi</MenuItem>
          <MenuItem value={22}>Lahore</MenuItem>
        </Select>
  </Grid>
  <Grid item xs={4}>
  <TextField id="standard-basic" label="Search" variant="standard" />
  </Grid>
  <Grid item xs={2}>
  <Button variant="contained">Search</Button>
  </Grid>
</Grid>
  )
}

export default SearchSection