import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Navbar from './components/Navbar';
import PageNotFound from "./components/PageNotFound"
import Footer from './components/Footer';
import Podcasts from './components/Podcasts';
import PodcastDetails from './components/PodcastDetails';




const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<h1>Hello</h1>} />
        <Route path='/podcasts' element={<Podcasts />} />
        <Route path='/podcasts/:id' element={<PodcastDetails />} />
        <Route path='/podcasts/:id/season/:id' element={<h1>Season Details</h1>} />       
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
