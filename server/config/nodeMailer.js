import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: "damiantriebl@gmail.com",
        pass: "svrqlzzrmsryytih"
    }
});

export default transporter 