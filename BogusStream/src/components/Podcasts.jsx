import { useState, useEffect } from "react";
import { fetchPreviews } from "../api/podcastApi";
import { Link } from "react-router-dom";

// A mapping from genre IDs to their human-readable titles.
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
 * Podcasts Component
 * 
 * Fetches and displays a list of podcasts, allowing users to sort them by various criteria.
 * 
 * @component
 * @returns {JSX.Element} The Podcasts component JSX.
 */
const Podcasts = () => {
    const [podcasts, setPodcasts] = useState([]); // State to store the List of podcast previews.
    const [error, setError] = useState(null); // State to store Error message if data fetching fails.
    const [sortOption, setSortOption] = useState('alphabetical'); // State to store default srt options


    /**
     * useEffect Hook
     * Fetches podcast previews from the API when the component mounts or the sort option changes.
     * Re-runs whenever the 'sortOption' state changes.
     */
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchPreviews(); // Fetch podcast data from the API.
                const sortedData = sortPodcasts([...data], sortOption); // Sort data based on selected option.
                setPodcasts(sortedData); // Update state with sorted data.
            } catch (error) {
                setError(error.message); // Update state with error message if fetching fails.
            }
        };

        getData(); // Trigger the data fetching function.
    }, [sortOption]); // Dependency array: Re-run the effect when 'sortOption' changes.


    /**
     * sortPodcasts Function
     * 
     * @param {Array} podcasts - Array of podcast objects to be sorted.
     * @param {string} option - Sorting criteria.
     * @returns {Array} Sorted array of podcasts.
     */
    const sortPodcasts = (podcasts, option) => {
        if (option === 'alphabetical') {
            return podcasts.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title in alphabetical order.
        } else if (option === 'reverse-alphabetical') {
            return podcasts.sort((a, b) => b.title.localeCompare(a.title)); // Sort by title in reverse alphabetical order.
        } else if (option === 'recently-updated') {
            return podcasts.sort((a, b) => new Date(b.updated) - new Date(a.updated)); // Sort by updated date in descending order.
        } else if (option === 'least-recently-updated') {
            return podcasts.sort((a, b) => new Date(a.updated) - new Date(b.updated)); // Sort by updated date in ascending order.
        }
        return podcasts; // Return unsorted if no valid option is selected.
    };


    /**
     * handleSortChange Function
     * Updates the sorting option based on user selection.
     * 
     * @param {Event} event - The change event from the select input.
     */
    const handleSortChange = (event) => {
        setSortOption(event.target.value); // Update sort option based on user input.
    };


    // If an error occurs during data fetching, display an error message.
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <p className="text-red-500 text-lg">Error: {error}</p>
            </div>
        );
    }


    // If the podcast data is still being loaded, show a loading message.
    if (!podcasts.length) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <p className="text-6xl text-blue-500">Loading Podcasts...</p>
            </div>
        );
    }



    /**
     * podcastElements Maps over the 'podcasts' array and returns a list of JSX elements for each podcast.
     */
    const podcastElements = podcasts.map(podcast => (
        <div key={podcast.id} className="bg-gray-600 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">

            {/* Navigate to podcast details page. */}
            <Link to={`/podcasts/${podcast.id}`}>
                <img
                    src={podcast.image} // Display podcast cover image.
                    alt={podcast.title} // Image alt text for accessibility.
                    className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-center text-blue-500 mb-2">{podcast.title}</h3>
                <div className="flex flex-wrap gap-2 justify-center">

                    {/** 
                     * Render the genres for the podcast.
                     * If 'podcast.genres' is an array, map over it to display multiple genres.
                     * Otherwise, display a single genre.
                     */}
                    {Array.isArray(podcast.genres) ? (
                        podcast.genres.map((genre, index) => (
                            <span
                                key={index}
                                className="text-sm text-gray-600 bg-blue-100 px-2 py-1 rounded-full"
                            >
                                {genreIdToTitle[genre] || genre}
                            </span>
                        ))
                    ) : (

                        
                        <span className="text-sm text-gray-600">
                            {/* Display genre title or fallback */}
                            {genreIdToTitle[podcast.genre] || podcast.genre} 
                        </span>
                    )}
                </div>

                {/** Display number of seasons*/}
                {podcast.seasons && (
                    <p className="text-sm text-blue-700 text-center mt-2">
                        {podcast.seasons.length} {podcast.seasons.length === 1 ? 'Season' : 'Seasons'}
                    </p>
                )}
                {/** Display the last updated date of the podcast. */}
                {podcast.updated && (
                    <p className="text-xs text-blue-500 text-center mt-1">
                        Updated: {new Date(podcast.updated).toLocaleDateString()}
                    </p>
                )}
            </Link>
        </div>
    ));

    return (
        <div className="bg-transparent container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-7">
                <h1 className="text-4xl md:text-6xl text-gray-500">
                    Podcasts
                </h1>
                <select
                    value={sortOption}
                    onChange={handleSortChange}
                     // handleSortChange function is to update the sortOption state when the select option is changed
                    className="px-4 py-2 bg-gray-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    <option value="alphabetical">Alphabetical (A-Z)</option>
                    <option value="reverse-alphabetical">Reverse Alphabetical (Z-A)</option>
                    <option value="recently-updated">Recently Updated</option>
                    <option value="least-recently-updated">Least Recently Updated</option>
                </select>
            </div>

            {/* Render the list of podcast elements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {podcastElements}
            </div>
        </div>
    );
};

export default Podcasts;
