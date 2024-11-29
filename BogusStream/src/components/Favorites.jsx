import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



/**
 * Favorites Component
 * Displays the user's favorite podcast episodes, allows sorting, and supports removing episodes.
 * @returns {JSX.Element} - The rendered Favorites component.
 */
const Favorites = () => {
   /**
     * @typedef {Object} Episode
     * @property {number} id - Unique identifier of the episode.
     * @property {number} podcastId - ID of the podcast the episode belongs to.
     * @property {number} seasonNumber - The season number of the episode.
     * @property {string} title - Title of the episode.
     * @property {string} addedAt - Timestamp when the episode was added to favorites.
     */

   /**
   * useState hook to manage the list of favorite episodes.
   * @type {[Episode[], Function]} Favorites - State to hold the user's favorite episodes.
   */
  const [favorites, setFavorites] = useState([]);

  /**
   * useState hook to manage the selected sort method for displaying favorites.
   * @type {[string, Function]} sortMethod - State to manage sorting of episodes.
   */
  const [sortMethod, setSortMethod] = useState('title'); 



  /**
   * useEffect hook to load the favorites list from localStorage when the component mounts.
   * Dependencies: Empty array [] ensures it runs only once after the component mounts.
   */
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('podcastFavorites')) || [];
    setFavorites(storedFavorites); // Update the favorites state with the stored data from fetched favorite
  }, []);


  /**
   * Removes a specific episode from the list of favorites.
   * @param {number} episodeId - The ID of the episode to remove.
   * @param {number} podcastId - The ID of the podcast the episode belongs to.
   * @param {number} seasonNumber - The season number of the episode to remove.
   */
  const removeFromFavorites = (episodeId, podcastId, seasonNumber) => {
    const updatedFavorites = favorites.filter(
      fav => !(fav.id === episodeId && 
               fav.podcastId === podcastId && 
               fav.seasonNumber === seasonNumber) // Check if the episode to remove matches any in the favorites list
    );

    setFavorites(updatedFavorites); // Update the favorites state with the updated list after removal
    localStorage.setItem('podcastFavorites', JSON.stringify(updatedFavorites)); // Save the updated list to localStorage
  }


  /**
   * Sorts the list of favorites based on the selected method.
   * @param {string} method - The sorting method ('recent', 'oldest', 'az', 'za').
   */
  const sortFavorites = (method) => {
    let sortedFavorites = [...favorites];

    switch (method) {
      case 'az':
        sortedFavorites.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title in alphabetical order
        break;
      case 'za':
        sortedFavorites.sort((a, b) => b.title.localeCompare(a.title)); //  Sort by title in reverse alphabetical order
        break;
      case 'recent':
        sortedFavorites.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt)); // Sort by (added At) in descending order (newest first)
        break;
      case 'oldest':
        sortedFavorites.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt)); // Sort by (added At) in ascending order (oldest first)
        break;
    }

    setFavorites(sortedFavorites); // Update state with the sorted favorites.
    setSortMethod(method); // Update the selected sorting method.
  };

  /**
   * Clears all favorites from the list and localStorage.
   * Displays a confirmation prompt before clearing.
   */
  const resetFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      localStorage.removeItem('podcastFavorites'); // Remove favorites from localStorage.
      setFavorites([]); // Clear the state.
    }
  };

  /**
   * Groups the favorites by podcast ID and season number for easier display.
   * @returns {Object} An object where the key is a combination of podcastId and seasonNumber,
   * and the value is an object containing grouped episodes.
   */
  const groupedFavorites = favorites.reduce((acc, episode) => {
    const key = `${episode.podcastId}-${episode.seasonNumber}`; // key is a combination of podcastId and seasonNumber


    // if the key doesn't exist in the accumulator, create a new object with the key and the episode
    if (!acc[key]) {
      acc[key] = {
        podcastId: episode.podcastId,
        seasonNumber: episode.seasonNumber,
        episodes: []
      };
    }
    acc[key].episodes.push(episode); // add the episode to the array of episodes for the key
    return acc;
  }, {}); 

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-600">My Favorites</h1>
        <div className="flex space-x-2">
          {/* Dropdown for selecting the sort method */}
          <select
            value={sortMethod}
            onChange={(e) => sortFavorites(e.target.value)} // Update the sort method when the user selects a new one
            className="p-2 bg-gray-700 text-white rounded"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
          <button
            onClick={resetFavorites} // resets the favorites when clicked
            className="bg-red-600 hover:bg-red-700 p-2 rounded-md text-white"
          >
            Clear Favorites
          </button>
        </div>
      </div>

      {/* Conditional rendering: Show a message if there are no favorites */}
      {/* if there are no favorites, show a message saying so, else show the grouped favorites */}
      {Object.keys(groupedFavorites).length === 0 ? (
        <div className="text-center text-gray-500">
          No favorite episodes yet. Start exploring podcasts!
        </div>
      ) : (
        Object.values(groupedFavorites).map((group) => (
          <div
            key={`${group.podcastId}-${group.seasonNumber}`}
            className="mb-6 p-4 bg-gray-800 rounded shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2">
               Season: {group.seasonNumber}
            </h2>
            {group.episodes.map((episode) => (
              <div
                key={episode.id}
                className="flex justify-between items-center bg-gray-700 p-3 rounded-lg mb-2"
              >
                <Link
                  to={`/podcasts/${episode.podcastId}`}> {/*  Link to the podcast page when clicked */}
                  <div>
                    <h3 className="font-bold">{episode.title}</h3>
                    <p className="text-sm text-gray-400">Added on: {new Date(episode.addedAt).toLocaleString()}</p>
                  </div>
                </Link>
                


                <button
                  onClick={() => removeFromFavorites(episode.id, episode.podcastId, episode.seasonNumber)} // Remove the episode from favorites when clicked
                  className="bg-red-600 hover:bg-red-700 p-2 rounded-md text-white"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;