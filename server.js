const express = require('express');
const app = express();

// Use express.json() middleware to parse JSON bodies.
app.use(express.json());

// Serve static files (HTML, CSS, client-side JavaScript) from the "public" directory.
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


// In-memory storage for messages and results
let messages = [];
let results = [];

/**
 * GET /messages
 * Returns a JSON object containing all messages.
 */
app.get('/messages', (req, res) => {
    res.json({ messages });
});

/**
 * POST /message
 * Stores a new user message in memory.
 */
app.post('/message', (req, res) => {
    const { username, message } = req.body;
    if (!username || !message) {
        return res.status(400).json({ error: 'Both username and message are required.' });
    }
    const newMessage = { username, message, timestamp: Date.now() };
    messages.push(newMessage);
    res.status(201).json({ success: true });
});

/**
 * POST /submit-result
 * Stores a user's reaction time result.
 */
app.post('/submit-result', (req, res) => {
    const { username, totalReactionTime } = req.body;
    if (!username || !totalReactionTime) {
        return res.status(400).json({ error: 'Username and reaction time are required.' });
    }
    results.push({ username, totalReactionTime });
    res.status(201).json({ success: true });
});

/**
 * GET /get-results
 * Returns a list of all user reaction times.
 */
app.get('/get-results', (req, res) => {
    res.json(results);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
