import React  from 'react'
import Cookies from 'js-cookie'
import {format} from 'date-fns'
import ReactMarkdown from 'react-markdown';


import { existMessageState } from '../store'
import styles from './messageContent.module.css'
import MessageEdit from './messageEdit'


const MessageBox: React.FC<{message: typeof existMessageState}> = ({message}) => {
    const userId = Cookies.get('bd-uid') ? parseInt(Cookies.get('bd-uid') as string, 10) : undefined
    const reg=new RegExp("((https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+))")

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
                        <ReactMarkdown source={message.message.replace(reg,"[$1]($1)")} />
                    </div>
                </div>
                <div className={styles.timestamp}>
                    {format(message.createdAt, 'MM/dd HH:mm')}
                </div>
            </div>
    )

    const renderLocal = (
            <div className={styles.hoge}>
            <div className={styles.localContainer}>
                <div className={styles.timestamp}>
                    {format(message.createdAt, 'MM/dd HH:mm')}
                </div>
                <div className={styles.content}>
                    <div className={styles.text}>
                    <ReactMarkdown source={message.message.replace(reg,"[$1]($1)")} />
                    </div>
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

export default MessageBox