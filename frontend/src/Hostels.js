// // import React, { useState, useEffect } from 'react';
// // import {
// //     AppBar,
// //     IconButton,
// //     Typography,
// //     Box,
// //     Card,
// //     Chip,
// //     CardContent,
// //     Dialog,
// //     DialogTitle,
// //     DialogContent,
// //     DialogActions,
// //     Button,
// //     Checkbox,
// //     FormControlLabel,
// //     Skeleton,
// //     TextField,
// //     InputAdornment
// // } from '@mui/material';
// // import axios from 'axios';
// // import { styled } from '@mui/system';
// // import {
// //     ArrowBack,
// //     FilterList as FilterListIcon,
// //     Wifi as WifiIcon,
// //     LocalDining as LocalDiningIcon,
// //     LocalParking as LocalParkingIcon,
// //     LocalLaundryService as LocalLaundryServiceIcon,
// //     BatteryChargingFull as BatteryChargingFullIcon,
// //     CleanHands as CleanHandsIcon
// // } from '@mui/icons-material';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import SearchIcon from '@mui/icons-material/Search';
// // import InfiniteScroll from 'react-infinite-scroll-component';

// // import profileImage from './assets/buddie.jpg';
// // import Header from './Header';

// // const HeaderContainer = styled(Box)({
// //     display: 'flex',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     mb: 4,
// //     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
// //     padding: '14px 16px',
// //     position: 'fixed',
// //     top: 0,
// //     left: 0,
// //     width: '100%',
// //     boxSizing: 'border-box',
// //     backgroundColor: '#fff',
// //     zIndex: 1000,
// // });

// // const StayText = styled(Typography)({
// //     fontFamily: '"Sofia", sans-serif',
// //     fontSize: '24px',
// //     fontWeight: 'bold',
// //     color: 'orange',
// // });

// // const BuddieText = styled(Typography)({
// //     fontFamily: '"Sofia", sans-serif',
// //     fontSize: '24px',
// //     fontWeight: 'bold',
// //     color: '#333',
// // });

// // const ProfileIcon = styled(IconButton)({
// //     borderRadius: '50%',
// //     backgroundColor: '#ddd',
// //     width: '40px',
// //     height: '40px',
// // });

// // const LocationChip = styled(Chip)({
// //     marginTop: '100px',
// //     fontFamily: 'Anta',
// //     fontSize: '18px',
// //     fontWeight: 'bold',
// //     color: '#ffffff',
// //     backgroundColor: '#006399',
// //     padding: '20px 22px',
// //     borderRadius: '100px',
// // });

// // const FilterButton = styled(IconButton)({
// //     marginRight: '16px',
// //     marginTop: '100px',
// //     color: '#006399',
// // });

// // const HostelCard = styled(Card)({
// //     marginBottom: '20px',
// //     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
// //     overflow: 'hidden',
// //     position: 'relative',
// // });

// // const FacilityChip = styled(Chip)({
// //     margin: '4px',
// //     display: 'flex',
// //     alignItems: 'center',
// // });

// // const HostelCardContent = styled(CardContent)({
// //     padding: '16px',
// // });

// // const SkeletonCard = styled(Card)({
// //     marginBottom: '20px',
// //     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
// //     overflow: 'hidden',
// //     position: 'relative',
// // });

// // const HostelsScreen = () => {
// //     const [page, setPage] = useState(1);
// //     const [hasMore, setHasMore] = useState(true);
// //     const [hostels, setHostels] = useState([]);
// //     const [selectedFilters, setSelectedFilters] = useState([]);
// //     const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
// //     const [loading, setLoading] = useState(true);
// //     const [search, setSearch] = useState('');

// //     const location = useLocation();
// //     const queryParams = new URLSearchParams(location.search);
// //     const cityName = queryParams.get('city');
// //     const navigate = useNavigate();

