import React, { useState, useEffect } from 'react'
import { db } from "../firebase"
import { wrapDocumentSnapshotData } from '../firebase'

import { existMessagesState } from '../store'
import Message from './messageContent'
import styles from './messageBox.module.css'

const MessageIndex: React.FC<{threadId: number}> = ({threadId}) => {
    const [messages, setMessages] = useState(existMessagesState)
    wrapDocumentSnapshotData()


    useEffect(() => {
        const unSub = db.collection("messages").where('threadId', '==', threadId).orderBy('createdAt','asc').onSnapshot((snapshot) => {
            setMessages(
                snapshot.docs.map((doc) =>({
                    id: doc.id,
                    threadId: doc.data().threadId,
                    userId: doc.data().userId,
                    iconUrl: doc.data().iconUrl,
                    message: doc.data().message,
                    createdAt: doc.data().createdAt.toDate(),
                    updatedAt: doc.data().updatedAt.toDate(),
                })))
        })
        return () => {
            unSub()
        }
    }, [])

    return (
        <>
            <div className={styles.root}>
                {messages && messages.map(message => {
                    return <Message message={message} key={message.id} />
                })}
            </div>

        </>
    )
}


export default MessageIndex