import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Chip,
  TablePagination,
  Skeleton,
  AppBar,
  Box,
  IconButton,
} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowBack } from '@mui/icons-material';
import { styled } from '@mui/system';
import profileImage from '../assets/buddie.jpg';
import { useNavigate } from 'react-router-dom';


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




const ComplaintList = () => {

  const navigate = useNavigate(); // Initialize navigate function

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };



  const [pendingComplaints, setPendingComplaints] = useState([]);
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const [loadingPending, setLoadingPending] = useState(true);
  const [loadingResolved, setLoadingResolved] = useState(true);
  const [pagePending, setPagePending] = useState(0);
  const [pageResolved, setPageResolved] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const token = localStorage.getItem('authToken');
  const hostel_id = localStorage.getItem('hostel_id'); // Fetch hostel ID from localStorage

  // Function to get Buddie Name
  const fetchBuddieName = async (buddie_id) => {
    try {
      const response = await axios.get(`http://192.168.1.17:5000/admin/buddie/${buddie_id}`);
      return response.data.name;
    } catch (error) {
      console.error('Error fetching buddie name:', error);
      return 'Unknown';
    }
  };

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/admin/complaints/${hostel_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Fetch buddie names in parallel for pending complaints
      const pendingComplaintsWithNames = await Promise.all(
        response.data
          .filter(complaint => complaint.status === 'pending')
          .map(async (complaint) => {
            const buddie_name = await fetchBuddieName(complaint.buddie_id._id);
            return { ...complaint, buddie_name };
          })
      );

      // Fetch buddie names for resolved complaints
      const resolvedComplaintsWithNames = await Promise.all(
        response.data
          .filter(complaint => complaint.status === 'resolved')
          .map(async (complaint) => {
            const buddie_name = await fetchBuddieName(complaint.buddie_id._id);
            return { ...complaint, buddie_name };
          })
      );

      setPendingComplaints(pendingComplaintsWithNames);
      setResolvedComplaints(resolvedComplaintsWithNames);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      toast.error('Error fetching complaints');
    } finally {
      setLoadingPending(false);
      setLoadingResolved(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []); // Only run once

  // Resolve complaint handler
  const handleResolve = async (complaintId) => {
    try {
      await axios.patch(`${process.env.REACT_APP_URL}/admin/complaints/${complaintId}/resolve`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Complaint marked as resolved');

      // Update the state without refetching all data
      setPendingComplaints((prev) =>
        prev.filter(complaint => complaint._id !== complaintId)
      );
      const resolvedComplaint = pendingComplaints.find(complaint => complaint._id === complaintId);
      setResolvedComplaints((prev) => [...prev, { ...resolvedComplaint, status: 'resolved' }]);
    } catch (error) {
      console.error('Error resolving complaint:', error);
      toast.error('Error resolving complaint');
    }
  };

  // Pagination Handlers
  const handleChangePagePending = (event, newPage) => setPagePending(newPage);
  const handleChangePageResolved = (event, newPage) => setPageResolved(newPage);
  const handleChangeRowsPerPage = (event) => setRowsPerPage(+event.target.value);

  // Skeleton rendering
  const renderSkeleton = () => (
    [...Array(5)].map((_, index) => (
      <TableRow key={index}>
        {[...Array(6)].map((_, idx) => (
          <TableCell key={idx}>
            <Skeleton variant="rectangular" height={30} />
          </TableCell>
        ))}
      </TableRow>
    ))
  );

  return (
    <div>

<AppBar position="static">
                <HeaderContainer>
                    <Box display="flex" alignItems="center">
                        <IconButton edge="start" color="inherit" aria-label="back" style={{ color: 'black' }} onClick={handleBackClick}>
                            <ArrowBack  />
                        </IconButton>
                        <StayText variant="h4" component="h1" style={{ marginLeft: '25px',color:'#006399' }}>
                            Stay
                        </StayText>
                        <BuddieText variant="h4" component="h1">
                            Buddie
                        </BuddieText>
                    </Box>

                    <Box >
            <ProfileIcon>
              <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} />
            </ProfileIcon>
          </Box>
                </HeaderContainer>
            </AppBar>


      <Typography variant="h5" gutterBottom mt={15}>
        Pending Complaints
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Buddie Name</TableCell>
              <TableCell>Room No</TableCell>
              <TableCell>Complaint Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingPending ? (
              renderSkeleton()
            ) : (
              pendingComplaints
                .slice(pagePending * rowsPerPage, pagePending * rowsPerPage + rowsPerPage)
                .map((complaint) => (
                  <TableRow key={complaint._id}>
                    <TableCell>{complaint.buddie_name}</TableCell>
                    <TableCell>{complaint.buddie_id.room_no}</TableCell>
                    <TableCell>{complaint.complaint_name}</TableCell>
                    <TableCell>{complaint.description}</TableCell>
                    <TableCell>
                      <Chip label={complaint.status} color="warning" />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleResolve(complaint._id)}
                      >
                        Mark as Resolved
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pendingComplaints.length}
          rowsPerPage={rowsPerPage}
          page={pagePending}
          onPageChange={handleChangePagePending}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Typography variant="h5" gutterBottom style={{ marginTop: '2rem' }}>
        Resolved Complaints
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Buddie Name</TableCell>
              <TableCell>Room No</TableCell>
              <TableCell>Complaint Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingResolved ? (
              renderSkeleton()
            ) : (
              resolvedComplaints
                .slice(pageResolved * rowsPerPage, pageResolved * rowsPerPage + rowsPerPage)
                .map((complaint) => (
                  <TableRow key={complaint._id}>
                    <TableCell>{complaint.buddie_name}</TableCell>
                    <TableCell>{complaint.buddie_id.room_no}</TableCell>
                    <TableCell>{complaint.complaint_name}</TableCell>
                    <TableCell>{complaint.description}</TableCell>
                    <TableCell>
                      <Chip label={complaint.status} color="success" />
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={resolvedComplaints.length}
          rowsPerPage={rowsPerPage}
          page={pageResolved}
          onPageChange={handleChangePageResolved}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <ToastContainer />
    </div>
  );
};

export default ComplaintList;