// //     const fetchHostels = async () => {
// //         setLoading(true);
// //         try {
// //             const response = await axios.get(`${process.env.REACT_APP_URL}/hostels`, {
// //                 params: { city: cityName }
// //             });

// //             // Log the response to check its structure
// //             console.log(response.data);

// //             const { hostels: newHostels = [], total = 0 } = response.data; // Default to empty array and 0 for total

// //             setHostels((prevHostels) => [...prevHostels, ...newHostels]);
// //             setHasMore(newHostels.length > 0 && hostels.length < total);
// //         } catch (error) {
// //             console.error('Error fetching hostels:', error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };


// //     useEffect(() => {
// //         fetchHostels();
// //     }, [page]);

// //     const handleLoadMore = () => {
// //         setPage((prevPage) => prevPage + 1);
// //     };

// //     const filters = [
// //         { value: 'wifi', label: 'Wi-Fi' },
// //         { value: 'dining', label: 'Dining' },
// //         { value: 'parking', label: 'Parking' },
// //         { value: 'laundry', label: 'Laundry' },
// //         { value: 'charging', label: 'Charging' },
// //         { value: 'cleaning', label: 'Cleaning' }
// //     ];

// //     const handleFilterClick = () => {
// //         setIsFilterDialogOpen(true);
// //     };

// //     const handleDialogClose = () => {
// //         setIsFilterDialogOpen(false);
// //     };

// //     const handleFilterChange = (event) => {
// //         const { value, checked } = event.target;
// //         setSelectedFilters((prevFilters) =>
// //             checked ? [...prevFilters, value] : prevFilters.filter((filter) => filter !== value)
// //         );
// //     };

// //     const handleFilterApply = () => {
// //         setIsFilterDialogOpen(false);
// //         // Apply filter logic here if needed
// //     };

// //     const handleBackClick = () => {
// //         navigate(-1);
// //     };

// //     const handleHostelClick = (hostelId) => {
// //         navigate(`/hostel/${hostelId}`);
// //     };

// //     // Filtered hostels based on search term
// //     const filteredHostels = hostels.filter(hostel => {
// //         const searchLower = search.toLowerCase();
// //         return (
// //             String(hostel.hostel_name).toLowerCase().includes(searchLower) ||
// //             String(hostel.hostel_type).toLowerCase().includes(searchLower)
// //         );
// //     });

// //     return (
// //         <div>
// //     <AppBar position="static">
// //         <HeaderContainer>
// //           <Box display="flex" alignItems="center">
// //             <IconButton edge="start" color="inherit" aria-label="back" style={{ color: 'black' }} onClick={handleBackClick}>
// //               <ArrowBack />
// //             </IconButton>
// //             <StayText variant="h4" component="h1" style={{ marginLeft: '25px', color: '#006399' }}>
// //               Stay
// //             </StayText>
// //             <BuddieText variant="h4" component="h1">
// //               Buddie
// //             </BuddieText>
// //           </Box>
// //           <Box>
// //             <ProfileIcon>
// //               <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} />
// //             </ProfileIcon>
// //           </Box>
// //         </HeaderContainer>
// //       </AppBar>
// //             <Box display="flex" alignItems="center" justifyContent="space-between">
// //                 <LocationChip label={cityName || 'Select City'} />
// //                 <FilterButton onClick={handleFilterClick}>
// //                     <FilterListIcon />
// //                 </FilterButton>
// //             </Box>

// //             <Box padding={2}>
// //                 <TextField
// //                     fullWidth
// //                     label="Search Hostels"
// //                     variant="outlined"
// //                     value={search}
// //                     onChange={(e) => setSearch(e.target.value)}
// //                     InputProps={{
// //                         endAdornment: (
// //                             <InputAdornment position="end">
// //                                 <SearchIcon />
// //                             </InputAdornment>
// //                         ),
// //                     }}
// //                 />
// //             </Box>

