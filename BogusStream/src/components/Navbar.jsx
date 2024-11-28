import { Link } from "react-router-dom";
import { Home, Heart,Play } from "lucide-react";


/**
 * Navbar Component
 * 
 * This component renders a navigation bar with links to different
 * routes of the application.
 * It includes the logo icons, link styling, and basic layout using Tailwind CSS classes.
 * using lucide-react icons
 * @returns {JSX.Element} 
 */
const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between">


        {/* logo */}
        <div>
          <h1 className="text-white font-bold text-3xl">Bogus Stream</h1>
        </div>
        <div className="flex gap-5">
          {/* Link to the home page */}
          <Link 
            to="/"
            className=" text-white p-2 rounded flex gap-1 hover:font-bold hover:text-blue-400"
          >
            <Home /> Home   
          </Link>

          {/* Link to the podcasts page */}
          <Link
            to="/podcasts"
            className=" text-white p-2 rounded flex gap-1 hover:font-bold hover:text-blue-400"
            >
                <Play />Podcasts
          </Link>

          {/* Link to the favorites page */}
          <Link 
            to="/favorites"
            className=" text-white p-2 rounded flex gap-1 hover:font-bold hover:text-blue-400"
          >
            <Heart />Favorites
          </Link>
        </div>
      </nav>
  );
}

export default Navbar;
