const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const User = require('./models/User');

// Ajouter un utilisateur test si non existant
const createTestUser = async () => {
  const exists = await User.findOne({ email: 'test@admin.com' });
  if (!exists) {
    await User.create({ email: 'test@admin.com', password: '123456' });
    console.log('Utilisateur test créé : test@admin.com / 123456');
  }
};

const app = express();
connectDB().then(createTestUser);
const authRoutes = require('./routes/auth.routes');
const furnitureRoutes = require('./routes/furniture.routes');
const materialRoutes = require('./routes/material.routes');
const categoryRoutes = require('./routes/category.routes');
const supplierRoutes = require('./routes/supplier.routes');



app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/furniture', furnitureRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/suppliers', supplierRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
