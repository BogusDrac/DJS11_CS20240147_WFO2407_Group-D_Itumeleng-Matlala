import { Link } from "react-router-dom"
import { Home } from "lucide-react"

const NotFound = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <div className="absolute rotate-12 rounded bg-blue-500 px-2 text-sm text-white">
          Page Not Found
        </div>
        <button className="mt-5">
          <Link
            to="/"
            className="group relative inline-block focus:outline-none focus:ring"
          >
            <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-blue-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
            <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
              <div className="flex items-center gap-2">
                <Home size={18} />
                Go Home
              </div>
            </span>
          </Link>
        </button>
      </div>
    );
  };
  
  export default NotFound;