const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// TODO: Add API routes here

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});