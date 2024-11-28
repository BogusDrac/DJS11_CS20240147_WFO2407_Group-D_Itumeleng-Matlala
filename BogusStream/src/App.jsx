import { BrowserRouter, Routes, Route} from 'react-router-dom' 
import Navbar from './components/Navbar';
import PageNotFound from "./components/PageNotFound"
import Footer from './components/Footer';
import Podcasts from './components/Podcasts';
import PodcastDetails from './components/PodcastDetails';
import Home from './components/Home';
import SeasonDetails from './components/SeasonDetails';
import Favorites from './components/Favorites'




/**
 * App Component
 * Sets up the routing and layout structure of the podcast application.
 * 
 * @returns {JSX.Element} The main App component containing the router and layout.
 */
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/podcasts' element={<Podcasts />} />
        <Route path='/podcasts/:id' element={<PodcastDetails />} />
        <Route path='/podcasts/:Id/season/:seasonId' element={<SeasonDetails /> } />      
        <Route path='/favorites' element={<Favorites />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
