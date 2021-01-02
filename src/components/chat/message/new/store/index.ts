
import firebase from "firebase/app"

const messageState = {
    threadId: 0,
    userId: 0,
    iconUrl: "",
    message: "",
    createdAt: new Date(),
    updatedAt: new Date(),
}

export default messageState