require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const sequelize = require('./config/database');

// Import routes
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const patientRoutes = require('./routes/patientRoutes');
const labTestRoutes = require('./routes/labTestRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const medicalNoteRoutes = require('./routes/medicalNoteRoutes');
const medicalRecordRoutes = require('./routes/medicalRecordRoutes');
const billingRoutes = require('./routes/billingRoutes');
const vitalsRoutes = require('./routes/vitalsRoutes');

// Create Express app
const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Logging
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api', patientRoutes);
app.use('/api/lab-tests', labTestRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/notes', medicalNoteRoutes);
app.use('/api/records', medicalRecordRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/vitals', vitalsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Database connection and server start
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync database models
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('Database models synchronized.');

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer(); 