const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to handle form data
app.post('/submit', (req, res) => {
    const { name, food } = req.body;

    console.log("Name:", name);
    console.log("Favourite Food:", food);

    const logEntry = `${new Date().toISOString()} | Name: ${name}, Food: ${food}\n`;

    // Save to file
    const logFilePath = path.join(__dirname, 'submissions.log');
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Error saving user data:', err);
        }
    });

    res.send("Thanks! Your details were received by Yogesh 🎉");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
