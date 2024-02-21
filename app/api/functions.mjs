import "dotenv/config";
import 'firebase/compat/storage';
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
import { getDatabase, ref, set, get } from 'firebase/database'


// realtime database for socket
export const chatSocket = async (userId) => {

    // initialize database
    const db = getDatabase()
    const userRef = ref(db, `users/${userId}`)

    // check if user exists in firebase database
    const checkIfExists = async () => {
        const snapshot = await get(userRef);
        return snapshot.exists();
    };

    checkIfExists().then((exists) => {
        // if exists so update message field 
        if (exists) {
            const newData = { newMessage: new Date().getTime() };
            set(userRef, newData, { merge: true });
        } else {
            // if no exists so create user with his mongodb id
            set(ref(db, 'users/' + userId), {
                userId: userId,
                newMessage: false,
                newNotification: false,
            });
        }
    }).catch((error) => {
        console.log(error);
    })
}