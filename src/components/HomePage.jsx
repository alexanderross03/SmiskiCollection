import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const seriesData = {
  '1': [
    { id: 1, name: 'Smiski Doing Crunches', imageUrl: '/assets/images/Figure1-1.png' },
    { id: 2, name: 'Smiski Stretching', imageUrl: '/assets/images/Figure1-2.png' },
    { id: 3, name: 'Smiski Aerobics', imageUrl: '/assets/images/Figure1-3.png' },
    { id: 4, name: 'Little SMISKI Balance', imageUrl: '/assets/images/Figure1-4.png' },
    { id: 5, name: 'SMISKI Dumbbell', imageUrl: '/assets/images/Figure1-5.png' },
    { id: 6, name: 'SMISKI Hoop', imageUrl: '/assets/images/Figure1-6.png' },
  ],
  '2': [
    { id: 1, name: 'Smiski Peek-A-Boo', imageUrl: '/assets/images/Figure2-1.png' },
    { id: 2, name: 'Smiski Little (Smelly)', imageUrl: '/assets/images/Figure2-2.png' },
    { id: 3, name: 'Smiski Squatting', imageUrl: '/assets/images/Figure2-3.png' },
    { id: 4, name: 'Smiski Helping Out', imageUrl: '/assets/images/Figure2-4.png' },
    { id: 5, name: 'Smiski Resting', imageUrl: '/assets/images/Figure2-5.png' },
    { id: 6, name: 'Smiski Holding In', imageUrl: '/assets/images/Figure2-6.png' },
  ],
  '3': [
    { id: 1, name: 'Smiski Hugging Knees', imageUrl: '/assets/images/Figure3-1.png' },
    { id: 2, name: 'Smiski Sitting', imageUrl: '/assets/images/Figure3-2.png' },
    { id: 3, name: 'Smiski Looking Back', imageUrl: '/assets/images/Figure3-3.png' },
    { id: 4, name: 'Smiski Lounging', imageUrl: '/assets/images/Figure3-4.png' },
    { id: 5, name: 'Smiski Hiding', imageUrl: '/assets/images/Figure3-5.png' },
    { id: 6, name: 'Smiski Peeking', imageUrl: '/assets/images/Figure3-6.png' },
  ],
  '4': [
    { id: 1, name: 'Smiski Shampooing', imageUrl: '/assets/images/Figure4-1.png' },
    { id: 2, name: 'Smiski Not Looking', imageUrl: '/assets/images/Figure4-2.png' },
    { id: 3, name: 'Smiski Scrubbing', imageUrl: '/assets/images/Figure4-3.png' },
    { id: 4, name: 'Smiski With Duck', imageUrl: '/assets/images/Figure4-4.png' },
    { id: 5, name: 'Smiski Dazed', imageUrl: '/assets/images/Figure4-5.png' },
    { id: 6, name: 'Smiski Looking', imageUrl: '/assets/images/Figure4-6.png' },
  ],
  '5': [
    { id: 1, name: 'SMISKI Underpants', imageUrl: '/assets/images/Figure5-1.png' },
    { id: 2, name: 'SMISKI Struggling', imageUrl: '/assets/images/Figure5-2.png' },
    { id: 3, name: 'SMISKI Loose Pants', imageUrl: '/assets/images/Figure5-3.png' },
    { id: 4, name: 'SMISKI Putting On Socks', imageUrl: '/assets/images/Figure5-4.png' },
    { id: 5, name: 'SMISKI Sweater', imageUrl: '/assets/images/Figure5-5.png' },
    { id: 6, name: 'SMISKI Tight Pants', imageUrl: '/assets/images/Figure5-6.png' },
  ],
  '6': [
    { id: 1, name: 'SMISKI Carrying Ladder', imageUrl: '/assets/images/Figure6-1.png' },
    { id: 2, name: 'SMISKI Balancing Boxes', imageUrl: '/assets/images/Figure6-2.png' },
    { id: 3, name: 'SMISKI Decorating', imageUrl: '/assets/images/Figure6-3.png' },
    { id: 4, name: 'Little SMISKI Teamwork', imageUrl: '/assets/images/Figure6-4.png' },
    { id: 5, name: 'Green Thumb SMISKI', imageUrl: '/assets/images/Figure6-5.png' },
    { id: 6, name: 'SMISKI Falling Down', imageUrl: '/assets/images/Figure6-6.png' },
  ],
  '7': [
    { id: 1, name: 'SMISKI before rest', imageUrl: '/assets/images/Figure7-1.png' },
    { id: 2, name: 'SMISKI Sleepy', imageUrl: '/assets/images/Figure7-2.png' },
    { id: 3, name: 'SMISKI co-sleeping', imageUrl: '/assets/images/Figure7-3.png' },
    { id: 4, name: 'SMISKI reading', imageUrl: '/assets/images/Figure7-4.png' },
    { id: 5, name: 'SMISKI at sleep', imageUrl: '/assets/images/Figure7-5.png' },
    { id: 6, name: 'SMISKI fussing', imageUrl: '/assets/images/Figure7-6.png' },
  ],
};

