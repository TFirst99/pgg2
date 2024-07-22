const express = require('express');
const cors = require('cors');
const roundRoutes = require('./routes/roundRoutes');
const statusRoutes = require('./routes/statusRoutes');
const behaviorRoutes = require('./routes/behaviorRoutes');
const earningsRoutes = require('./routes/earningsRoutes');
const finRoutes = require('./routes/finRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/round', roundRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/behavior', behaviorRoutes);
app.use('/api/earnings', earningsRoutes);
app.use('/api/fin', finRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});