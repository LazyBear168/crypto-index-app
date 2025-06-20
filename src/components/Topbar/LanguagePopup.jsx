/* File name: LanguagePopup.jsx */
/* Author: sunny */

import './LanguagePopup.css';
export default function LanguagePopup({onSelect, onClose}) {
    return (
        <div className="language-popup-overlay" onClick={onClose}>
            <div className="language-popup" onClick={(e) => e.stopPropagation()}>
                <h3>Select Language</h3>
                <button onClick={() => onSelect("zh")}>中文</button>
                <button onClick={() => onSelect("en")}>English</button>
            </div>
        </div>
    );
}