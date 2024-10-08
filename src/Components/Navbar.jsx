import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Navbar() {
  const [menu, setMenu] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [user, setUser] = useState(localStorage.getItem('currentUser3') ? JSON.parse(localStorage.getItem('currentUser3')) : null);

  const openMenu = () => {
    setMenu(!menu);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser3');
    setUser(null);
    window.location.href = '/login';
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed top-0 z-30 w-full p-4 transition-colors duration-300 ${scroll || menu ? 'bg-white shadow-md' : 'bg-transparent'} `}>
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className={`text-3xl font-bold ${scroll || menu ? 'text-teal-800' : 'text-white'} `}>
          CavidanTravel
        </Link>

        {/* Desktop Menu */}
        <ul className={`hidden md:flex gap-8  font-medium  ${scroll || menu ? 'text-teal-800' : 'text-white'} `}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/destinations">Destinations</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {user ? (
            <>
              <li><Link to="/profile">{user.name}</Link></li>
              <li>
                <button className="hover:underline" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
          <li>
            <Link to="/book-trip" className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all duration-300">
              Book Now
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <BiMenu onClick={openMenu} className="text-4xl text-teal-700 cursor-pointer md:hidden" />
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-max-height duration-500 ${menu ? 'max-h-screen' : 'max-h-0'} bg-white shadow-md`}>
        <ul className="flex flex-col gap-4 text-teal-800 p-4">
          <li><Link to="/" onClick={openMenu}>Home</Link></li>
          <li><Link to="/destinations" onClick={openMenu}>Destinations</Link></li>
          <li><Link to="/blog" onClick={openMenu}>Blog</Link></li>
          <li><Link to="/contact" onClick={openMenu}>Contact</Link></li>
          {user ? (
            <>
              <li><Link to="/profile" onClick={openMenu}>{user.name}</Link></li>
              <li>
                <button onClick={handleLogout} className="text-teal-800 hover:underline">Logout</button>
              </li>
            </>
          ) : (
            <li><Link to="/login" onClick={openMenu}>Login</Link></li>
          )}
          <li>
            <Link to="/book-trip" onClick={openMenu} className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all duration-300">
              Book Now
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
