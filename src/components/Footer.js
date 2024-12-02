import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

function Header() {
  return (
    <header className="bg-violet-950 text-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold text-orange-600">
          <Link to="/">InventoryApp</Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <p>Created by : Akshar Gabani - <a href='https://github.com/AksharGabani05'><span className="text-orange-600 font-bold">Github</span></a></p>
        </nav>

        {/* Cart Icon */}
        <div className="relative">
          <Link to="/cart" className="flex items-center space-x-2 hover:text-orange-400">
            <ShoppingCartIcon className="w-6 h-6" />
            <span className="font-semibold">Cart</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden flex items-center space-x-2 text-white">
          <span className="text-lg">☰</span> {/* Mobile Hamburger Icon */}
        </button>
      </div>

      {/* Mobile Navigation Menu (Optional) */}
      {/* You can add a dropdown menu here for mobile */}
    </header>
  );
}

export default Header;
