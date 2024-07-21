import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

/**
 * Custom hook to fetch data with retry logic and exponential backoff.
 *
 * @param {Object} config - Axios request configuration object.
 * @param {Array} dependencies - Array of dependencies that trigger the fetch.
 * @param {number} [initialDelay=10000] - Initial delay in milliseconds before the first retry.
 * @param {number} [maxRetries=5] - Maximum number of retry attempts.
 * @returns {Object|null} - The fetched data or null if the request fails after all retries.
 *
 * @example
 * const config = {
 *   method: 'get', // 'post', 'put', 'delete', etc.
 *   url: 'https://assettrack.com.ng/api/State',
 *   // data: {}, // Add this for post/put requests
 * };
 *
 * const data = useFetchWithRetry(config, [endpoint, queryParams]);
 */
const useFetchWithRetry = (
  config,
  dependencies = [],
  initialDelay = 10000,
  maxRetries = 5,
) => {
  const [data, setData] = useState(null)
  const [retryCount, setRetryCount] = useState(0)
  const [delay, setDelay] = useState(initialDelay)

  useEffect(() => {
    let ignore = false
    const fetchData = async () => {
      try {
        const response = await axios(config)
        !ignore && setData(response.data)
      } catch (error) {
        console.log('Error fetching data')
        if (retryCount < maxRetries) {
          setRetryCount(prevCount => prevCount + 1)
          setTimeout(fetchData, delay)
          setDelay(prevDelay => prevDelay * 2) // Exponential backoff
        }
      }
    }
    if (dependencies?.every(dep => Boolean(dep) !== false)) {
      console.log({ dependencies })
      fetchData()
    }

    return () => {
      ignore = true
    }
  }, [delay, retryCount, maxRetries,...dependencies])

  return data
}

export default useFetchWithRetry