// //             <InfiniteScroll
// //                 dataLength={filteredHostels.length}
// //                 next={handleLoadMore}
// //                 hasMore={hasMore}
// //                 loader={<Skeleton variant="rectangular" height={200} />}
// //                 endMessage={<p style={{ textAlign: 'center' }}>No more hostels to display.</p>}
// //             >
// //                 <Box>
// //                     {loading ? (
// //                         [...Array(3)].map((_, index) => (
// //                             <SkeletonCard key={index}>
// //                                 <Skeleton variant="rectangular" height={200} />
// //                                 <Skeleton variant="text" />
// //                                 <Skeleton variant="text" />
// //                                 <Skeleton variant="text" />
// //                             </SkeletonCard>
// //                         ))
// //                     ) : (
// //                         filteredHostels.map((hostel) => (
// //                             <HostelCard key={hostel._id} onClick={() => handleHostelClick(hostel._id)}>
// //                                 <Box position="relative">
// //                                     <img
// //                                         src={`data:image/jpeg;base64,${hostel.hostel_image}`} // Assuming hostel_image is base64-encoded
// //                                         alt={hostel.hostel_name}
// //                                         style={{ width: '100%', height: '200px', objectFit: 'cover' }}
// //                                     />
// //                                     <Box
// //                                         position="absolute"
// //                                         top="10px"
// //                                         right="10px"
// //                                         bgcolor="#ffd700"
// //                                         color="#000"
// //                                         padding="8px 12px"
// //                                         fontWeight="bold"
// //                                         fontSize="14px"
// //                                         boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
// //                                     >
// //                                         {hostel.hostel_type}
// //                                     </Box>
// //                                 </Box>
// //                                 <HostelCardContent>
// //                                     <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
// //                                         {hostel.hostel_name}
// //                                     </Typography>
// //                                     <Typography variant="body2" color="textSecondary" style={{ marginBottom: '16px' }}>
// //                                         {hostel.hostel_area}, {hostel.hostel_city}
// //                                     </Typography>
// //                                     <Box display="flex" flexWrap="wrap" marginBottom="16px">
// //                                         {hostel.hostel_facilities.slice(0, 6).map((facility, index) => {
// //                                             const icons = {
// //                                                 wifi: <WifiIcon />,
// //                                                 dining: <LocalDiningIcon />,
// //                                                 parking: <LocalParkingIcon />,
// //                                                 laundry: <LocalLaundryServiceIcon />,
// //                                                 charging: <BatteryChargingFullIcon />,
// //                                                 cleaning: <CleanHandsIcon />
// //                                             };
// //                                             return (
// //                                                 <FacilityChip key={index} label={facility} icon={icons[facility]} />
// //                                             );
// //                                         })}
// //                                     </Box>
// //                                     <Typography variant="body2" color="textSecondary">
// //                                         Security Deposit: ₹{hostel.hostel_security_deposit}
// //                                     </Typography>
// //                                 </HostelCardContent>
// //                             </HostelCard>
// //                         ))
// //                     )}
// //                 </Box>
// //             </InfiniteScroll>

// //             <Dialog open={isFilterDialogOpen} onClose={handleDialogClose}>
// //                 <DialogTitle>Filter Hostels</DialogTitle>
// //                 <DialogContent>
// //                     {filters.map((filter) => (
// //                         <FormControlLabel
// //                             key={filter.value}
// //                             control={
// //                                 <Checkbox
// //                                     checked={selectedFilters.includes(filter.value)}
// //                                     onChange={handleFilterChange}
// //                                     value={filter.value}
// //                                 />
// //                             }
// //                             label={filter.label}
// //                         />
// //                     ))}
// //                 </DialogContent>
// //                 <DialogActions>
// //                     <Button onClick={handleDialogClose} color="primary">
// //                         Cancel
// //                     </Button>
// //                     <Button onClick={handleFilterApply} color="primary">
// //                         Apply
// //                     </Button>
// //                 </DialogActions>
// //             </Dialog>
// //         </div>
// //     );
// // };

// // export default HostelsScreen;



