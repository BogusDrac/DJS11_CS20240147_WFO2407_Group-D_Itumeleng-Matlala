import { useState, useEffect } from 'react';
import { fetchPreviews } from '../api/podcastApi';
import { Link } from 'react-router-dom';


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
        <h1 className="m-10 text-gray-800 text-center text-4xl font-bold">Your ultimate destination for podcasts. Discover, listen, and enjoy your favorite shows.</h1>
      {loading ? (
        <h1 className=" m-10 text-center text-6xl text-blue-500">Loading Podcasts...</h1> // Simple loading message
      ) : (
        <>
          <div className="genre-buttons flex flex-wrap justify-center mb-6">
            {uniqueGenres.map((genre, index) => (
              <button
                key={index}
                onClick={() => handleGenreSelect(genre)}
                className={`m-1 py-2 px-4 rounded-md 
                  ${selectedGenre === genre
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-500 text-white hover:bg-blue-500'}`}
              >
                {genre}
              </button>
            ))}
          </div>

          {error && (
            <div className="text-red-500 text-center mb-4">
              {error}
            </div>
          )}

          {selectedGenre && (
            <div className="podcasts-list">
              <h2 className="text-2xl font-bold mb-4">
                Podcasts in {selectedGenre}
              </h2>
              {filteredPodcasts.length === 0 ? (
                <p className="text-center text-gray-500">
                  No podcasts found for this genre.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPodcasts.map((podcast) => (
                    <div
                      key={podcast.id}
                      className="bg-gray-600 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <Link to={`/podcasts/${podcast.id}`}>
                        <img
                          src={podcast.image}
                          alt={podcast.title}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-lg font-semibold text-center text-blue-500 mb-2">
                          {podcast.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {Array.isArray(podcast.genres) ? (
                            podcast.genres.map((genre, index) => (
                              <span
                                key={index}
                                className="text-sm text-gray-600 bg-blue-100 px-2 py-1 rounded-full"
                              >
                                {genre}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-gray-600">
                              {podcast.genre}
                            </span>
                          )}
                        </div>
                        {podcast.seasons && (
                          <p className="text-sm text-blue-700 text-center mt-2">
                            {podcast.seasons.length} {podcast.seasons.length === 1 ? 'Season' : 'Seasons'}
                          </p>
                        )}
                        {podcast.updated && (
                          <p className="text-xs text-blue-500 text-center mt-1">
                            Updated: {new Date(podcast.updated).toLocaleDateString()}
                          </p>
                        )}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
