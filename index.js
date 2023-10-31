const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 3301;

app.use(bodyParser.json());

// Use the cors middleware
app.use(cors());

app.post('/api/run', (req, res) => {
  const code = req.body.code;

  const child = spawn('node', ['-e', code]);

  let output = '';
  child.stdout.on('data', (data) => {
    output += data;
  });

  child.stderr.on('data', (data) => {
    output += data;
  });

  child.on('close', (code) => {
    res.json({ output });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
