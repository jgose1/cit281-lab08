const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;
const HOST = 'localhost';

// #3: Serve static files from public subfolder using process.cwd()
app.use(express.static(path.join(process.cwd(), 'public')));

// #1: GET all photos (first 20)
app.get("/photos", (req, res) => {
  fetch('https://jsonplaceholder.typicode.com/photos')
    .then(response => response.json())
    .then(data => {
      const first20 = data.slice(0, 20);
      res.status(200).json(first20);
    })
    .catch(error => {
      console.error("Error fetching all photos:", error.message);
      res.status(500).json({ error: error.message });
    });
});

// #2: GET photo by ID
app.get("/photos/:id", (req, res) => {
  const id = req.params.id;
  fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
    .then(response => response.json())
    .then(photo => {
      res.status(200).json(photo);
    })
    .catch(error => {
      console.error("Error fetching photo by ID:", error.message);
      res.status(500).json({ error: error.message });
    });
});

// Fallback route for 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, HOST, () => {
  console.log('Working directory:', process.cwd());
  console.log(`Server running at http://${HOST}:${PORT}`);
});