/**
 * Base URL for the podcast API.
 * @constant {string}
 */
export const URL = 'https://podcast-api.netlify.app/';


/**
 * Handles fetch errors by checking the response status.
 * If the response is not OK, it throws an error with the status and response text.
 * 
 * @async
 * @param {Response} response - The fetch response object.
 * @returns {Promise<Response>} - Returns the response if it is OK.
 * @throws {Error} - Throws an error if the response status is not OK.
 */
const handleFetchErrors = async (response) => {
  // Check if the response is OK 
  if (!response.ok) {
    const errorText = await response.text(); // Get the response text to include in the error message
    throw new Error(`Error ${response.status}: ${errorText}`); // Throw an error with the status and response text
  }
  return response; // Return the response if no errors
};



/**
 * Fetches a list of podcast previews from the API.
 * 
 * @async
 * @returns {Promise<Object[]>} - A promise that resolves to an array of podcast preview objects.
 * @throws {Error} - Throws an error if the fetch request fails.
 */
export const fetchPreviews = async () => {
  // Construct the API URL for the podcast previews endpoint
  try {
    const response = await fetch(URL); // Fetch data from the base URL
    await handleFetchErrors(response); // Handle any fetch errors
    return response.json(); // Parse the response as JSON data
  } catch (error) {
    console.error('Error fetching previews:', error.message); // Log the error message
    throw error; // Rethrow the error for further handling
  }
};



/**
 * Fetches detailed information about a specific podcast show by its ID.
 * 
 * @async
 * @param {number} id - The ID of the podcast show.
 * @returns {Promise<Object>} - A promise that resolves to the show details object.
 * @throws {Error} - Throws an error if the fetch request fails or if the ID is invalid.
 */
export const fetchShowDetails = async (id) => {
  // Construct the API URL for the podcast show details endpoint
  if (!id || typeof id !== 'number') {
    throw new Error('Invalid or missing ID for show details.'); // Throw an error if the ID is invalid
  }
  try {
    const response = await fetch(`${URL}id/${id}`); // Fetch data for the specific show by ID
    await handleFetchErrors(response); // Handle any fetch errors
    return response.json(); // Parse the response as JSON data
  } catch (error) {
    console.error(`Error fetching details for show ID ${id}:`, error.message); // Log error message to console
    throw error; // Rethrow the error for further handling
  }
};



/**
 * Fetches detailed information about a specific genre by its ID.
 * 
 * @async
 * @param {number} id - The ID of the genre.
 * @returns {Promise<Object>} - A promise that resolves to the genre details object.
 * @throws {Error} - Throws an error if the fetch request fails or if the ID is invalid.
 */
export const fetchGenreDetails = async (id) => {
  // Construct the API URL for the podcast genre details endpoint
  if (!id || typeof id !== 'number') {
    throw new Error('Invalid or missing ID for genre details.'); // Throw an error if the ID is invalid
  }
  try {
    const response = await fetch(`${URL}genre/${id}`); // Fetch data for the specific genre by ID
    await handleFetchErrors(response); // Handle any fetch errors
    return response.json(); // Parse the response as JSON data
  } catch (error) {
    console.error(`Error fetching details for genre ID ${id}:`, error.message); // Log error message to console
    throw error; // Rethrow the error for further handling
  }
};

