import { useState, useEffect } from 'react';
import { fetchShowDetails } from '../api/podcastApi';
import { useParams, Link } from 'react-router-dom';

const PodcastDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchShowDetails(Number(id));
        setShow(data);
      } catch (error) {
        setError('Failed to fetch show details. Please try again.', error);
      }
    };

    fetchDetails();
  }, [id]);

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  if (!show) {
    return (
      <div className="text-center mt-8 text-lg mb-10">
        <h1 className='text-6xl text-blue-500'>Loading show details...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end">
        <Link to="/podcasts">
          <button className="bg-gray-600 hover:bg-blue-600 p-1 rounded-md text-white  font-medium">
            Back
          </button>
        </Link>
      </div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{show.title}</h1>
        <p className="mt-2 leading-7">{show.description}</p>
      </div>

      {/* Season Selection */}
      <div key={id} className="flex mb-4 flex-wrap gap-5">
        {show.seasons.map((season) => (
          <Link key={season.id} to={`/podcasts/${id}/season/${season.id}`}>
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
