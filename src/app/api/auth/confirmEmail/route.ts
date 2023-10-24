import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const {
            email, password
        } = await request.json();

        console.log({ email, password });
        return NextResponse.json({ msg: 'success' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
