// url: http://localhost:3000/api/order 
// import prisma from "./../../libs/prismadb"
// import { NextResponse } from "next/server"

// export const POST = async (request) => {
//     try {
//         const body = await request.json(); 
//         const {firstname, lastname, email, phone, type, message} = body;
//         const newPost = await prisma.order.create({
//             data: {
//                 firstname,
//                 lastname,
//                 email,
//                 phone,
//                 type,
//                 message
//             }
            
//         })

//         return NextResponse.json(newPost);

//     } catch(err) {
//         return NextResponse.json({message: "POST Error", err}, {status: 500})
//     }
// }

// export const GET = async () => {
//     try {

//         const posts = await prisma.order.findMany()

//         return NextResponse.json(posts);

//     } catch(err) {
//         return NextResponse.json({message: "GET Error", err}, {status: 500})
//     }
// }














import prisma from "../../../prisma";
import { NextResponse } from "next/server";

export async function main() {
    try {
        await prisma.$connect();

    }
    catch (err) {
        return Error("Database connect unsuccessful")
    }
}

export const GET = async (req: Request, res: NextResponse) => {
    try { 
        console.time('start')
        await main();
        const posts = await prisma.order.findMany();
        console.timeEnd('start') 
        
        

        return NextResponse.json({ message: "Success", posts }, { status: 200 });

    }
    catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
    finally {
        await prisma.$disconnect();
    }
}; 




export const POST = async (req: Request, res: NextResponse) => {
    try {
        const {firstname, lastname, email, phone, type, message} = await req.json();

        await main();   
        const post = await prisma.order.createMany({ data: {firstname, lastname, email, phone, type, message} });  
        return NextResponse.json({ message: "Success", post }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
    finally {
        await prisma.$disconnect();
    }
};
 

