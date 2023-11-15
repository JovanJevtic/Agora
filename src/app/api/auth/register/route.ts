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
        console.log(email);

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
            service: 'gmail',
            // host: 'smtp.gmail.com',
            auth: {
                user: 'kontaktagoraa@gmail.com', // your domain email address
                pass: 'nsahjqkjijvdizzq' // your password
            },
        });

        await new Promise((resolve, reject) => {
            // verify connection configuration
            transporter.verify(function (error, success) {
                if (error) {
                    reject(error);
                    console.log(error);
                } else {
                    resolve(success);
                }
            });
        });
        
        const mailOptions = { 
            from: 'kontakt@agoraportal.net', 
            to: email,     
            subject: 'Verifikacijski kod', 
            html: 'Pozdrav,  '+ name +',\n\n' + `verifikuj svoj racun klikom na sledeci link: <a href="${url}">${url}</a>`+'\n\n, Hvala!\n' 
        };

        await new Promise((resolve, reject) => {
            // send mail
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    reject(err);
                    console.log(err);

                } else {
                    resolve(info);
                }
            });
        });

        // const sendResult = await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Doslo je do iznenadne greske...Molimo Vas pokusajte ponovo' }, { status: 500 });
    }
}
