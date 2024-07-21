import axios from 'axios'

/**
 * Function to fetch data with retry logic and exponential backoff.
 *
 * @param {Object} config - Axios request configuration object.
 * @param {number} [initialDelay=10000] - Initial delay in milliseconds before the first retry.
 * @param {number} [maxRetries=5] - Maximum number of retry attempts.
 * @returns {Promise<Object|null>} - The fetched data or null if the request fails after all retries.
 *
 * @example
 * const config = {
 *   method: 'get', // 'post', 'put', 'delete', etc.
 *   url: 'https://assettrack.com.ng/api/State',
 *   // data: {}, // Add this for post/put requests
 * };
 *
 * fetchWithRetry(config)
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 */
const fetchWithRetry = async (config, initialDelay = 10000, maxRetries = 5) => {
  let retryCount = 0
  let delay = initialDelay

  const fetchData = async () => {
    try {
      const response = await axios(config)
      return response.data
    } catch (error) {
      const status = error.response ? error.response.status : null
      const shouldRetry =
        status === null || (status >= 500 && status < 600) || status === 429

      if (shouldRetry && retryCount < maxRetries) {
        retryCount++
        await new Promise(resolve => setTimeout(resolve, delay))
        delay *= 2 // Exponential backoff
        return fetchData()
      } else {
        throw error
      }
    }
  }

  return fetchData()
}

export default fetchWithRetry
