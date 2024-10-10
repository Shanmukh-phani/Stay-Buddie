import React from 'react';
import { Box, Typography } from '@mui/material';
import Lottie from 'react-lottie';
import animationData from './assets/Animation1.json'; // Your Lottie JSON file

const LoadingScreen = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#fff"
    >
      <Lottie options={defaultOptions} height={200} width={200} />
      {/* <Typography variant="h6" sx={{ mt: 2 }} color="orange">
        please wait...
      </Typography> */}
    </Box>
  );
};

export default LoadingScreen;
