import './navbarBS.css'

// import { Navbar, Nav, Container } from "react-bootstrap";

// const SoundNav = () => {
//   return (
//     <Navbar bg="dark" data-bs-theme="dark">
//       <Container>
//         <Navbar.Brand href="#home">Navbar</Navbar.Brand>
//         <Nav className="me-auto">
//           <Nav.Link href="#home">Home</Nav.Link>
//           <Nav.Link href="#features">Features</Nav.Link>
//           <Nav.Link href="#pricing">Pricing</Nav.Link>
//         </Nav>
//       </Container>
//     </Navbar>
//   );
// };

// export default SoundNav; // Change to default export

const SoundNavBar = () => {
  return (  
    <nav className="navbar">
      <div className="logo"><h1>SoundSphere Image</h1></div>
      <div className="links">
        <a href="/" >Home</a>
        <a href="/">Comparison</a>
        <a href="/">Timeline</a>

      </div>
    </nav>
  );
}
 
export default SoundNavBar;
