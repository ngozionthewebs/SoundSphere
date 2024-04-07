import { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';

const useAuthToken = () => {
  const [accessToken, setAccessToken] = useState('');
  const [expiresAt, setExpiresAt] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (new Date() < new Date(expiresAt)) {
        // If the current time is less than the expiry time, don't fetch a new token
        return;
      }

      const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
      const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
      const authString = `${client_id}:${client_secret}`;
      const data = qs.stringify({ 'grant_type': 'client_credentials' });
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(authString)}`
      };

      try {
        const response = await axios.post('https://accounts.spotify.com/api/token', data, { headers });
        const newAccessToken = response.data.access_token; // Store the new token
        const expiresIn = response.data.expires_in;
        setAccessToken(newAccessToken); // Update state with the new token
        setExpiresAt(new Date().getTime() + expiresIn * 1000); // Set the expiry time for the token
        console.log("New access token:", newAccessToken); // Log the new token
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchData();
  }, [expiresAt]);

  return accessToken;
};

export default useAuthToken;
