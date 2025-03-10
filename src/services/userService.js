import User from '@models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const saltRounds = 10;
const secretKey = process.env.SECRET_KEY;
const tokenExpiry = process.env.TOKEN_EXPIRY;

const hashUserPassword = async (password) => {
    if (!password) {
        throw new Error('Password cannot be empty!');
    }
    return bcrypt.hash(password, saltRounds);
};

const handleUserLogin = async (email, password) => {
    try {
        const user = await User.findOne({ Email: email }).lean();

        if (!user) {
            return { errCode: 1, errMessage: 'Email does not exist.' };
        }

        const checkPassword = await bcrypt.compare(password, user.UserPassword);
        if (!checkPassword) {
            return { errCode: 3, errMessage: 'Incorrect password.' };
        }

        const token = jwt.sign(
            { email: user.Email, role: user.Role },
            secretKey,
            { expiresIn: tokenExpiry }
        );

        delete user.UserPassword;

        return {
            errCode: 0,
            errMessage: 'Login successful!',
            user,
            token
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const checkUserEmail = async (email) => {
    try {
        const user = await User.findOne({ Email: email });
        return !!user;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.find({}, '-UserPassword').lean();
        return users;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId, '-UserPassword').lean();
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const createNewUser = async (data) => {
    try {
        const { Email, UserName, UserPassword, Phone, Role } = data;

        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return { errCode: 1, errMessage: 'Email is already in use.' };
        }

        const hashedPassword = await hashUserPassword(UserPassword);

        const newUser = new User({
            UserName,
            UserPassword: hashedPassword,
            Email,
            Phone,
            Role: Role || 'user'
        });

        await newUser.save();

        return { errCode: 0, message: 'User created successfully!' };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateUserData = async (data) => {
    try {
        const { UserId, UserName, Email, Phone, Role } = data;

        if (!UserId) {
            return { errCode: 1, errMessage: 'Missing UserId parameter!' };
        }

        const user = await User.findById(UserId);
        if (!user) {
            return { errCode: 2, errMessage: 'User not found!' };
        }

        user.UserName = UserName || user.UserName;
        user.Email = Email || user.Email;
        user.Phone = Phone || user.Phone;
        user.Role = Role || user.Role;

        await user.save();

        return { errCode: 0, message: 'User information updated successfully!' };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteUser = async (userId) => {
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return { errCode: 1, errMessage: 'User not found!' };
        }

        return { errCode: 0, message: 'User deleted successfully!' };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const sendResetPasswordEmail = async (email) => {
    try {
        const user = await User.findOne({ Email: email });
        if (!user) {
            return { errCode: 1, errMessage: 'Email not found in the system!' };
        }

        const token = jwt.sign({ email: user.Email }, secretKey, { expiresIn: '15m' });
        const resetLink = `http://localhost:3000/reset-password?token=${token}`;

        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });

        const info = await transporter.sendMail({
            from: '"Your App" <no-reply@example.com>',
            to: email,
            subject: 'Password Reset Request',
            text: `Click the following link to reset your password: ${resetLink}`,
            html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to proceed.</p>`
        });

        console.log('Preview email at:', nodemailer.getTestMessageUrl(info));

        return {
            errCode: 0,
            message: 'Password reset instructions have been sent!',
            previewURL: nodemailer.getTestMessageUrl(info)
        };
    } catch (error) {
        console.error('Error sending password reset email:', error);
        return { errCode: 2, errMessage: 'System error!', error: error.message };
    }
};

const resetPassword = async (token, newPassword) => {
    try {
        const decoded = jwt.verify(token, secretKey);

        const user = await User.findOne({ Email: decoded.email });
        if (!user) {
            return { errCode: 1, errMessage: 'User not found!' };
        }

        user.UserPassword = await hashUserPassword(newPassword);
        await user.save();

        return { errCode: 0, message: 'Password has been updated!' };
    } catch (error) {
        console.error('Error resetting password:', error);
        return { errCode: 2, errMessage: 'System error!' };
    }
};

export default {
    handleUserLogin,
    checkUserEmail,
    getAllUsers,
    getUserById,
    createNewUser,
    updateUserData,
    deleteUser,
    sendResetPasswordEmail,
    resetPassword
};
