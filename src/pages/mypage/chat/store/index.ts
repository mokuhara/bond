import { thread, threads } from './threadState'
import { existMessages, existMessage, message} from './messageState'

export const threadsState = threads
export const threadState = thread
export const existMessageState = existMessage
export const existMessagesState = existMessages
export const messageState = message