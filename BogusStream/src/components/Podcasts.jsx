import { useState, useEffect } from "react";
import { fetchPreviews } from "../api/podcastApi";
import { Link } from "react-router-dom";

const Podcasts = () => {
    const [podcasts, setPodcasts] = useState([]);
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState('alphabetical'); // Default sort option

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchPreviews();
                const sortedData = sortPodcasts([...data], sortOption);
                setPodcasts(sortedData);
            } catch (error) {
                setError(error.message);
            }
        };

        getData();
    }, [sortOption]);

    const sortPodcasts = (podcasts, option) => {
        if (option === 'alphabetical') {
            return podcasts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (option === 'reverse-alphabetical') {
            return podcasts.sort((a, b) => b.title.localeCompare(a.title));
        } else if (option === 'recently-updated') {
            return podcasts.sort((a, b) => new Date(b.updated) - new Date(a.updated));
        } else if (option === 'least-recently-updated') {
            return podcasts.sort((a, b) => new Date(a.updated) - new Date(b.updated));
        }
        return podcasts;
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <p className="text-red-500 text-lg">Error: {error}</p>
            </div>
        );
    }

    if (!podcasts.length) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <p className="text-6xl text-blue-500">Loading Podcasts...</p>
            </div>
        );
    }

    const podcastElements = podcasts.map(podcast => (
        <div key={podcast.id} className="bg-gray-600 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Link to={`/podcasts/${podcast.id}`}>
                <img
                    src={podcast.image}
                    alt={podcast.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-center text-blue-500 mb-2">{podcast.title}</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                    {Array.isArray(podcast.genres) ? (
                        podcast.genres.map((genre, index) => (
                            <span
                                key={index}
                                className="text-sm text-gray-600  bg-blue-100 px-2 py-1 rounded-full"
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
                    className="px-4 py-2 bg-blue-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    <option value="alphabetical">Alphabetical (A-Z)</option>
                    <option value="reverse-alphabetical">Reverse Alphabetical (Z-A)</option>
                    <option value="recently-updated">Recently Updated</option>
                    <option value="least-recently-updated">Least Recently Updated</option>
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {podcastElements}
            </div>
        </div>
    );
};

export default Podcasts;
