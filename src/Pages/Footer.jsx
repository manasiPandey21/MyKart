import React from 'react';
import "../App.css"

const Footer = () => {
   

const timestamp = Date.now();
const currentDate = new Date(timestamp); 
const formattedDate = currentDate.toLocaleString();

    return (
        <footer className="footer shadow-sm h4 w-100 bg-light text-center footer">
            &copy; 2024 Manasi
            <p>{formattedDate}</p>
        </footer>
    )
}

export default Footer;



