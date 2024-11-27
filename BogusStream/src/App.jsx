import { BrowserRouter, Routes, Route, Link } from 'react-router-dom' 
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
        <Route path='/podcasts/:id/season/:id' element={<Link to="/podcasts">Back</Link> } />       
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
