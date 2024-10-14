import React, { useState } from 'react';
import axios from 'axios';
import './homepage.css';
import LineChart from "./Line";
import BarChart from "./Bar";
import PieChart from "./Pie";
import RadarChart from "./Radar";

const Timeline = ({ accessToken }) =>{

    // State for storing artist name, artist data, and top tracks
    const [artistName, setArtistName] = useState('');
    const [artistData, setArtistData] = useState(null);
    const [topTracks, setTopTracks] = useState([]);

      // Function to fetch artist data and their top tracks
      const fetchTopTracks = async (artistId) => {
        const tracksEndpoint = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`;
        try {
          const tracksResponse = await axios.get(tracksEndpoint, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          setTopTracks(tracksResponse.data.tracks);
        } catch (error) {
          console.error('Error fetching top tracks:', error);
        }
      };

    // Function to fetch top tracks by artist ID
    const fetchArtistData = async (artistName) => {
      console.log(`Access Token: ${accessToken}`); 
      if (!accessToken || artistName === '') {
        console.log('Access token is not available or artist name is empty.');
        return;
      }
      const searchEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`;
      try {
        const searchResponse = await axios.get(searchEndpoint, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        console.log('Search Response:', searchResponse.data);
        // Handle the case where no artists are found
        if (searchResponse.data.artists.items.length === 0) {
          console.log('No artists found.');
          setArtistData(null);
          setTopTracks([]);
          return;
        }
        const artist = searchResponse.data.artists.items[0];
        setArtistData(artist);
        await fetchTopTracks(artist.id); // Fetch top tracks after getting artist data
      } catch (error) {
        console.error('Error fetching artist data:', error);
      }
    };
  
  return (  
    <div className="home">
      <div className="header">
        <div className="heading">Timeline</div>
      </div>

      <div className="search" style={{ marginLeft: '40px' }}>
        <div className="info-search">Artist Name</div>
        <div className="search-box">
          <form onSubmit={(e) => { e.preventDefault(); fetchArtistData(artistName); }}> 
            <input type="text" placeholder="Search..."  value={artistName} onChange={(e) => setArtistName(e.target.value)} name="search"  />
            <button type="submit" style={{ borderRadius: '10px', marginLeft: '10px' }}>Search</button>
          </form>
        </div>
      </div>

      <div className="dash">
        <div className="line" style={{paddingRight: '10px', paddingTop:'20px' }}><LineChart topTracks={topTracks}/></div>
        <div className="artist-image" style={{ marginLeft: '910px', marginTop: '-430px', height: '425px', backgroundImage: `url(${artistData && artistData.images[0].url})`}}></div>
        <div className="bar" style={{ marginLeft: '910px', marginTop: '30px', width:'450px',  }}><BarChart topTracks={topTracks}/></div>
        <div className="pie" style={{ marginLeft: '443px', marginTop: '-380px', width:'450px'}}><PieChart popularity={artistData ? artistData.popularity : 0} /></div>
        <div className="radar"style={{marginLeft: '43px', marginTop: '-385px', width:'380px'}}><RadarChart  followers={artistData ? artistData.followers.total : 0} /></div>
       
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default Timeline;
