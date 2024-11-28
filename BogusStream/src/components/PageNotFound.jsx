import { Link } from "react-router-dom"
import { Home } from "lucide-react"


/**
 * NotFound Component
 * 
 * This component renders a "404 Page Not Found" error page. 
 * It includes a large"404" display, a text box indicating the page is not found, and a button to navigate back to the homepage.
 * 
 * @returns {JSX.Element}  
 */
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
            {/* Hover and active state transition effects for button */}
            <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-blue-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

            {/* Styling for the button, including hover and active effects */}
            <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
              
              {/* Home icon and button text */}
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