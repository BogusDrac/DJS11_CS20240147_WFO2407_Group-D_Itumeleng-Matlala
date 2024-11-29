import { useState, useEffect } from 'react';
import { fetchPreviews } from '../api/podcastApi';
import { Link } from 'react-router-dom';


/**
 * Mapping of genre IDs to their respective titles.
 * @constant {Object<number, string>}
 */
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


/**
 * Home Component
 * 
 * This component displays a list of podcast previews and allows users
 * to filter podcasts by genre.
 * Each Podcast Preview component is a link to the podcast's detail page
 * 
 * @component
 * @returns {JSX.Element} - The rendered Home component.
 */
const Home = () => {
  const [podcasts, setPodcasts] = useState([]); // State to store the list of podcasts
  const [filteredPodcasts, setFilteredPodcasts] = useState([]); // state to store the filtered list of podcasts
  const [uniqueGenres, setUniqueGenres] = useState([]); // State to store the unique genres
  const [selectedGenre, setSelectedGenre] = useState(null); // State to store the selected genre
  const [error, setError] = useState(null); // state to store any error messages
  const [loading, setLoading] = useState(true); // State to store the loading status


  /**
     * useEffect Hook
     * Fetches podcast previews from the API when the component mounts 

     */
  useEffect(() => {
    const fetchAndProcessPodcasts = async () => {
      // Fetch the podcast previews from the API
      try {
        const fetchedPodcasts = await fetchPreviews(); // fetch the podcasts from the API

        // Process the fetched podcasts to extract the required information
        const updatedPodcasts = fetchedPodcasts.map((podcast) => ({
          ...podcast, // Spread the original podcast object
          genres: Array.isArray(podcast.genres) // Check if the genres is an array
            ? podcast.genres.map((genreId) => genreIdToTitle[genreId] || genreId) // Map the genre IDs to their corresponding titles
            : [genreIdToTitle[podcast.genre] || podcast.genre] // If not an array, use the genre ID as the title
        }));

        setPodcasts(updatedPodcasts); // Update the state with the processed podcasts


        // Get the unique genres from the processed podcasts
        const extractedGenres = [
          ...new Set( 
            updatedPodcasts.flatMap((podcast) => podcast.genres).filter(Boolean)
          ) // Use flatMap to flatten the array of genres and filter out any falsy values
        ];

        setUniqueGenres(extractedGenres); // Update the state with the unique genres

        setLoading(false); // Set the loading status to false
      } catch (error) {
        console.error('Error fetching podcasts:', error); // Log any errors
        setError('Failed to fetch podcasts'); // Set error message
        setLoading(false); // Set the loading status to false
      }
    };

    fetchAndProcessPodcasts(); // call the function to fetch and process the podcasts
  }, []);


  /**
   * Handles genre selection and filters podcasts based on the selected genre.
   * @param {string} genre - The selected genre.
   */
  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre); // Update the selected genre state
    const filtered = podcasts.filter((podcast) =>
      Array.isArray(podcast.genres) 
        ? podcast.genres.includes(genre) // Check if the podcast's genres include the selected genre
        : podcast.genre === genre // If not an array, check if the podcast's genre matches the selected genre
    );
    setFilteredPodcasts(filtered); // Update the filtered podcasts state
  };

  return (
    <div className="container mx-auto p-4">


      {/* Home page header */}
        <h1 className="m-10 text-gray-800 text-center text-4xl font-bold">
          Your ultimate destination for podcasts. Discover, listen, and enjoy your favorite shows.
        </h1>


      {/* if Loading is true, display a loading message else display the genre buttons */}
      {loading ? (
        <h1 className=" m-10 text-center text-6xl text-blue-500">Loading Podcasts...</h1> // Simple loading message
      ) : (
        <>
        {/* mapping through the podcasts array and displaying each podcast */}
          <div className="genre-buttons flex flex-wrap justify-center mb-6">
            {uniqueGenres.map((genre, index) => (
              // buttons for each genre that will propmpt the filter podcasts
              <button
                key={index}
                onClick={() => handleGenreSelect(genre)} /* handleGenreSelect function is called when button is clicked */
                className={`m-1 py-2 px-4 rounded-md 
                  ${selectedGenre === genre
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-500 text-white hover:bg-blue-500'}`}
              >
                {genre}
              </button>
            ))}
          </div>



          {/* Displaying error message if there is an error fetching podcasts */}
          {error && (
            <div className="text-red-500 text-center mb-4">
              {error}
            </div>
          )}


          {/* Displaying the filtered podcasts when the user selects a genre */}
          {/* if the filter array is empty , display a message saying no podcasts found 
          else map through the filter array and display each podcast */}
          {selectedGenre && (
            <div className="podcasts-list">
              <h2 className="text-3xl text-gray-600 font-bold mb-4">
                {selectedGenre}
              </h2>
              {/* checking if there are any podcasts in the filtered array */}
              {filteredPodcasts.length === 0 ? (
                <p className="text-center text-gray-500">
                  No podcasts found for this genre.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* mapping through the filtered array and displaying each podcast */}
                  {filteredPodcasts.map((podcast) => (
                    <div
                      key={podcast.id}
                      className="bg-gray-600 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      {/* Link to podcast details page  if user clicks on the podcast */}
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
                          {/* array  */}
                          {Array.isArray(podcast.genres) ? (
                            /* mapping through the genres array and displaying each genre */
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
                            Updated: {new Date(podcast.updated).toLocaleDateString()} {/* formating the date */}
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
