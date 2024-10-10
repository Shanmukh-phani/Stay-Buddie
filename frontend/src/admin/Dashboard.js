import React, { useEffect, useState } from 'react';
import { AppBar, Box, Typography, Chip, IconButton, Grid } from '@mui/material';
import { Home, Chair, People } from '@mui/icons-material';
import profileImage from '../assets/buddie.jpg';
import { styled } from '@mui/system';
import BottomNavBar from './BottomNavBar';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';

import { Bar, Pie } from 'react-chartjs-2';
import LoadingScreen from '../LoadingScreen';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Styled Components
const HeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '14px 16px',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  zIndex: 1000,
});

const StayText = styled(Typography)({
  fontFamily: '"Sofia", sans-serif',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#006399',
});

const BuddieText = styled(Typography)({
  fontFamily: '"Sofia", sans-serif',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
});

const ProfileIcon = styled(IconButton)({
  borderRadius: '50%',
  backgroundColor: '#ddd',
  width: '40px',
  height: '40px',
});

// Dashboard Component
const Dashboard = () => {
  const [data, setData] = useState({ totalVacancies: 0, totalRooms: 0, totalBuddies: 0, sharingCounts: {} });
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sharingCounts, setSharingCounts] = useState([]);
  const [pieData, setPieData] = useState({});
  const [error, setError] = useState(null);
  const [aniloading, anisetLoading] = useState(true);





  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const hostel_id = localStorage.getItem('hostel_id');
        const response = await fetch(`${process.env.REACT_APP_URL}/admin/dashboard?hostel_id=${hostel_id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        const result = await response.json();
        setData(result); // Update state with the fetched data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      }
    };
    fetchDashboard();
  }, []);



  useEffect(() => {
    const fetchSharingCounts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/admin/sharing-count`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        // Ensure the data is an array
        if (Array.isArray(response.data)) {
          setSharingCounts(response.data);
        } else {
          console.error('Unexpected data format:', response.data);
          setError('Unexpected data format');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sharing counts:', error);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchSharingCounts();
  }, []);


  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Share Type',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count of Occupied Rooms',
        },
        beginAtZero: true,
      },
    },
  };






  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };



  // Prepare data for the Chart.js
  const chartData = {
    labels: sharingCounts.map(item => `${item._id} share`), // e.g., "1 share", "2 share"
    datasets: [
      {
        label: 'Count of Occupied Rooms',
        data: sharingCounts.map(item => item.totalOccupied),
        backgroundColor: sharingCounts.map(() => generateRandomColor()),
        borderColor: '#8884d8', // Border color for all bars
        borderWidth: 1,
      },
    ],
  };





  // // Pie Chart Data
  // const pieData = {
  //   labels: ['Occupancy', 'Vacancies'],
  //   datasets: [
  //     {
  //       data: [occVac.occupancy, occVac.vacancies],
  //       backgroundColor: ['#FF6384', '#36A2EB'],
  //       borderColor: '#fff',
  //       borderWidth: 1,
  //     },
  //   ],
  // };


  useEffect(() => {
    // Simulate a loading delay (e.g., data fetching)
    setTimeout(() => anisetLoading(false), 1000);
  }, []);


  return (

    <>
      {aniloading ? (
        <LoadingScreen />
      ) : (

    <div>


      <AppBar position="static">
        <HeaderContainer>
          <Box display="flex" alignItems="center">
            <StayText variant="h4" component="h1">
              Stay
            </StayText>
            <BuddieText variant="h4" component="h1">
              Buddie
            </BuddieText>
          </Box>
          {/* <ProfileIcon onClick={handleProfileIconClick}>
            <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} />
          </ProfileIcon> */}
        </HeaderContainer>
      </AppBar>

      <Box padding={4} mt={10}>
        <Typography variant="h4" gutterBottom>
          Hostel Dashboard
        </Typography>

        {/* Key Metrics */}
        <Grid container spacing={2} mb={4}>
          <Grid item xs={6} sm={6} md={4}>
            <Typography variant="h6" style={{ textAlign: 'center' }}>Vacancies</Typography>
            <Chip
              icon={<Home />}
              label={`: ${data.totalVacancies}`}
              color="primary"
              variant="outlined"
              sx={{
                borderRadius: '20px',
                fontSize: '1rem',
                padding: '12px 24px',
                backgroundColor: '#e3f2fd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                mb: 1,
              }}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <Typography variant="h6" style={{ textAlign: 'center' }}>Rooms</Typography>
            <Chip
              icon={<Chair />}
              label={`: ${data.totalRooms}`}
              color="secondary"
              variant="outlined"
              sx={{
                borderRadius: '20px',
                fontSize: '1rem',
                padding: '12px 24px',
                backgroundColor: '#fce4ec',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                mb: 1,
              }}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <Typography variant="h6" style={{ textAlign: 'center' }}>Buddies</Typography>
            <Chip
              icon={<People />}
              label={`: ${data.totalBuddies}`}
              color="success"
              variant="outlined"
              sx={{
                borderRadius: '20px',
                fontSize: '1rem',
                padding: '12px 24px',
                backgroundColor: '#e8f5e9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                mb: 1,
              }}
            />
          </Grid>
        </Grid>


        <Grid >
          <Grid item xs={6} sm={6} md={4}>
            <Bar data={chartData} options={options} />
          </Grid>



        </Grid>



      </Box>
      <BottomNavBar />

    </div>
        )}
    </>
    
  );
};

export default Dashboard;
