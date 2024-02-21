import "../../../mongodb.mjs"
import "dotenv/config"
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { sessionInDays, userModel, } from '@/app/api/schema.mjs';
import { generateRandomkey } from "@/app/api/functions.mjs";


// signup api
export const POST = async (req, res) => {

    // write it yourself

}