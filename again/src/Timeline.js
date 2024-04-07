import './homepage.css';
import LineChart from "./Line";

const Timeline = () => {
  return (  
    <div className="home">
      <div className="header">
        <div className="heading">Timeline</div>
      </div>

      <div className="search" style={{ marginLeft: '40px' }}>
        <div className="info-search">Artist Name</div>
        <div className="search-box">
          <form>
            <input type="text" placeholder="Search..." name="search" />
            <button type="submit" style={{ borderRadius: '10px', marginLeft: '10px' }}>Search</button>
          </form>
        </div>
      </div>

      <div className="line"><LineChart /></div>
    </div>
  );
}

export default Timeline;
