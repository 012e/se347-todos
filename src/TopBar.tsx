import { useDispatch } from "react-redux";
import { toggle } from './visibleSlide';
import { Menu } from 'lucide-react'

export default function TopBar() {
  const dispatch = useDispatch();
  return <>
    <div className="bg-slate-600 p-4 fixed top-0 left-0 right-0 z-10">
      <button onClick={() => dispatch(toggle())} className="text-cyan-400 hover:text-cyan-300">
        <Menu className="h-6 w-6" />
      </button>
    </div>
  </>

}
