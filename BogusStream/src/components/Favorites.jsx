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
      fav => !(fav.id === episodeId && fav.podcastId === podcastId && fav.seasonNumber === seasonNumber)
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
        sortedFavorites.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title A-Z.
        break;
      case 'za':
        sortedFavorites.sort((a, b) => b.title.localeCompare(a.title)); // Sort by title Z-A.
        break;
      case 'recent':
        sortedFavorites.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt)); // Sort by most recent.
        break;
      case 'oldest':
        sortedFavorites.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt)); // Sort by oldest.
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
    const key = `${episode.podcastId}-${episode.seasonNumber}`;
    if (!acc[key]) {
      acc[key] = {
        podcastId: episode.podcastId,
        seasonNumber: episode.seasonNumber,
        episodes: []
      };
    }
    acc[key].episodes.push(episode);
    return acc;
  }, {});

  return (
    <>
    <div className="container">hello</div>
    </>
  )

}

export default Favorites;