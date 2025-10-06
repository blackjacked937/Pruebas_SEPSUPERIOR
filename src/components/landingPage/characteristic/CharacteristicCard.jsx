import React from 'react';

const CharacteristicCard = ({ icon, title, description }) => {
    return (
        <article className="characteristic-card">
            <div className="card-header">
                <span className="card-icon">{icon}</span>
                <h3>{title}</h3>
            </div>
            <p>{description}</p>
        </article>
    );
};

export default CharacteristicCard;