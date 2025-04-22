const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Pre-save hook to hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        // Hash the password with a salt round of 10
        this.password = await bcrypt.hash(this.password, 10);
        console.log('Password hashed before save:', this.password);
        next();
    } catch (error) {
        console.error('Error during password hashing:', error);
        next(error);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function (password) {
    const match = await bcrypt.compare(password, this.password);
    console.log('Password comparison result:', match);
    return match;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
