import { useState, useEffect } from 'react';
import { fetchPreviews } from '../api/podcastApi';



const genreIdToTitle = {
  1: 'Personal Growth',
  2: 'Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family'
};

const Home = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchAndProcessPodcasts = async () => {
      try {
        const fetchedPodcasts = await fetchPreviews();

        
        const updatedPodcasts = fetchedPodcasts.map((podcast) => ({
          ...podcast,
          genres: Array.isArray(podcast.genres)
            ? podcast.genres.map((genreId) => genreIdToTitle[genreId] || genreId)
            : [genreIdToTitle[podcast.genre] || podcast.genre]
        }));

        setPodcasts(updatedPodcasts);

        
        const extractedGenres = [
          ...new Set(
            updatedPodcasts.flatMap((podcast) => podcast.genres).filter(Boolean)
          )
        ];
        setUniqueGenres(extractedGenres);

        setLoading(false); 
      } catch (error) {
        console.error('Error fetching podcasts:', error);
        setError('Failed to fetch podcasts');
        setLoading(false); 
      }
    };

    fetchAndProcessPodcasts();
  }, []);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    const filtered = podcasts.filter((podcast) =>
      Array.isArray(podcast.genres)
        ? podcast.genres.includes(genre)
        : podcast.genre === genre
    );
    setFilteredPodcasts(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      hello
    </div>
  );
};

export default Home;
