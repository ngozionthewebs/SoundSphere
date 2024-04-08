import './homepage.css'


const Homepage = () => {

    return ( 
        <div className="home">
            <div className="header">

                <div className="heading">Welcome to <br/> Sound Sphere*</div>

                <div className="subtext">This web app allows users <br/> to compare music based on <br/> specific properties. <br/> What Genre are you? <br/> lets find out :)   </div>
            </div>

            <div className="dashboard">
                <div className="dash-image">DASHBOARD</div>

                <div className="track">Get your top 5 tracks
                <div className="sound"></div>
                </div>

                <div className="listen-now">Listen Now
                <div className="play"></div>
                
                </div>

                <div className="rec"> Recommendations
                    <div className="music"></div>
                </div>

                <div className="hot">Hottest Right Now
                    <div className="linegr"></div>
                </div>

                <div className="podcast">Podcast <br/> Data
                <div className="mic"></div>

                </div>

            </div>
            <div className="footer"></div>
        </div>
        
     );
}
 
export default Homepage; 