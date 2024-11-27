const express = require('express');
const CryptoJS = require("crypto-js");
const XTEncryptAES256V4 = require('./utils/Encrypt')
const XTDecryptAES256V4 = require('./utils/Decript')
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Simple API endpoint
app.get('/', (req, res) => {
    res.send({ message: 'Hello, Docker!' });
});

// Another endpoint
app.post('/decript', (req, res) => {
    const { message, secretKey, iv } = req.body;
    var result = XTDecryptAES256V4(message, secretKey, iv);


    res.send(result);
});

app.post('/encript', (req, res) => {
    const { message, secretKey, iv } = req.body;
    var result = XTEncryptAES256V4(message, secretKey, iv);

    res.send(result);
});

// set up the server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