// import React, { useState, useEffect } from 'react';
// import {
//     AppBar,
//     IconButton,
//     Typography,
//     Box,
//     Card,
//     Chip,
//     CardContent,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Button,
//     Checkbox,
//     FormControlLabel,
//     Skeleton,
//     TextField,
//     InputAdornment,
//     Select,
//     MenuItem,
//     InputLabel,
//     FormControl

// } from '@mui/material';
// import axios from 'axios';
// import { styled } from '@mui/system';
// import {
//     ArrowBack,
//     FilterList as FilterListIcon,
//     Wifi as WifiIcon,
//     LocalDining as LocalDiningIcon,
//     LocalParking as LocalParkingIcon,
//     LocalLaundryService as LocalLaundryServiceIcon,
//     BatteryChargingFull as BatteryChargingFullIcon,
//     CleanHands as CleanHandsIcon
// } from '@mui/icons-material';
// import { useLocation, useNavigate } from 'react-router-dom';
// import SearchIcon from '@mui/icons-material/Search';

// import profileImage from './assets/buddie.jpg';
// import Header from './Header';

// const HeaderContainer = styled(Box)({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     mb: 4,
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     padding: '14px 16px',
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100%',
//     boxSizing: 'border-box',
//     backgroundColor: '#fff',
//     zIndex: 1000,
// });

// const StayText = styled(Typography)({
//     fontFamily: '"Sofia", sans-serif',
//     fontSize: '24px',
//     fontWeight: 'bold',
//     color: 'orange',
// });

// const BuddieText = styled(Typography)({
//     fontFamily: '"Sofia", sans-serif',
//     fontSize: '24px',
//     fontWeight: 'bold',
//     color: '#333',
// });

// const ProfileIcon = styled(IconButton)({
//     borderRadius: '50%',
//     backgroundColor: '#ddd',
//     width: '40px',
//     height: '40px',
// });

// const LocationChip = styled(Chip)({
//     marginTop: '100px',
//     fontFamily: 'Anta',
//     fontSize: '18px',
//     fontWeight: 'bold',
//     color: '#ffffff',
//     backgroundColor: '#006399',
//     padding: '20px 22px',
//     borderRadius: '100px',
// });

// const FilterButton = styled(IconButton)({
//     marginRight: '16px',
//     marginTop: '100px',
//     color: '#006399',
// });

// const HostelCard = styled(Card)({
//     marginBottom: '20px',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     overflow: 'hidden',
//     position: 'relative',
// });

// const FacilityChip = styled(Chip)({
//     margin: '4px',
//     display: 'flex',
//     alignItems: 'center',
// });

// const HostelCardContent = styled(CardContent)({
//     padding: '16px',
// });

// const SkeletonCard = styled(Card)({
//     marginBottom: '20px',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     overflow: 'hidden',
//     position: 'relative',
// });

// const HostelsScreen = () => {
//     const [hostels, setHostels] = useState([]);
//     const [selectedFilters, setSelectedFilters] = useState([]);
//     const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [search, setSearch] = useState('');

//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const cityName = queryParams.get('city');
//     const navigate = useNavigate();

//     const [areas, setAreas] = useState([]);


//     const fetchHostels = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_URL}/hostels`, {
//                 params: { city: cityName }
//             });
//             const { hostels: newHostels = [] } = response.data; // Default to empty array

//             setHostels(newHostels);
//         } catch (error) {
//             console.error('Error fetching hostels:', error);
//         } finally {
//             setLoading(false);
//         }
//     };
//     const fetchAreas = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_URL}/areas`);
//             setAreas(response.data.areas);
//         } catch (error) {
//             console.error('Error fetching areas:', error);
//         }
//     };


//     useEffect(() => {
//         fetchHostels();
//         fetchAreas();
//     }, [cityName]); // Fetch hostels when cityName changes

//     const handleFilterClick = () => {
//         setIsFilterDialogOpen(true);
//     };

