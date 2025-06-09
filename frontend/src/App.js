import { useContext } from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import {Container, Grid} from '@mui/material';
import { styled, Paper } from '@mui/material';
import { UserContext } from './ContextAPI/userContext';
import { Header, LoggedInUserHeader } from './Components';
import { SignUp, SignIn, Listings, Detail, Main, PostAds } from './pages';
import Chat from './Components/chat';
import './styles/style.css';

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const sections = [
  { title: 'Mobile', url: '#' },
  { title: 'Furniture', url: '#' },
  { title: 'Car', url: '#' },
  { title: 'Motorcycles', url: '#' },
  { title: 'Houses', url: '#' },
  { title: 'TV', url: '#' },
  { title: 'Tablets', url: '#' },
  { title: 'Land & Plots', url: '#' },
  { title: 'Animals', url: '#' },
  { title: 'Books', url: '#' },
];

const UnAuthorizedAccess = () => {
  return <h2>You are not logged in. <Link to='/signIn'>Click here to login</Link></h2>
}

function App() {
  const {user} = useContext(UserContext);

  return (
    <Container fixed>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
            <Item> <Header sections={sections} /> </Item>
        </Grid>
        <Grid item xs={12} lg={12}>
          <LoggedInUserHeader />
        </Grid>
        <Grid item xs={12} lg={12}>
          {/* <div style={{border: '1px solid black'}}></div> */}
          <Item>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/detail' element={<Detail />} />
                <Route path='/postAds' element={user?.data?._id ? <PostAds /> : <UnAuthorizedAccess />} />
                <Route path='/listings' element={<Listings />} />
                <Route path='/chat' element={user?.data?._id ? <Chat /> : <UnAuthorizedAccess />} />
                <Route path='/signIn' element={<SignIn/>} />
                <Route path='/signUp' element={<SignUp/>} />
                <Route path='*' element={<h1>404 Not Found!</h1>} />
            </Routes>
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
