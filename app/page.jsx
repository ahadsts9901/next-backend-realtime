"use client"

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux"
import "dotenv/config"
import "../../config"
import { getDatabase, ref, onValue } from "firebase/database"

const Page = () => {

  const currentUser = useSelector((state) => state.user) // user data from redux

  // on the backend when the message is sent, and reciever's document is modified in firebase
  // so this useEffect will run and will do something when the document will modify ( means someone sent a message )
  // so when this document will modify, we make an api call to fetch all the messages. and our realtime socket is ready!
  // contact the developer for further guidance ====> whatsapp: +923130019086

  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, `users/${currentUser?._id}`);
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      fetchMessages()
    });
  }, [currentUser])

  const fetchMessages = async () => {

    try {
      const response = await axios.get('/api/v1/messages', { withCredentials: true });
    } catch (error) {
      console.error(error);
    }

  };

  const sendMessage = async (to_id, toNameId) => {

    try {

      const formData = new FormData()

      formData.append("from_id", currentUser._id)
      formData.append("fromName", currentUser.nameId)
      formData.append("to_id", to_id)
      formData.append("toName", toNameId)
      formData.append("messageText", messageText)

      const response = await axios.post(
        '/api/v1/message', formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      fetchMessages()

    } catch (error) {
      console.error(error);
    }

  };

  return (
    <>make your own chat form I will just tell you the logic and functionality</>
  )
}

export default Page