//     const handleDialogClose = () => {
//         setIsFilterDialogOpen(false);
//     };

//     const handleFilterChange = (event) => {
//         const { value, checked } = event.target;
//         setSelectedFilters((prevFilters) =>
//             checked ? [...prevFilters, value] : prevFilters.filter((filter) => filter !== value)
//         );
//     };

//     // const handleFilterApply = () => {
//     //     setIsFilterDialogOpen(false);
//     //     // Apply filter logic here if needed
//     // };

//     const handleBackClick = () => {
//         navigate(-1);
//     };

//     const handleHostelClick = (hostelId) => {
//         navigate(`/hostel/${hostelId}`);
//     };

//     // Filtered hostels based on search term
//     const filteredHostels = hostels.filter(hostel => {
//         const searchLower = search.toLowerCase();
//         return (
//             String(hostel.hostel_name).toLowerCase().includes(searchLower) ||
//             String(hostel.hostel_type).toLowerCase().includes(searchLower)
//         );
//     });


//     const handleFilterApply = () => {
//         setIsFilterDialogOpen(false);
//         // Filter hostels based on selectedFilters
//         // You can apply logic here to filter hostels based on gender and area
//         const filteredHostels = hostels.filter(hostel => {
//             return (selectedFilters.gender ? hostel.gender === selectedFilters.gender : true) &&
//                    (selectedFilters.area ? hostel.hostel_area === selectedFilters.area : true);
//         });
//         setHostels(filteredHostels);
//     };

//     return (
//         <div>
//             <AppBar position="static">
//                 <HeaderContainer>
//                     <Box display="flex" alignItems="center">
//                         <IconButton edge="start" color="inherit" aria-label="back" style={{ color: 'black' }} onClick={handleBackClick}>
//                             <ArrowBack />
//                         </IconButton>
//                         <StayText variant="h4" component="h1" style={{ marginLeft: '25px', color: '#006399' }}>
//                             Stay
//                         </StayText>
//                         <BuddieText variant="h4" component="h1">
//                             Buddie
//                         </BuddieText>
//                     </Box>
//                     <Box>
//                         <ProfileIcon>
//                             <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} />
//                         </ProfileIcon>
//                     </Box>
//                 </HeaderContainer>
//             </AppBar>
//             <Box display="flex" alignItems="center" justifyContent="space-between">
//                 <LocationChip label={cityName || 'Select City'} />
//                 <FilterButton onClick={handleFilterClick}>
//                     <FilterListIcon />
//                 </FilterButton>
//             </Box>

//             <Box padding={2}>
//                 <TextField
//                     fullWidth
//                     label="Search Hostels"
//                     variant="outlined"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     InputProps={{
//                         endAdornment: (
//                             <InputAdornment position="end">
//                                 <SearchIcon />
//                             </InputAdornment>
//                         ),
//                     }}
//                 />
//             </Box>