const seriesNames = {
  '1': 'Exercising Series',
  '2': 'Toilet Series',
  '3': 'Series 1',
  '4': 'Bath Series',
  '5': 'Dressing Series',
  '6': 'Moving Series',
  '7': 'Bed Series',
};

function HomePage() {
  const [collectionCounts, setCollectionCounts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedSmitskis, setSelectedSmitskis] = useState([]);
  const [spotlightFigures, setSpotlightFigures] = useState(() => {
    const storedSpotlight = localStorage.getItem('spotlightFigures');
    return storedSpotlight ? JSON.parse(storedSpotlight) : Array(4).fill(null);
  });

  useEffect(() => {
    const counts = {};
    for (const seriesId in seriesData) {
      const storedCollected = localStorage.getItem(`collected-${seriesId}`);
      const collected = storedCollected ? JSON.parse(storedCollected) : {};
      const collectedCount = Object.keys(collected)
        .filter(key => key.startsWith(`${seriesId}-`) && collected[key])
        .length;
      counts[seriesId] = {
        collected: collectedCount,
        total: seriesData[seriesId].length,
      };
    }
    setCollectionCounts(counts);
  }, []);

  useEffect(() => {
    localStorage.setItem('spotlightFigures', JSON.stringify(spotlightFigures));
  }, [spotlightFigures]);

  const handleAddClick = (type, index) => {
    setModalType(type);
    setShowModal(true);
    setSelectedSmitskis([index]);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType(null);
    setSelectedSmitskis([]);
  };

  const getModalList = () => {
    if (modalType === 'spotlight') {
      const collectedFigures = [];
      for (const seriesId in seriesData) {
        const storedCollected = localStorage.getItem(`collected-${seriesId}`);
        const collected = storedCollected ? JSON.parse(storedCollected) : {};
        for (const key in collected) {
          if (collected[key]) {
            const [sId, fId] = key.split('-');
            const Figure = seriesData[sId].find(f => f.id === parseInt(fId));
            if (Figure) {
              collectedFigures.push(Figure);
            }
          }
        }
      }
      return collectedFigures;
    }
    return [];
  };

  const handleSmitskiSelect = (smitski) => {
    setSelectedSmitskis(prev => {
      if (prev.some(s => s.id === smitski.id)) {
        return prev.filter(s => s.id !== smitski.id);
      } else {
        return [...prev, smitski];
      }
    });
  };

  const handleAddToSpotlight = (smitski, index) => {
    setSpotlightFigures(prev => {
      const newSpotlight = [...prev];
      newSpotlight[index] = smitski;
      return newSpotlight;
    });
    handleCloseModal();
  };

  const handleRemoveFromSpotlight = (index) => {
    setSpotlightFigures(prev => {
      const newSpotlight = [...prev];
      newSpotlight[index] = null;
      return newSpotlight;
    });
  };

  return (
    <div>
      <h1>Smitski Collections</h1>
      <ul className="series-list">
        {Object.keys(seriesData).map(seriesId => {
          const isCompleted = collectionCounts[seriesId]?.collected === collectionCounts[seriesId]?.total && collectionCounts[seriesId]?.total > 0;
          return (
            <li key={seriesId} className={isCompleted ? 'completed' : ''}>
              <Link to={`/series/${seriesId}`}>
                {seriesNames[seriesId]}
                <span className="series-tracker">
                  {collectionCounts[seriesId] ? `${collectionCounts[seriesId].collected} / ${collectionCounts[seriesId].total}` : '0 / 0'}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <h2 style={{marginTop: '30px'}}>Spotlight</h2>
      <div className="spotlight-container">
        {spotlightFigures.map((smitski, index) => (
          <div key={index} className={`spotlight-box ${smitski ? 'glowing' : ''}`} onClick={() => handleAddClick('spotlight', index)}>
            {smitski ? (
              <>
                <img src={smitski.imageUrl} alt={smitski.name} onClick={(e) => {e.stopPropagation(); handleRemoveFromSpotlight(index)}} />
                <span className="remove-icon" onClick={(e) => {e.stopPropagation(); handleRemoveFromSpotlight(index)}}>-</span>
              </>
            ) : (
              <span className="add-icon">+</span>
            )}
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add to Spotlight</h3>
            <ul className="modal-list">
              {getModalList().map(smitski => (
                <li key={smitski.id} onClick={() => handleAddToSpotlight(smitski, selectedSmitskis[0])}>
                  <img src={smitski.imageUrl} alt={smitski.name} />
                  <p>{smitski.name}</p>
                </li>
              ))}
            </ul>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;