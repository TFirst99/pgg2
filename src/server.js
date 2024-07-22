const express = require('express');
const cors = require('cors');
require('dotenv').config();
const roundRoutes = require('./routes/roundRoutes');
const statusRoutes = require('./routes/statusRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/round', roundRoutes);
app.use('/api/status', statusRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});