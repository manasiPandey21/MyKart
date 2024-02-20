import React, { useState, useEffect } from 'react';
import "../App.css"

const Footer = () => {
    const [formattedDate, setFormattedDate] = useState(getFormattedDate());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFormattedDate(getFormattedDate());
        }, 1000); 

        return () => clearInterval(intervalId); 
    }, []);

    function getFormattedDate() {
        const timestamp = Date.now();
        const currentDate = new Date(timestamp);
        return currentDate.toLocaleString();
    }

    return (
        <footer className="footer shadow-sm h4 w-100 bg-light text-center footer">
            &copy; 2024 Manasi
            <p>{formattedDate}</p>
        </footer>
    )
}

export default Footer;
