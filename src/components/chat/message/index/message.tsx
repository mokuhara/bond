import React from 'react'
import Cookies from 'js-cookie'
import {format} from 'date-fns'


import messagesState from './store'
import styles from './message.module.css'


const Message: React.FC<{message: typeof messagesState[0]}> = ({message}) => {
    console.log(message)
    const userId = Cookies.get('bd-uid') ? parseInt(Cookies.get('bd-uid') as string, 10) : undefined
    console.log(message.userId === userId)

    const renderRemote = (
            <div className={styles.remoteContainer}>
                <div className={styles.icon}>
                    <img src={message.iconUrl} />
                </div>
                <div className={styles.content}>
                <div className={styles.name}>
                    { message.userId}
                </div>
                <div className={styles.text}>
                    { message.message }
                </div>
                </div>
                <div className={styles.timestamp}>
                    {format(message.createdAt, 'MM/dd HH:mm')}
                </div>
            </div>
    )

    const renderLocal = (
            <div className={styles.localContainer}>
            <div className={styles.timestamp}>
                {format(message.createdAt, 'MM/dd HH:mm')}
                </div>
                <div className={styles.content}>
                <div className={styles.text}>
                    { message.message }
                </div>
                </div>
            </div>
    )

    return (
        <>
            <div className={styles.root}>
                {message.userId === userId ?  (
                        renderLocal
                    ) : (
                        renderRemote
                    )}
            </div>
        </>
    )
}

export default Message