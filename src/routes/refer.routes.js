import express from "express";
import sendReferralEmail from "../mailer.js";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
const router = express.Router();

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

router.post("/", async (req, res) => {
    try {
        const { referrerName, referrerEmail, refereeName, refereeEmail, referralLink } = req.body
        console.log(refereeEmail);
        console.log(refereeName);
        console.log(referralLink);
        console.log(referrerEmail);
        console.log(referrerName);
        
        if (!isValidEmail(referrerEmail) || !isValidEmail(refereeEmail)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const referal = await prisma.referral.create({
            data: {
                refereeEmail,
                refereeName,
                referralLink,
                referrerEmail,
                referrerName
            }
        })

        console.log(referal);

        const sendMail = await sendReferralEmail(refereeEmail, refereeName, referralLink, referrerName)

        console.log(sendMail);

        res.json({ message: "Refered Successfully" })
    } catch (error) {
        console.log('Error while storing form data', error.message)
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
})

export default router;