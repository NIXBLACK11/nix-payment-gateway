import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import nodemailer from 'nodemailer';

const connection = new IORedis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: null,
});

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

const worker = new Worker(
    'emailQueue',
    async (job) => {
        const { buyerEmail, merchantEmail, plan, saasName, logoUrl } = job.data;

        console.log(
            `📧 Sending email to ${buyerEmail} for ${saasName} - Plan: ${plan}`
        );

        try {
            await transporter.sendMail({
                from: EMAIL_USER,
                to: buyerEmail,
                subject: `🎉 Payment Successful - ${saasName}`,
                html: `
                    <div style="font-family: Arial, sans-serif; text-align: center;">
                        <img src="${logoUrl}" alt="${saasName} Logo" style="max-width: 100px; margin-bottom: 10px;" />
                        <h2>🎉 Payment Successful!</h2>
                        <p>Thank you for purchasing the <strong>${plan}</strong> plan of <strong>${saasName}</strong>.</p>
                        <p>We appreciate your business!</p>
                    </div>
                `,
            });

            await transporter.sendMail({
                from: EMAIL_USER,
                to: merchantEmail,
                subject: `🎉 Payment Successful - ${saasName}`,
                html: `
                    <div style="font-family: Arial, sans-serif; text-align: center;">
                        <img src="${logoUrl}" alt="${saasName} Logo" style="max-width: 100px; margin-bottom: 10px;" />
                        <h2>🎉 Payment Successful!</h2>
                        <p>${buyerEmail} bout your <strong>${plan}</strong> plan of <strong>${saasName}</strong>.</p>
                        <p>We appreciate your business! Keep growing!</p>
                    </div>
                `,
            });

            console.log(`✅ Email sent successfully to ${buyerEmail}`);
            console.log(`✅ Email sent successfully to ${merchantEmail}`);
        } catch (error) {
            console.error(`❌ Failed to send email to ${buyerEmail}:`, error);
            throw error;
        }
    },
    { connection }
);

// Handle failed jobs
worker.on('failed', (job, err) => {
    console.error(`🚨 Email job ${job!.id} failed with error: ${err.message}`);
});
