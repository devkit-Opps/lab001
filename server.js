const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files

// Serve the registration form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/submit-form', async (req, res) => {
    const formData = req.body;

    try {
        // Forward form data to the external URL
        const response = await axios.post('https://EXAMPLEURL.COM', formData);
        console.log(response.data)
        res.send('Form submitted successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error submitting form.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
