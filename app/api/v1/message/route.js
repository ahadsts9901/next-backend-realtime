import "../../mongodb.mjs"
import "dotenv/config";
import { NextResponse } from 'next/server';
import { messageModel } from '@/app/api/schema.mjs';
import { isValidObjectId } from "mongoose";
import { chatSocket, uploadToFirebase } from "../../functions.mjs";

export const POST = async (req, res, next) => {

    const formData = await req.formData()

    const from_id = formData.get('from_id')
    const fromName = formData.get('fromName')
    const to_id = formData.get('to_id')
    const toName = formData.get('toName')
    const messageText = formData.get('messageText')

    if (!from_id || !to_id || !fromName || !toName || ((!messageText || messageText.trim() === ""))) {
        return NextResponse.json({
            message: 'required parameters missing',
        }, { status: 400 });
    }

    if (!isValidObjectId(to_id)) {
        return NextResponse.json({
            message: 'invalid reciever id',
        }, { status: 400 });
    }

    if (!isValidObjectId(from_id)) {
        return NextResponse.json({
            message: 'invalid sender id',
        }, { status: 400 });
    }

    try {

        const uploadedFiles = await uploadToFirebase(files)

        const newMessage = {
            fromName: fromName,
            toName: toName,
            from_id: from_id,
            to_id: to_id,
            messageText: messageText,
            files: uploadedFiles,
        }

        // here everything is well
        const insertResponse = await messageModel.create(newMessage)

        // on succesfull entry to mongodb, run this function which will make some changes in firebase realtime database
        // give this function reciever's _id so it will make some changes in that reciever's document in firebase realtime database
        const setToFirebase = await chatSocket(to_id)

        return NextResponse.json({
            message: 'message sent successfully',
        });

    } catch (error) {
        console.error('Error sending message:', error);
        return NextResponse.json({
            message: 'An unknown error occurred',
        }, { status: 500 });
    }

};