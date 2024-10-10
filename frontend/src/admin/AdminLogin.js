import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  InputAdornment,
  Snackbar,
  Alert,
  AppBar,
  Chip,

  IconButton,
  CircularProgress
} from '@mui/material';
import { Phone, Lock, ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/system';
import profileImage from '../assets/buddie.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header_sub from '../Header_sub';




const LocationChip = styled(Chip)({
  marginTop: '80px',
  fontFamily: 'Anta',
  fontSize: '25px',
  // fontWeight: 'bold',
  marginLeft: '0px',
  // color: '#000000',
  // color: '#ff7f00',
  // color: '#ff6800',
  // color: 'lightsalmon'
    backgroundColor:'white',

});

const LocationChip1 = styled(Chip)({
  marginTop: '15px',
  fontFamily: 'Anta',
  fontSize: '18px',
  // fontWeight: 'bold',
  // backgroundColor:'lightsalmon',
  marginLeft: '0px',
  // color: '#000000', 
  float:'right'
});


const AdminLogin = () => {
  const navigate = useNavigate();

  // Check if the authToken exists
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/admin/home'); // Redirect to admin home if authToken exists
    }
  }, [navigate]);


  const [hostelPhone, setHostelPhone] = useState('');
  const [hostelPassword, setHostelPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ open: false, message: '', severity: '' });
  const [loading1, setLoading1] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const validatePhoneNumber = (value) => {
    if (!value) {
      return 'Phone number is required';
    } else if (!/^\d{10}$/.test(value)) {
      return 'Phone number must be 10 digits';
    }
    return '';
  };

  const validatePassword = (value) => {
    if (!value) {
      return 'Password is required';
    } else if (value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setHostelPhone(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      phoneNumber: validatePhoneNumber(value),
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setHostelPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(value),
    }));
  };


  const handleLogin = async () => {
   
    const phoneNumberError = validatePhoneNumber(hostelPhone);
    const passwordError = validatePassword(hostelPassword);
  
    if (phoneNumberError || passwordError) {
      setErrors({
        phoneNumber: phoneNumberError,
        password: passwordError,
      });
      return;
    }
  
    setErrors({});
  
    try {
      setLoading1(true); 
      const loginResponse = await axios.post(`${process.env.REACT_APP_URL}/admin/login`, {
        hostel_phone: hostelPhone,
        hostel_password: hostelPassword,
      });
  
      console.log('Login Response:', loginResponse.data);
  
      if (loginResponse.status === 200 && loginResponse.data.token && loginResponse.data.hostel_id) {
        localStorage.setItem('authToken', loginResponse.data.token);
        localStorage.setItem('hostel_id', loginResponse.data.hostel_id);
  
        setToast({ open: true, message: 'Login successful', severity: 'success' });
  
        navigate('/admin/home');
      } else {
        throw new Error('Invalid phone number or password');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setToast({ open: true, message: error.message || 'An error occurred', severity: 'error' });
    }
    setLoading1(false); 
  };
      



  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <div>


{/* <AppBar position="static">
    <HeaderContainer>
      <Box display="flex" alignItems="center">
        <IconButton edge="start" color="inherit" aria-label="back" onClick={() => navigate('/login')}>
          <ArrowBack style={{ color: '#fff' }} />
        </IconButton>
        <StayText variant="h4" component="h1">
          Stay
        </StayText>
        <BuddieText variant="h4" component="h1">
          Buddie
        </BuddieText>
      </Box>
   
    </HeaderContainer>
  </AppBar> */}
  <Header_sub/>

      <Container maxWidth="xs" style={{marginTop:'50px'}} >
        {/* <Paper elevation={3} sx={{ padding: 4, mt: 15 }}> */}
          {/* <Typography variant="h4" align="left" gutterBottom>
            Login as Admin
          </Typography> */}

<Box display="flex" alignItems="center" justifyContent="space-between">
                            <LocationChip label={'Login as Owner'} />
                        </Box>
                        {/* <Typography style={{marginLeft:'12px',color:'gray'}}>Manage your space with ease...</Typography> */}



          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Phone Number"
              value={hostelPhone}
              onChange={handlePhoneNumberChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={hostelPassword}
              onChange={handlePasswordChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
       <Button
  fullWidth
  variant="contained"
  onClick={handleLogin}
  sx={{
    mt: 3,
    backgroundColor: 'lightsalmon',
    '&:hover': {
      backgroundColor: 'salmon', // Darken the color on hover
    },
  }}
>

                    {loading1 ? (
          <CircularProgress size={24} style={{ color: 'purple' }} /> // Show spinner while loading
        ) : (
          'Login'
        )}
            </Button>
          </Box>
          {/* <Box display="flex" alignItems="center" justifyContent="space-between"> */}
                          <Link to={'/buddie-login'}>
                            <LocationChip1   label={'Login as Buddie.. ?'} />
                            </Link>
                        {/* </Box> */}
        {/* </Paper> */}
      </Container>

      <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleToastClose}>
        <Alert onClose={handleToastClose} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminLogin;


