import { Mail} from 'lucide-react';
import { Link } from 'react-router-dom';



/**
 * Footer Component
 * 
 * This component renders the footer of the website.
 * It contains sections for information about the website, quick navigation links, and ways to connect with me.
 * 
 * @returns {JSX.Element} - The JSX element representing the footer.
 */
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About BogusStream</h3>
            <p>Your ultimate destination for podcasts. Discover, listen, and enjoy your favorite shows.</p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link to="/favorites" className="hover:text-blue-400">Favorites</Link></li>
              <li><Link to="/podcasts" className="hover:text-blue-400">Podcasts</Link></li>
            </ul>
          </div>

          {/* Connect with Me Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/BogusDrac/Bogusdrac.git" className="hover:text-blue-400">
                GitHub
              </a>
              <a href="mailto:bogusdrac@yahoo.com" className="hover:text-blue-400">
                <Mail size={24} />
              </a>
              <a href="www.linkedin.com/in/itumeleng-matlala-082681186" className="hover:text-blue-400">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p>&copy; 2024 BogusStream. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;