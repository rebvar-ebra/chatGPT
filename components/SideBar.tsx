'use client';

import { collection, orderBy, query } from "firebase/firestore";
import { useSession,signOut } from "next-auth/react"
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import NewChat from "./NewChat"

function SideBar() {
  
  const {data: session} = useSession();

  const [chats, loading, error] = useCollection(
    session && query( collection(db,'users',session.user?.email!,'chats'),orderBy("createAt","asc"))
  );
  return (
    <div className="p-2 flex flex-col h-screen">
        <div className="flex-1 ">
            <div>
                <NewChat />
                <div className="hidden sm:inline">
                    {/* Model Selections*/}
                    <ModelSelection/>
                </div>

                <div className="flex flex-col sapce-y-2 my-2">
                  {loading &&(
                    <div className="animate-pulse text-center text-white">
                      <p>Loading chats...</p>
                    </div>
                  )}

                {/* Map through the chatrows */}
                
                {chats?.docs.map(chat => (
                  <ChatRow key={chat.id} id={chat.id} />
                ))}
                </div>
            </div>
        </div>
        {session && <img onClick={()=>signOut()} src={session.user?.image!} alt="image login" 
        className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"/>}
    </div>
  )
}

export default SideBar