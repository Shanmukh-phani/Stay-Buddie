// routes/adminRoutes.js
const express = require('express');
const router = express.Router();

const Hostel = require('../models/adminModels/Hostel'); // Assuming your model is in the models folder

const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt'); // Make sure to provide the correct path



// Get hostels by city
// router.get('/hostels', async (req, res) => {
//     const { city } = req.query;

//     try {
//         // Find hostels based on the city parameter
//         const hostels = await Hostel.find({ hostel_city: city });
//         res.json(hostels);
//     } catch (error) {
//         console.error('Error fetching hostels:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });



// // Endpoint to get hostels based on city
// router.get('/hostels', async (req, res) => {
//     const { city } = req.query;
//     try {
//         const hostels = await Hostel.find({ city });
//         res.json({ hostels });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching hostels', error });
//     }
// });


// GET hostels with gender and area filters
// router.get('/hostels', async (req, res) => {
//     const { city, gender, area } = req.query;
//     const filters = {};

//     // Filter by city if provided
//     if (city) {
//         filters.hostel_city = city;  // Assuming 'hostel_city' is the field in your model
//     }
    
//     // Filter by gender if provided
//     if (gender) {
//         filters.gender = gender; // Assuming 'gender' is the field in your model
//     }
    
//     // Filter by area if provided
//     if (area) {
//         filters.hostel_area = area; // Assuming 'hostel_area' is the field in your model
//     }

//     try {
//         // Fetch hostels based on filters
//         const hostels = await Hostel.find(filters);
//         res.json({ hostels });
//     } catch (error) {
//         console.error('Error fetching hostels:', error);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// });

router.get('/hostels', async (req, res) => {
    const { city, gender, area, page = 1, limit = 10 } = req.query;
    const filters = {};
    
    // Filter by city if provided
    if (city) {
        filters.hostel_city = city;  // Assuming 'hostel_city' is the field in your model
    }

    // Filter by gender if provided
    if (gender) {
        filters.gender = gender; // Assuming 'gender' is the field in your model
    }

    // Filter by area if provided
    if (area) {
        filters.hostel_area = area; // Assuming 'hostel_area' is the field in your model
    }

    try {
        // Calculate the number of hostels to skip
        const skip = (page - 1) * limit;

        // Fetch hostels based on filters, pagination
        const hostels = await Hostel.find(filters)
            .limit(Number(limit))
            .skip(skip);

        // Get the total count of hostels for pagination metadata
        const total = await Hostel.countDocuments(filters);

        res.json({
            hostels,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
        });
    } catch (error) {
        console.error('Error fetching hostels:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



// Fetch available areas (for filter options)
router.get('/areas', async (req, res) => {
    try {
        const areas = await Hostel.distinct('hostel_area'); // Assuming 'hostel_area' is the field in your model
        res.json({ areas: areas.map(area => ({ _id: area, name: area })) });
    } catch (error) {
        console.error('Error fetching areas:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});




// Route to get hostel details by ID
router.get('/hostel/:id', async (req, res) => {
    try {
        const hostelId = req.params.id;
        const hostel = await Hostel.findById(hostelId);

        if (!hostel) {
            return res.status(404).json({ message: 'Hostel not found' });
        }

        res.status(200).json(hostel);
        // console.log(hostel);
    
    } catch (error) {
        console.error('Error fetching hostel details:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
