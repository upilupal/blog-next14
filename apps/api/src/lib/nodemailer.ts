import { GMAIL_APP_PASSWORD, GMAIL_EMAIL } from '@/config';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL_EMAIL,
        pass: GMAIL_APP_PASSWORD,
    }
})