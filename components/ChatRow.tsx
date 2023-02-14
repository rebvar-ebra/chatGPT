import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname ,useRouter} from "next/navigation";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
type Props ={
    id:string;
  }
  
function ChatRow ({id}:Props){
  const pathname = usePathname();
  const router = useRouter();
  const {data:session} = useSession();
  const [active,setActive] = useState(false);
  const [messages] =useCollection(
    query(
    collection(db,'users',session?.user?.email!,'chat',id,'messages'),
    orderBy('createAt','asc')
  ) )

  return <Link href={`/chat/${id}`} className={`chatRow justify-center`}>
    <ChatBubbleLeftIcon className="h-5 w-5" />
        <p className="flex-1 md:inline-flex truncate">
          {messages?.docs[messages?.docs.length-1]?.data().text || "New Chat"}
        </p>
    <TrashIcon  className="h-5 w-5 text-gray-500 hover:text-red-700"/>
    </Link>
  
}

export default ChatRow