import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  Autocomplete,
  Box,
  Toolbar,
} from "@mui/material";


const SearchSection = () => {

  const [location, setLocation] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const navigate = useNavigate();

  const handleChange = (_, city) => {
    setLocation(city.label);
  };

  const handleItemSearch = (state) => (event) => {
    state(event.target.value);
  };

  const handleSearch = async () => {
    const resp = await fetch(`http://localhost:3005/api/v1/user/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location, item: searchItem }),
    });
    console.log(resp);
    const { data } = await resp.json();

    if (data.length) navigate("/listings", { state: { listingDetail: data } });
  };

  return (
    <>
      {/* {
        user?.data?.name ? 
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Options</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Option"
              value={age}
              // onChange={handleChange}
            >
              <Link to='/' style={linkStyle}><MenuItem value={10}>Home</MenuItem></Link>
              <Link to='/postAds' style={linkStyle}><MenuItem value={10}>Post Ad</MenuItem></Link>
              <Link to='/listings' state={{listingDetail: user.data}} style={linkStyle}><MenuItem value={10}>My Ads</MenuItem></Link>
              <Link to='/chat' state={{listingDetail: user.data}} style={linkStyle}><MenuItem value={10}>Chat</MenuItem></Link>
              <MenuItem value={10} onClick={logoutUser}>Logout</MenuItem>
            </Select>
          </FormControl>
        </Box> : 
        <Link to="/signUp" underline="hover"><Button variant="outlined" size="small">Sign up</Button></Link>
      } */}
    </>
  );
};

export default SearchSection;
