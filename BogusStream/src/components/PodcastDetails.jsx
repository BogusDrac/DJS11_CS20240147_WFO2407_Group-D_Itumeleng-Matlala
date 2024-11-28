import { useState, useEffect } from 'react';
import { fetchShowDetails } from '../api/podcastApi';
import { useParams, Link } from 'react-router-dom';


/**
 * PodcastDetails Component
 * This component displays information about a podcast, its title and description.
 * and a list of seasons as buttons to link to 'SeasonDetails' route. 
 * It fetches the podcast details based on the podcast `id` from the URL.
 * 
 * @returns {JSX.Element} The PodcastDetails component JSX.
 */
const PodcastDetails = () => {
  const { id } = useParams();  // Extract podcastId from URL
  const [show, setShow] = useState(null); // State to store podcast details
  const [error, setError] = useState(null); // State to store error messages

  /**
   * The effect runs when the component mounts or the 'id' parameter changes.
   * It fetches podcast details from the API and updates the 'show' state with the data
   * 
   * 
   */
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Convert 'id' to a number and fetch the podcast from the API
        const data = await fetchShowDetails(Number(id));  // Fetch podcast details using id
        setShow(data); //Updated state with fetched podcast data
      } catch (error) {
        // If an error occurs, update the error state to display an error message.
        setError('Failed to fetch show details. Please try again.', error);
      }
    };

    fetchDetails(); // Call the function to fetch podcast details.
  }, [id]); //Dependency array: re-run the effect when the 'id' changes.


  // If an error occurs during data fetching, display the error message to the user.
  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }


  // If the podcast data is still being loaded, show a loading message.
  if (!show) {
    return (
      <div className="text-center mt-8 text-lg mb-10">
        <h1 className="text-6xl text-blue-500">Loading show details...</h1>
      </div>
    );
  }


  // Rendering the podcast details once the data is successfully loaded.
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end">

        {/* Back Button */}
        <Link to="/podcasts">
          <button className="bg-gray-600 hover:bg-blue-600 p-1 rounded-md text-white font-medium">
            Back
          </button>
        </Link>
      </div>

      {/* PodcastbTitle and Description */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{show.title}</h1>
        <p className="mt-2 leading-7">{show.description}</p>
      </div>

      {/* Season Selection */}
      <div className="flex mb-4 flex-wrap gap-5">
        {/** 
         * Render a button for each season. 
         * - `season.id` is used as the `key` to ensure each child element in the list is unique.
         * - The `to` prop creates a URL that includes the podcast `id` and the specific `season` number.
         */}
        {show.seasons.map((season) => (
          <Link key={season.id} to={`/podcasts/${id}/season/${season.season}`}>
            {/** 
             * Render a button for each season. 
             * - `season.id` is used as the `key` to ensure each child element in the list is unique.
             * - The `to` prop creates a URL that includes the podcast `id` and the specific `season` number.
             */}
            <button className="mr-2 p-2 rounded bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white">
              {season.title}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PodcastDetails;
