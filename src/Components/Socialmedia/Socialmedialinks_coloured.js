import React from "react";
import './Socialmedialinnks_coloured.css';
import twitterIcon from '../../Assets/Twitter.png'; // Adjust the path
import instagram from '../../Assets/instagram.png'; // Adjust the path
import linkedinIcon from '../../Assets/LinkedIn.png'; // Adjust the path
import youtubeIcon from '../../Assets/YouTube.png'; // Adjust the path
import redditIcon from '../../Assets/Reddit.png'; // Adjust the path

const Socialmedialinks_coloured = () => {
    return (
        <div className="social-media-icons">
            <a href="https://x.com/DigitEducator" target="_blank" rel="noopener noreferrer">
                <img src={twitterIcon} alt="Twitter" />
            </a>
            <a href="https://www.instagram.com/digiteducator/" target="_blank" rel="noopener noreferrer">
                <img src={instagram} alt="Instagram" />
            </a>
            <a href="https://www.linkedin.com/company/digiteducator/" target="_blank" rel="noopener noreferrer">
                <img src={linkedinIcon} alt="LinkedIn" />
            </a>
            <a href="https://www.youtube.com/@DigitEducator" target="_blank" rel="noopener noreferrer">
                <img src={youtubeIcon} alt="YouTube" />
            </a>
            <a href="https://reddit.com" target="_blank" rel="noopener noreferrer">
                <img src={redditIcon} alt="Reddit" />
            </a>
        </div>
    );
}

export default Socialmedialinks_coloured;
