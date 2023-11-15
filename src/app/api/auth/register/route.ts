import prisma from "@/app/libs/prismadb";
import { registerFormSchema } from "@/app/libs/validation/form";
import { NextResponse, NextRequest } from "next/server";
import * as bcrypt from 'bcryptjs'
import * as nodemailer from 'nodemailer'
import { signJWT, verifyJWT } from "@/app/libs/token";

type RegisterUserData = {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
}

export const POST = async (request: NextRequest) => {
    try {
        const {
            email,
            name,
            password,
            confirmPassword
        } = (await request.json()) as RegisterUserData;

        const validateResponse = registerFormSchema.safeParse({ email, password, name, confirmPassword });
        // if (!validateResponse.success) return NextResponse.json({ error: 'Greska u unosu...' }, { status: 400 });

        let zodErrors = {};
        if (!validateResponse.success) {
                validateResponse.error.issues.forEach((issue) => {
                zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
            });

            return NextResponse.json({ errors: zodErrors }, { status: 400 });
        }

        const emailEquieped = await prisma.user.findUnique({ where: { email: email } });
        if (emailEquieped) return NextResponse.json({ errors: { email: 'Email je vec u upotrebi!' } }, { status: 400 });

        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);    
        const tokenCode = (Math.floor(10000 + Math.random() * 90000));

        const token = await signJWT({
           email: email,
           tokenCode: tokenCode
    })  
        
        const emailVerifyToken = await prisma.emailVerificationToken.create({
            data: {
                token: token,
                email: email,
                name: name,
                password: hashedPwd,
            }
        })

        if (!emailVerifyToken) return NextResponse.json({ error: 'Doslo je do greske...Molimo Vas pokusajte ponovo' }, { status: 500 });

        const url = `https://www.agoraportal.net/account/verify-email?token=${token}`

        const transporter = nodemailer.createTransport({ 
            host: 'www.agoraportal.net',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'kontakt@agoraportal.net', // your domain email address
                pass: 'FNOM0OQhOwVDI1N' // your password
            }
        });

        const mailOptions = { 
            from: '"Servis" <kontakt@agoraportal.net>', 
            to: email,     
            subject: 'Account Verification Code', 
            html: 'Pozdrav,  '+ name +',\n\n' + `verifikuj svoj racun klikom na sledeci link: <a href="${url}">${url}</a>`+'\n\n, Hvala!\n' 
        };

        const sendResult = await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Doslo je do iznenadne greske...Molimo Vas pokusajte ponovo' }, { status: 500 });
    }
}