//             <Box padding={2}>
//                 {loading ? (
//                     [...Array(3)].map((_, index) => (
//                         <SkeletonCard key={index}>
//                             <Skeleton variant="rectangular" height={200} />
//                             <Skeleton variant="text" />
//                             <Skeleton variant="text" />
//                             <Skeleton variant="text" />
//                         </SkeletonCard>
//                     ))
//                 ) : (
//                     filteredHostels.map((hostel) => (
//                         <HostelCard key={hostel._id} onClick={() => handleHostelClick(hostel._id)}>
//                             <Box position="relative">
//                                 <img
//                                     src={`data:image/jpeg;base64,${hostel.hostel_image}`} // Assuming hostel_image is base64-encoded
//                                     alt={hostel.hostel_name}
//                                     style={{ width: '100%', height: '200px', objectFit: 'cover' }}
//                                 />
//                                 <Box
//                                     position="absolute"
//                                     top="10px"
//                                     right="10px"
//                                     bgcolor="#ffd700"
//                                     color="#000"
//                                     padding="8px 12px"
//                                     fontWeight="bold"
//                                     fontSize="14px"
//                                     boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
//                                 >
//                                     {hostel.hostel_type}
//                                 </Box>
//                             </Box>
//                             <HostelCardContent>
//                                 <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
//                                     {hostel.hostel_name}
//                                 </Typography>
//                                 <Typography variant="body2" color="textSecondary" style={{ marginBottom: '16px' }}>
//                                     {hostel.hostel_area}, {hostel.hostel_city}
//                                 </Typography>
//                                 <Box display="flex" flexWrap="wrap" marginBottom="16px">
//                                     {hostel.hostel_facilities.slice(0, 6).map((facility, index) => {
//                                         const icons = {
//                                             wifi: <WifiIcon />,
//                                             dining: <LocalDiningIcon />,
//                                             parking: <LocalParkingIcon />,
//                                             laundry: <LocalLaundryServiceIcon />,
//                                             charging: <BatteryChargingFullIcon />,
//                                             cleanliness: <CleanHandsIcon />
//                                         };
//                                         return (
//                                             <FacilityChip key={index} icon={icons[facility]} label={facility} />
//                                         );
//                                     })}
//                                 </Box>
//                             </HostelCardContent>
//                         </HostelCard>
//                     ))
//                 )}
//             </Box>

//              <Dialog open={isFilterDialogOpen} onClose={handleDialogClose}>
//                 <DialogTitle>Filter Hostels</DialogTitle>
//                 <DialogContent>
//                     <FormControl fullWidth margin="normal">
//                         <InputLabel id="gender-select-label">Gender</InputLabel>
//                         <Select
//                             labelId="gender-select-label"
//                             value={selectedFilters.gender} // Make sure this starts as ''
//                             onChange={handleFilterChange}
//                             name="gender"
//                         >
//                             <MenuItem value=""><em>None</em></MenuItem>
//                             <MenuItem value="men">Men</MenuItem>
//                             <MenuItem value="women">Women</MenuItem>
//                             <MenuItem value="coliving">Coliving</MenuItem>
//                         </Select>
//                     </FormControl>
//                     <FormControl fullWidth margin="normal">
//                         <InputLabel id="area-select-label">Area</InputLabel>
//                         <Select
//                             labelId="area-select-label"
//                             value={selectedFilters.area} // Make sure this starts as ''
//                             onChange={handleFilterChange}
//                             name="area"
//                         >
//                             <MenuItem value=""><em>None</em></MenuItem>
//                             {areas.map((area) => (
//                                 <MenuItem key={area} value={area}>{area}</MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleDialogClose} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleFilterApply} color="primary">
//                         Apply
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//         </div>
//     );
// };

// export default HostelsScreen;



import React, { useState, useEffect } from 'react';
import {
    AppBar,
    IconButton,
    Typography,
    Box,
    Card,
    Chip,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Skeleton,
    TextField,
    InputAdornment,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Toolbar
} from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';
import { ArrowBack, FilterList as FilterListIcon, Wifi, LocalDining, LocalParking, LocalLaundryService, BatteryChargingFull, CleanHands } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LoadingScreen from './LoadingScreen';
import Header_sub from './Header_sub';

// import ImgHostel1 from './assets/hostel1.jpg';


// const HeaderContainer = styled(Box)({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     mb: 4,
//     // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     padding: '14px 16px',
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100%',
//     boxSizing: 'border-box',
//     backgroundColor: '#658d9a',
//     // backgroundColor: '#ff6f61',
//     //  backgroundColor: '#ffcc00',
//     //backgroundColor: '#273746',
//     zIndex: 1000,
// });

// const StayText = styled(Typography)({
//     fontFamily: '"Sofia", sans-serif',
//     fontSize: '24px',
//     fontWeight: 'bold',
//     // color: '#ffdb00',
//     // color: '#ffd1a9',
//     color: 'lavender',
//     //    color: '#ffffff',
//     //   color: '#a8e6cf',
// });

