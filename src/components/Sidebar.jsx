import { Link } from "react-router-dom"
import { FaTasks } from "react-icons/fa";
import { PiNotePencilBold } from "react-icons/pi";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleMenu = () => {
    setOpen(!open);
  }
  return (
    <div>
      <div className="hidden lg:flex">
        <div className=" left-0 w-[15%] bg-blue-950 h-screen absolute">
          <div className="text-white font-medium grid place-content-center my-20 gap-5 text-lg">
            <div className="flex gap-2 items-center"><FaTasks className="text-2xl" /><Link to="/">Task Manager</Link></div>
            <div className="flex gap-2 items-center"><PiNotePencilBold className="text-2xl" /><Link to="/add-task">Add Task</Link>  </div>
          </div>
        </div>
      </div>

      <div>
        <IoMdMenu className={open ? `hidden` : `w-10 h-10 lg:hidden my-3 mx-8 cursor-pointer`} onClick={handleMenu} />
        <div className={open ? `flex z-[100] fixed` : "hidden"}>
          <div className=" left-0 w-64 bg-blue-900 h-screen absolute">
            <RxCross2 className="w-8 h-8 float-right m-5 text-white cursor-pointer" onClick={handleMenu} />
            <div className="text-white font-medium grid place-content-center my-20 gap-5 text-lg">
              <div className="flex gap-2 items-center"><FaTasks className="text-2xl" /><Link to="/" onClick={handleMenu}>Task Manager</Link></div>
              <div className="flex gap-2 items-center"><PiNotePencilBold className="text-2xl" /><Link to="/add-task" onClick={handleMenu}>Add Task</Link>  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar