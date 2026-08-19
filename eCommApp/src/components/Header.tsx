import { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomerModal from './CustomerModal';

const Header = () => {
    const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

    return (
        <>
            <header className="app-header">
            <h1>The Daily Harvest</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/cart">Cart</Link>
                <button type="button" onClick={() => setIsCustomerModalOpen(true)}>
                    Cadastrar cliente
                </button>
                <Link to="/login">
                    <button type="button">Admin Login</button>
                </Link>
            </nav>
            </header>
            {isCustomerModalOpen && (
                <CustomerModal onClose={() => setIsCustomerModalOpen(false)} />
            )}
        </>
    );
};

export default Header;