// const BuddieText = styled(Typography)({
//     fontFamily: '"Sofia", sans-serif',
//     fontSize: '24px',
//     fontWeight: 'bold',
//     //  color: '#FFFFFF', --
//     // color: '#ff7f00',
//     // color: '#ff6800',
//     // color: 'lightsalmon'
//     color: '#f0c674',
//     //    color: '#273746'
// });

// const ProfileIcon = styled(IconButton)({
//     borderRadius: '50%',
//     backgroundColor: '#ddd',
//     width: '40px',
//     height: '40px',
// });

const LocationChip = styled(Chip)({
    marginTop: '100px',
    fontFamily: 'Anta',
    fontSize: '18px',
    // fontWeight: 'bold',
    marginLeft: '14px',
    color: '#000000',
    // color: '#ff7f00',
    // color: '#ff6800',
    // color: 'lightsalmon'
});

const FilterButton = styled(IconButton)({
    marginRight: '16px',
    marginTop: '100px',
    color: '#006399',
});

const HostelCard = styled(Card)({
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    position: 'relative',
});

const FacilityChip = styled(Chip)({
    margin: '4px',
    display: 'flex',
    alignItems: 'center',
});

const HostelCardContent = styled(CardContent)({
    padding: '16px',
});

const SkeletonCard = styled(Card)({
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    position: 'relative',
});

