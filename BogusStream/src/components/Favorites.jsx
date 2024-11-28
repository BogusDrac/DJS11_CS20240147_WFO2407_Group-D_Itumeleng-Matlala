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


  return (
    <>
    <div className="container">hello</div>
    </>
  )

}

export default Favorites;