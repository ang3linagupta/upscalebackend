// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
const Admin = require('../models/adminloginmodel');
const MONGO_URI = 'mongodb+srv://ang3lina:Angelina127@cluster0.vfz3c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function seedAdmin() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const existingAdmin = await Admin.findOne({ email: 'admin@gmail.com' });
        if (existingAdmin) {
            console.log('Admin already exists');
            return mongoose.disconnect();
        }

        const hashedPassword = await bcrypt.hash('admin12345', 10);
        const admin = new Admin({
            email: 'admin@gmail.com',
            password: hashedPassword,
        });

        await admin.save();
        console.log('Admin credentials saved successfully');
        mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding admin:', error);
        mongoose.disconnect();
    }
}
seedAdmin();