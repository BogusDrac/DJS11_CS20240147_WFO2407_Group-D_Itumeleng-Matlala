import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchShowDetails } from "../api/podcastApi";


/**
 * SeasonDetails Component
 * Displays the details of a specific season of a podcast, including a list of episodes.
 * 
 * @returns {JSX.Element} -component for displaying season details.
 */

const SeasonDetails = () => {
    // Extracting the dynamic URL parameters using useParams.
    const {Id: podcastId, seasonId} = useParams()

    const [show, setShow] = useState(null) // state holds the fetched podcats details.
    const [selectedSeason, setSelectedSeason] = useState(null) // Holds the details of the selected season.


   /**
     * useEffect 
     * Fetches podcast details and sets the state for the show and selected season.
     * 
     * Dependencies: podcastId, seasonId (updates the state whenever these values change).
     */
    useEffect(() => {
        const fetchDetails = async() => {
            try {
                const data = await fetchShowDetails(Number(podcastId)) // Fetch podcast details based on podcastId ehich is converted to a number
                setShow(data) // Updating the show state with the fetched data.


                // Find and set the specific season based on seasonId.
                const season = data.seasons.find(
                    season => season.season === Number(seasonId)
                )
                setSelectedSeason(season) // Updating the selectedSeason state with seasonId
            } catch (error) {
                console.error('Error fetching show details:', error) //Logging any errors encountered during fetvhing data.
            }
        }

        fetchDetails() // calling the fetchDetails function
    }, [podcastId, seasonId]) // Dependency array:  re-run the effect when the 'podcatId and seasonId' change


    // If the podcast or selected season data has not been loaded, show a loading message.
    if (!show || !selectedSeason) {
        return (
        <div className="text-center m-10">
           <h1 className="text-6xl text-blue-500">Loading season details...</h1>
        </div>
        );
    }


    return (
        <div className="container mx-auto p-4">
            <div className="flex space-x-2">
                {/* Link to navigate back to the podcast details page */}
                <Link to={`/podcasts/${podcastId}`}>
                    <button className="bg-gray-600 hover:bg-blue-600 p-2 rounded-md text-white">
                    Back to Show
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default SeasonDetails;