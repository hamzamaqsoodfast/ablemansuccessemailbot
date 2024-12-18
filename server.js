const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// Enable CORS
app.use(cors());
app.use(bodyParser.json());

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'info@ablemansuccess.co',
        pass: 'bncxlwybntomozph',
    },
});

app.post('/create-cv', async (req, res) => {
    const {
        email,
        name,
        age,
        country,
        nativeLanguage,
        language1,
        fluency1,
        language2,
        fluency2,
        language3,
        fluency3,
        position1,
        years1,
        company1,
        position2,
        years2,
        company2,
        position3,
        years3,
        company3,
        education,
    } = req.body;

    // Generate HTML content dynamically
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Staff CV - ${name}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            :root {
                --primary-color: #AF9475;
                --secondary-color: #022B41;
            }
            body {
                font-family: Arial, sans-serif;
            }
            #cv {
                position: relative;
                height: 100vh;
                padding: 40px;
                box-sizing: border-box;
            }
            footer {
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                text-align: center;
                font-size: 12px;
                color: #666;
            }
            section {
                margin-bottom: 20px;
            }
            h2 {
                color: var(--primary-color);
            }
        </style>
    </head>
    <body class="bg-gray-50">
        <div id="cv" class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg border-t-4" style="border-color: var(--primary-color)">
            <!-- Header Section -->
            <header class="flex items-center justify-between mb-6">
                <img src="https://res.cloudinary.com/monday-platform/image/upload/v1733947937/board_views_images/logos/1733947934752_f30a5058-724d-b0a8-6875-e5d29c6a2d0c.png" alt="Ableman Success Logo" class="h-16">
                <h1 class="text-xl font-bold" style="color: var(--secondary-color)">Staff CV</h1>
            </header>

            <!-- Personal Information -->
            <section>
                <h2 class="text-lg font-semibold mb-2">Personal Information</h2>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <p><strong>Email Address:</strong> ${email}</p>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Age:</strong> ${age}</p>
                        <p><strong>Country:</strong> ${country}</p>
                    </div>
                    <div>
                        <p><strong>Native Language:</strong> ${nativeLanguage}</p>
                        <p><strong>1st Language:</strong> ${language1} - ${fluency1}</p>
                        ${language2 && fluency2 ? `<p><strong>2nd Language:</strong> ${language2} - ${fluency2}</p>` : ''}
                        ${language3 && fluency3 ? `<p><strong>3rd Language:</strong> ${language3} - ${fluency3}</p>` : ''}
                    </div>
                </div>
            </section>

            <!-- Professional Experience -->
            <section>
                <h2 class="text-lg font-semibold mb-2">Professional Experience</h2>
                <div class="space-y-4">
                    <div class="p-4 bg-gray-100 rounded-lg">
                        <p><strong>Position 1:</strong> ${position1}</p>
                        <p><strong>Years of Experience:</strong> ${years1}</p>
                        <p><strong>Company Name:</strong> ${company1}</p>
                    </div>
                    ${position2 ? `
                    <div class="p-4 bg-gray-100 rounded-lg">
                        <p><strong>Position 2:</strong> ${position2}</p>
                        <p><strong>Years of Experience:</strong> ${years2}</p>
                        <p><strong>Company Name:</strong> ${company2}</p>
                    </div>` : ''}
                    ${position3 ? `
                    <div class="p-4 bg-gray-100 rounded-lg">
                        <p><strong>Position 3:</strong> ${position3}</p>
                        <p><strong>Years of Experience:</strong> ${years3}</p>
                        <p><strong>Company Name:</strong> ${company3}</p>
                    </div>` : ''}
                </div>
            </section>

            <!-- Education -->
            <section>
                <h2 class="text-lg font-semibold mb-2">Education</h2>
                <p>${education}</p>
            </section>

            <!-- Footer -->
            <footer>
                &copy; 2024 Ableman Success. All Rights Reserved.
            </footer>
        </div>
    </body>
    </html>
    `;

    try {
        // Generate PDF using Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'load' });
        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
        await browser.close();


        const currentDateTime = new Date().toLocaleString();

        const mailOptions = {
            from: '"Ableman Success Info Team" <info@ablemansuccess.co>',
            to: 'l217745@lhr.nu.edu.pk',
            subject: `Your CV Submission: ${name}'s Document is Ready`,
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>CV Submission</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f7f9fc;
                        margin: 0;
                        padding: 0;
                        color: #333;
                    }
                    .container {
                        max-width: 800px; /* Increased width */
                        margin: 30px auto;
                        background: #fff;
                        border-radius: 10px;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        overflow: hidden;
                        border: 1px solid #e4e9f0;
                    }
                    .header {
                        background-color: #007bff;
                        color: white;
                        text-align: center;
                        padding: 20px;
                    }
                    .header h1 {
                        font-size: 24px;
                        margin: 0;
                        font-weight: bold;
                    }
                    .body {
                        padding: 20px;
                    }
                    .body p {
                        margin: 15px 0;
                        line-height: 1.6;
                    }
                    .highlight {
                        font-weight: bold;
                        color: #007bff;
                    }
                    .footer {
                        background-color: #f7f9fc;
                        text-align: center;
                        padding: 15px;
                        font-size: 12px;
                        color: #666;
                        border-top: 1px solid #e4e9f0;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <!-- Header Section -->
                    <div class="header">
                        <h1>Ableman Success Info Team</h1>
                    </div>
                    
                    <!-- Body Section -->
                    <div class="body">
                        <p>Hey Jana,</p>
                        <p>We are pleased to share the CV for <span class="highlight">${name}</span>.</p>
                        <p>This document was prepared and generated on <span class="highlight">${currentDateTime}</span>.</p>
                        <p>Should you have any questions, feel free to get in touch with our team.</p>
                        <p>Best regards,</p>
                        <p><strong>Ableman Success Info Team</strong></p>
                    </div>
        
                    <!-- Footer Section -->
                    <div class="footer">
                        <p>&copy; 2024 Ableman Success. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            `,
            attachments: [
                {
                    filename: `${name.replace(/\s+/g, '_')}_CV.pdf`,
                    content: pdfBuffer, // Attach PDF from memory
                },
            ],
        };
        
        await transporter.sendMail(mailOptions);

        res.status(200).send({ message: 'CV created and sent successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ message: 'An error occurred while creating or sending the CV.' });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
