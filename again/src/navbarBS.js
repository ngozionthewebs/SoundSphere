import './navbarBS.css'
import { Link} from 'react-router-dom';

const SoundNavBar = () => {
  return (  
    <nav className="navbar">
      <div className="logo"></div>
      <div className="links">
        <Link to="/" >Home</Link>
        <Link to="/comparison">Comparison</Link>
        <Link to="/timeline">Timeline</Link>

      </div>
    </nav>
  );
}
 
export default SoundNavBar;
