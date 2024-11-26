import { Link } from "react-router-dom";
import { Home, Heart,Play } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between">
        <div>
          <h1 className="text-white font-bold text-3xl">Bogus Stream</h1>
        </div>
        <div className="flex gap-5">
          <Link 
            to="/"
            className=" text-white p-2 rounded flex gap-1 hover:font-bold hover:text-blue-400"
          >
            <Home /> Home   
          </Link>
          <Link
            to="/podcasts"
            className=" text-white p-2 rounded flex gap-1 hover:font-bold hover:text-blue-400"
            >
                <Play />Podcasts
          </Link>
          <Link 
            to="/favourites"
            className=" text-white p-2 rounded flex gap-1 hover:font-bold hover:text-blue-400"
          >
            <Heart />Favourites
          </Link>
        </div>
      </nav>
  );
}

export default Navbar;
