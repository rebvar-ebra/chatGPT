
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
type Props ={
    id:string;
  }
  
const ChatRow = ({id}:Props) => {
  return <Link href={`/chat/${id}`}>
    <ChatBubbleLeftIcon className="h-5 w-5" />
        <p>New Chat</p>
    <TrashIcon  className="h-5 w-5 text-gray-500 hover:text-red-700"/>
    </Link>
  
}

export default ChatRow