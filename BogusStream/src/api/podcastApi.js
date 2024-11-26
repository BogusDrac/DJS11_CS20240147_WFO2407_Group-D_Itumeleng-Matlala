const URL = 'https://podcast-api.netlify.app/';

const handleFetchErrors = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }
  return response;
};

export const fetchPreviews = async () => {
  try {
    const response = await fetch(URL);
    await handleFetchErrors(response);
    return response.json();
  } catch (error) {
    console.error('Error fetching previews:', error.message);
    throw error;
  }
};

export const fetchShowDetails = async (id) => {
  if (!id || typeof id !== 'number') {
    throw new Error('Invalid or missing ID for show details.');
  }
  try {
    const response = await fetch(`${URL}id/${id}`);
    await handleFetchErrors(response);
    return response.json();
  } catch (error) {
    console.error(`Error fetching details for show ID ${id}:`, error.message);
    throw error;
  }
};

export const fetchGenreDetails = async (id) => {
  if (!id || typeof id !== 'number') {
    throw new Error('Invalid or missing ID for genre details.');
  }
  try {
    const response = await fetch(`${URL}genre/${id}`);
    await handleFetchErrors(response);
    return response.json();
  } catch (error) {
    console.error(`Error fetching details for genre ID ${id}:`, error.message);
    throw error;
  }
};

