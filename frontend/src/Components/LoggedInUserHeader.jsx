import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FormControl,
  Grid,
  MenuItem,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import {UserContext} from '../ContextAPI/userContext';

const LoggedInUserHeader = () => {
  // const navigate = useNavigate();
  const{user, defineUser, setLastPageURL, storeSellerDetail} = useContext(UserContext);

  const logoutUser = () => {
    sessionStorage.removeItem('chat');
    defineUser({});
    setLastPageURL('');
    storeSellerDetail({});
  };

  return (
    <>
      {
        user?.data?.name &&
        <Grid container 
          sx={{ 
            p:2,
            boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
            borderRadius: '4px',
          }}
        >
          <Grid item xs={12} md={8} sx={{display: 'flex', alignItems: 'center', pb: { xs: 2, md: 0 }}}>
            <Typography variant='h5'>Welcome {user?.data?.name}!</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Options</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Option"
                // onChange={handleChange}
              >
                <Link to='/' style={{textDecoration: 'none', color: '#000000de'}}>
                  <MenuItem value={10}>Home</MenuItem>
                </Link>
                <Link to='/postAds' style={{textDecoration: 'none', color: '#000000de'}}>
                  <MenuItem value={10}>Post Ad</MenuItem>
                </Link>
                <Link to='/listings' style={{textDecoration: 'none', color: '#000000de'}} state={{listingDetail: user.data}}>
                  <MenuItem value={10}>My Ads</MenuItem>
                </Link>
                <Link to='/chat' style={{textDecoration: 'none', color: '#000000de'}} state={{listingDetail: user.data}}>
                  <MenuItem value={10}>Chat</MenuItem>
                </Link>
                <MenuItem value={10} onClick={logoutUser}>Logout</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      }
    </>
  );
};

export default LoggedInUserHeader;
