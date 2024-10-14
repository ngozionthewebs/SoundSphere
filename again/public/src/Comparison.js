import React, { useState } from 'react';
import './homepage.css';
import BarChart from "./Bar";
import PieChart from "./Pie";
import RadarChart from "./Radar";
import axios from 'axios';

const Comparison = ({ accessToken }) => { // Receive the accessToken as a prop
  const [artistName1, setArtistName1] = useState('');
  const [artistData1, setArtistData1] = useState(null);
  const [topTracks1, setTopTracks1] = useState([]); // Add state for top tracks of artist 1


  const [artistName2, setArtistName2] = useState('');
  const [artistData2, setArtistData2] = useState(null);
  const [topTracks2, setTopTracks2] = useState([]); // Add state for top tracks of artist 2


   // Function to fetch top tracks by artist ID
   const fetchTopTracks = async (artistId, setTopTracks) => {
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


  // Function to fetch artist data and then their top tracks
  const fetchArtistData = async (artistName, setArtistData, setTopTracks ) => {
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
      const artist = searchResponse.data.artists.items[0];
      setArtistData(artist);
      
      await fetchTopTracks(artist.id, setTopTracks); // Fetch top tracks after getting artist data
    } catch (error) {
      console.error('Error fetching artist data:', error);
    }
  };
  
  return (
    <div className="home">
      <div className="header">
        <div className="heading">Who did <br/> it better?</div>
        <div className="subtext">Let us have a look and see</div>
      </div>
      <div className="compare">
        <div className="block-one">
          <div className="search">
            <div className="info-search">Artist Name</div>
            <div className="search-box">
              <form onSubmit={(e) => { e.preventDefault(); fetchArtistData(artistName1, setArtistData1, setTopTracks1); }}>
                <input type="text" placeholder="Search..." value={artistName1} onChange={(e) => setArtistName1(e.target.value)} name="search" />
                <button type="submit" style={{ borderRadius: '10px', marginLeft: '10px' }}>Search</button>
              </form>
            </div>
          </div>
          {artistData1 && (
          <div className="stats">
            <div className="artist-image" style={{ backgroundImage: `url(${artistData1.images[0].url})` }}>
              {/* If you want to use an img tag instead of background-image */}
              {/* <img src={artistData1.images[0].url} alt={artistData1.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
            </div>
            <div className="bar"><BarChart topTracks={topTracks1} /></div>
            <div className="pie"><PieChart popularity={artistData1 ? artistData1.popularity : 0} /></div>
            <div className="radar"><RadarChart followers={artistData1 ? artistData1.followers.total : 0}  /></div>
          </div>
        )}

        </div>
        <div className="block-two">
          <div className="search">
            <div className="info-search">Artist Name</div>
            <div className="search-box">
              <form onSubmit={(e) => { e.preventDefault(); fetchArtistData(artistName2, setArtistData2, setTopTracks2); }}>
                <input type="text" placeholder="Search..." value={artistName2} onChange={(e) => setArtistName2(e.target.value)} name="search" />
                <button type="submit" style={{ borderRadius: '10px', marginLeft: '10px' }}>Search</button>
              </form>
            </div>
          </div>
          {artistData2 && (
          <div className="stats">
            <div className="artist-image" style={{ backgroundImage: `url(${artistData2.images[0].url})` }}>
              {/* If you want to use an img tag instead of background-image */}
              {/* <img src={artistData1.images[0].url} alt={artistData1.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
            </div>
            <div className="bar"><BarChart topTracks={topTracks2} /></div>
            <div className="pie"><PieChart popularity={artistData2 ? artistData2.popularity : 0} /></div>
            <div className="radar"><RadarChart followers={artistData2 ? artistData2.followers.total : 0} /></div>
          </div>
        )}

        </div>
      </div>
      <div className="footer" style={{marginTop: '43px'}}></div>
    </div>
  );
};

export default Comparison;
