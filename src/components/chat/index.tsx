import React, { useState, useEffect } from 'react'

import ThreadIndex from './thread/index'
import ThreadNew from './thread/new'


const Chat: React.FC<{transactionId: number}> = ({transactionId}) => {
    return (
        <>
           <ThreadIndex transactionId={transactionId}/>
           <ThreadNew transactionId={transactionId} />
        </>
    )
}

export default Chat