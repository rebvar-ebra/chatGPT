import NewChat from "./NewChat"

function SideBar() {
  return (
    <div className="p-2 flex flex-col h-screen">
        <div className="flex-1 ">
            <div>
                {/* NewChat */}
                <NewChat />
                <div>
                    {/* Model Selections*/}
                </div>
                {/* Map through the chatrows */}
            </div>
        </div>
    </div>
  )
}

export default SideBar