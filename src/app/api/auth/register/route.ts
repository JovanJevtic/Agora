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

        const url = `https://agoraportal.net/account/verify-email?token=${token}`

        const transporter = nodemailer.createTransport({ 
            service: 'gmail',
            auth: {     
                user: process.env.NODEMAILER_AUTH_EMAIL, 
                pass: process.env.NODEMAILER_AUTH_PWD
            } 
        });

        const mailOptions = { 
            from: process.env.NODEMAILER_AUTH_EMAIL, 
            to: email,     
            subject: 'Account Verification Code', 
            html: 'Pozdrav,  '+ name +',\n\n' + `verifikuj svoj racun klikom na sledeci link: <a href="${url}">${url}</a>`+'\n\n, Hvala!\n' 
        };

        const sendResult = transporter.sendMail(mailOptions);
        console.log(sendResult);
        return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Doslo je do iznenadne greske...Molimo Vas pokusajte ponovo' }, { status: 500 });
    }
}