const HostelsScreen = () => {
    const [hostels, setHostels] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({ gender: '', area: '' });
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [aniloading, anisetLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [areas, setAreas] = useState([]);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cityName = queryParams.get('city');
    const navigate = useNavigate();


    const fetchFilteredHostels = async (selectedFilters) => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/hostels`, {
                params: {
                    city: cityName,
                    gender: selectedFilters.gender,
                    area: selectedFilters.area
                }
            });
            setHostels(response.data.hostels || []);
        } catch (error) {
            console.error('Error fetching filtered hostels:', error);
        } finally {
            setLoading(false);
        }
    };




    const fetchHostels = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/hostels`, {
                params: { city: cityName }
            });
            setHostels(response.data.hostels || []);
        } catch (error) {
            console.error('Error fetching hostels:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAreas = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/areas`);
            setAreas(response.data.areas || []);
        } catch (error) {
            console.error('Error fetching areas:', error);
        }
    };

    useEffect(() => {
        fetchHostels();
        fetchAreas();
    }, [cityName]);

    const handleFilterClick = () => {
        setIsFilterDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsFilterDialogOpen(false);
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setSelectedFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleHostelClick = (hostelId) => {
        navigate(`/hostel/${hostelId}`);
    };

    const filteredHostels = hostels.filter(hostel => {
        const searchLower = search.toLowerCase();
        return (
            (selectedFilters.gender ? hostel.hostel_type === selectedFilters.gender : true) &&
            (selectedFilters.area ? hostel.hostel_area === selectedFilters.area : true) &&
            (String(hostel.hostel_name).toLowerCase().includes(searchLower) ||
                String(hostel.hostel_type).toLowerCase().includes(searchLower))
        );
    });

    const handleFilterApply = () => {
        // fetchFilteredHostels(selectedFilters); // Fetch hostels based on selected filters
        setIsFilterDialogOpen(false);
    };


    useEffect(() => {
        // Simulate a loading delay (e.g., data fetching)
        setTimeout(() => anisetLoading(false), 1000);
    }, []);

    return (

        <div>
            <>
                {aniloading ? (
                    <LoadingScreen />
                ) : (
                    <div>
                        {/* <AppBar position="static">
                            <HeaderContainer>
                                <Box display="flex" alignItems="center">
                                    <IconButton
                                        edge="start"
                                        aria-label="back"
                                        style={{
                                            backgroundColor: '#ffffff',
                                            color: '#006399',
                                            // borderRadius: '50%',
                                            // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                            padding: '8px',
                                            // marginRight: '20px',
                                        }}
                                        onClick={handleBackClick}
                                    >
                                        <ArrowBack />
                                    </IconButton>
                                    <StayText variant="h4" component="h1" style={{ marginLeft: '25px' }}>
                                        Stay
                                    </StayText>
                                    <BuddieText variant="h4" component="h1">
                                        Buddie
                                    </BuddieText>

                                </Box>

                                <Box>
                                    <ProfileIcon>
                                        <img src={ImgHostel1} alt="Profile" style={{ width: '175%', height: '175%', borderRadius: '50%' }} />
                                    </ProfileIcon>
                                </Box>

                            </HeaderContainer>
                        </AppBar> */}
                        <Header_sub/>
                        






                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <LocationChip label={cityName || 'Select City'} />
                            <FilterButton onClick={handleFilterClick}>
                                <FilterListIcon />
                            </FilterButton>
                        </Box>



                        <Box padding={2}>
                            <TextField
                                fullWidth
                                label="Search Hostels"
                                variant="outlined"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>

                        <Box padding={2}>
                            {loading ? (
                                [...Array(3)].map((_, index) => (
                                    <SkeletonCard key={index}>
                                        <Skeleton variant="rectangular" height={200} />
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                    </SkeletonCard>
                                ))
                            ) : (
                                filteredHostels.map((hostel) => (
                                    <HostelCard key={hostel._id} onClick={() => handleHostelClick(hostel._id)}>
                                        <Box position="relative">
                                            <img
                                                src={`data:image/jpeg;base64,${hostel.hostel_image}`}
                                                alt={hostel.hostel_name}
                                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                            />
                                            <Box position="absolute" top="10px" right="10px" bgcolor="#ffd700" color="#000" padding="8px 12px" fontWeight="bold" fontSize="14px" boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)">
                                                {hostel.hostel_type}
                                            </Box>
                                        </Box>
                                        <HostelCardContent>
                                            <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                                                {hostel.hostel_name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" style={{ marginBottom: '16px' }}>
                                                {hostel.hostel_area}, {hostel.hostel_city}
                                            </Typography>

                                            <Box display="flex" flexWrap="wrap" marginBottom="16px">
                                                {hostel.hostel_facilities.slice(0, 6).map((facility, index) => {
                                                    const icons = {
                                                        wifi: <Wifi />,
                                                        dining: <LocalDining />,
                                                        parking: <LocalParking />,
                                                        laundry: <LocalLaundryService />,
                                                        charging: <BatteryChargingFull />,
                                                        cleaning: <CleanHands />,
                                                    };
                                                    return (
                                                        <FacilityChip key={index} label={facility} icon={icons[facility]} />
                                                    );
                                                })}
                                            </Box>
                                            <Typography variant="body2" color="textSecondary">
                                                Security Deposit: ₹{hostel.hostel_security_deposit}
                                            </Typography>
                                        </HostelCardContent>
                                    </HostelCard>
                                ))
                            )}
                        </Box>

                        <Dialog open={isFilterDialogOpen} onClose={handleDialogClose}>
                            <DialogTitle>Filter Hostels</DialogTitle>
                            <DialogContent>
                                <FormControl fullWidth variant="outlined" margin="normal">
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        name="gender"
                                        value={selectedFilters.gender}
                                        onChange={handleFilterChange}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value="Male">Men</MenuItem>
                                        <MenuItem value="Female">Women</MenuItem>
                                        <MenuItem value="Co-living">Coliving</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth variant="outlined" margin="normal">
                                    <InputLabel>Area</InputLabel>
                                    <Select
                                        name="area"
                                        value={selectedFilters.area}
                                        onChange={handleFilterChange}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {areas.map((area) => (
                                            <MenuItem key={area._id} value={area.name}>{area.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleDialogClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleFilterApply} color="primary">
                                    Apply
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                )}
            </>
        </div>
    );
};

export default HostelsScreen;
