import React, { useEffect, useState } from 'react';
import {
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Box,
    Typography,
    Button,
    Container,
    Paper,
    AppBar,
    IconButton,
    Badge
} from "@mui/material";
import {
    AccountCircle,
    PrivacyTip,
    Gavel,
    HelpOutline,
    Payments,
    ReportProblem,
    Notifications,
    RestaurantMenu,
    ExitToApp,
    Money,
} from "@mui/icons-material";
import BottomNavBar from "./BottomNavBar";
import { ToastContainer } from "react-toastify";
import { styled } from '@mui/system';
import AdminSidebar from './AdminSidebar';
import { Link, useNavigate } from "react-router-dom";
import profileImage from '../assets/buddie.jpg';


const HeaderContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 4,
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
    color: 'orange',
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


const Settings = () => {

    const [drawerOpen, setDrawerOpen] = useState(false);
const navigate = useNavigate();

    const handleProfileIconClick = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };


    const handleLogout = () => {
        // Clear the auth token from localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('hostel_id');
      
        // Optionally, you can also clear the entire localStorage like this (not recommended if there are other keys you want to keep):
        // localStorage.clear();
      
        // Redirect to the login page
        navigate('/login'); // Assuming you are using react-router for navigation
      };



      // Retrieve hostel_id from local storage
const hostel_id = localStorage.getItem('hostel_id');

const [pendingCount, setPendingCount] = useState(0);
const [loading, setLoading] = useState(true);

const fetchPendingRequestsCount = async (hostelId) => {
    if (!hostelId) {
        console.error('No hostel_id found.');
        return;
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_URL}/admin/pendingRequestsCount/${hostelId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        setPendingCount(data.count);
        console.log('Pending requests count:', data.count);
    } catch (error) {
        console.error('Error fetching pending requests count:', error);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    fetchPendingRequestsCount(hostel_id);
}, [hostel_id]);




const [pendingPaymentsCount, setPendingPaymentsCount] = useState(0);

  // Function to fetch pending payments count
  const fetchPendingPaymentsCount = async (hostelId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/admin/payments/hostel/${hostelId}/pendingCount`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      setPendingPaymentsCount(data.count);
    } catch (error) {
      console.error('Error fetching pending payments count:', error);
    }
  };

  useEffect(() => {
    if (hostel_id) {
      fetchPendingPaymentsCount(hostel_id);
    }
  }, [hostel_id]);

      

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
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
          <ProfileIcon onClick={handleProfileIconClick}>
            <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} />
          </ProfileIcon>
        </HeaderContainer>
      </AppBar>

            <Typography variant="h5" align="center" gutterBottom mt={10}>
                Settings
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6} component={Link} to="/admin/profile">
                    <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
                        <AccountCircle fontSize="large" />
                        <Typography variant="subtitle1">Profile</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} component={Link} to="/admin/hostel-fees">
                    <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
                        <Payments fontSize="large" />
                        <Typography variant="subtitle1">Hostel Fees</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} component={Link} to="/admin/complaints">
                    <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
                        <ReportProblem fontSize="large" />
                        <Typography variant="subtitle1">Complaints</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} component={Link} to="/admin/payments" >
                    <Paper elevation={3} sx={{ p: 2, textAlign: "center" }} >
                        <Money fontSize="large" />

                        <Typography variant="subtitle1">Payments <Badge badgeContent={pendingPaymentsCount} color="error"></Badge></Typography>
                        
                    </Paper>
                </Grid>
            </Grid>

            <Box sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
                <List sx={{ py: 0 }}>
                <ListItem button sx={{ py: 2 }} component={Link} to="/admin/food-menu">
                        <ListItemIcon>
                            <RestaurantMenu />
                        </ListItemIcon>
                        <ListItemText primary="Food Menu" />
                    </ListItem>
                    <Divider />
                    <ListItem button sx={{ py: 2 }} component={Link} to="/admin/pendingRequests">
                        <ListItemIcon >
                        <Badge badgeContent={pendingCount} color="error">
                    <Notifications />
                </Badge>
                        </ListItemIcon>
                        <ListItemText primary="Pending Requests" />
                    </ListItem>
                    <Divider />
                    <ListItem button sx={{ py: 2 }}>
                        <ListItemIcon>
                            <Gavel />
                        </ListItemIcon>
                        <ListItemText primary="Terms and Conditions" />
                    </ListItem>
                    <Divider />
                    <ListItem button sx={{ py: 2 }}>
                        <ListItemIcon>
                            <HelpOutline />
                        </ListItemIcon>
                        <ListItemText primary="FAQs" />
                    </ListItem>
                    <Divider />
                    <ListItem button sx={{ py: 2 }}>
                        <ListItemIcon>
                            <PrivacyTip />
                        </ListItemIcon>
                        <ListItemText primary="Privacy Policy" />
                    </ListItem>
                </List>
            </Box>

            <Box sx={{ p: 2, mt: 3, display: "flex", justifyContent: "center", mb: 0, position: 'static' }}>
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<ExitToApp />}
                    fullWidth
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Box>
            <BottomNavBar />
            <ToastContainer />
        </Container>
    );
};

export default Settings;



