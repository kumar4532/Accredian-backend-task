import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendReferralEmail = async (refereeEmail, refereeName, referrerName, referralLink) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: refereeEmail,
            subject: "You've been referred!",
            html: `<p>Hi ${refereeName},</p>
                   <p>${referrerName} has referred you to join our platform.</p>
                   <p>Click the link below to get started:</p>
                   <a href="${referralLink}">${referralLink}</a>
                   <p>Best Regards,</p>
                   <p>Your Company</p>`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Referral email sent to", refereeEmail);
    } catch (error) {
        console.error("Error sending referral email:", error.message);
    }
};

export default sendReferralEmail
