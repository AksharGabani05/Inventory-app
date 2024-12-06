import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

function Header() {
  return (

    <div className="container mx-auto px-4 py-6 flex justify-between items-center"><nav className="hidden md:flex space-x-6">
      <p>Created by : Akshar Gabani - <a href='https://github.com/AksharGabani05'><span className="text-orange-600 font-bold">Github</span></a></p>
    </nav>

    </div>


  );
}

export default Header;
