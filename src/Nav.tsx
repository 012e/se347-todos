import { useDispatch, useSelector } from "react-redux"
import { toggle } from "./visibleSlide"
import { X, Home, Camera, FolderCheck } from 'lucide-react'
import { Link } from "react-router-dom"


export default function Nav() {
  const visible = useSelector((state: any) => state.visible.visible)
  const dispatch = useDispatch()
  return <>
    <div className={`fixed inset-y-0 left-0 w-64 bg-slate-600 transform ${visible ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
      <div className="flex items-center justify-center" onClick={() => dispatch(toggle())}>
        <div>
          <X size={30} className="text-cyan-400 m-4 hover:text-cyan-300" />

        </div>
      </div>
      <nav>
        <ul className="flex flex-col justify-center h-screen">
          <Link to="/" className="flex flex-col gap-2 items-center justify-center text-cyan-400 mb-4 hover:text-cyan-300">
            <Home size={50} />
            <span>HOME</span>
          </Link>
          <Link to="/todo" className="flex flex-col gap-2 items-center justify-center text-cyan-400 hover:text-cyan-300">
            <FolderCheck size={50} />
            <span>VIEW TODO</span>
          </Link>
        </ul>
      </nav>
    </div>
  </>
}

