"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtp = exports.generate_otp = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const generate_otp = () => {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.generate_otp = generate_otp;
const sendOtp = (email, username, otp, storeValid) => {
    return new Promise((resolve, reject) => {
        let mailOption;
        const transpailer = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.Email,
                pass: process.env.Password
            }
        });
        if (storeValid) {
            mailOption = {
                from: process.env.Email,
                to: email,
                subject: 'Welcome! Retro Service ',
                html: `<div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                <h2>Hi${username},</h2>
                <p>Thank you for using <strong> Retor Service </strong>.</p>
                <p>Your Store Id  is:</p>
                <p style="font-size: 1.5rem; font-weight: bold; color: red;">${otp}</p>
                <p> Please do not share it with anyone.</p>
                <p>If you did not request this code, please contact our support team immediately.</p>
                <p>Best regards,<br>Retro Service Team</p>
              </div>
            `,
            };
        }
        else {
            mailOption = {
                from: process.env.Email,
                to: email,
                subject: 'Welcome! Verify Your Email with This OTP Code',
                html: `<div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                <h2>Hi${username},</h2>
                <p>Thank you for using <strong> Retor Service </strong>.</p>
                <p>Your OTP code for verification is:</p>
                <p style="font-size: 1.5rem; font-weight: bold; color: red;">${otp}</p>
                <p>This code is valid for the next 1 minutes. Please do not share it with anyone.</p>
                <p>If you did not request this code, please contact our support team immediately.</p>
                <p>Best regards,<br>Retro Service Team</p>
              </div>
            `,
            };
        }
        transpailer.sendMail(mailOption, (err, info) => {
            if (err) {
                console.log('error from sending mail ', err);
                reject(err);
                return;
            }
            console.log('mail sended', info.response);
            resolve(info);
        });
    });
};
exports.sendOtp = sendOtp;
