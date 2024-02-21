import "../../mongodb.mjs"
import "dotenv/config";
import { NextResponse } from 'next/server';
import { messageModel } from '@/app/api/schema.mjs';
import jwt from 'jsonwebtoken';

// get messages api 
export const GET = async (req, res, next) => {

    // make it yourself

}