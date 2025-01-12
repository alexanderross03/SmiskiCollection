import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

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

function SeriesPage() {
  const { seriesId } = useParams();
  const seriesName = seriesNames[seriesId] || 'Unknown Series';
  const [collected, setCollected] = useState({});
  const Figures = seriesData[seriesId] || [];
  const [collectionCount, setCollectionCount] = useState({ collected: 0, total: 0 });
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    const storedCollected = localStorage.getItem(`collected-${seriesId}`);
    if (storedCollected) {
      setCollected(JSON.parse(storedCollected));
    }
  }, [seriesId]);

  useEffect(() => {
    if(Object.keys(collected).length > 0){
      localStorage.setItem(`collected-${seriesId}`, JSON.stringify(collected));
    }
    const collectedCount = Object.keys(collected)
      .filter(key => key.startsWith(`${seriesId}-`) && collected[key])
      .length;
    setCollectionCount({ collected: collectedCount, total: Figures.length });

    if (collectedCount === Figures.length && Figures.length > 0) {
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 3000);
    }
  }, [collected, seriesId, Figures]);

  const toggleCollected = (FigureId) => {
    setCollected(prevCollected => {
      const newCollected = { ...prevCollected };
      newCollected[`${seriesId}-${FigureId}`] = !newCollected[`${seriesId}-${FigureId}`];
      return newCollected;
    });
  };

  const renderConfetti = () => {
    const confetti = [];
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * window.innerWidth - window.innerWidth / 2;
      const y = Math.random() * window.innerHeight - window.innerHeight / 2;
      confetti.push(
        <div
          key={i}
          className="confetti"
          style={{ '--x': `${x}px`, '--y': `${y}px` }}
        />
      );
    }
    return confetti;
  };

  return (
    <div style={{ position: 'relative' }}>
      <Link to="/" className="back-button">Back to Home</Link>
      <h1>
        {seriesName}
        <span style={{ fontSize: '0.8em', color: '#777', marginLeft: '10px' }}>
          {collectionCount.collected} / {collectionCount.total}
        </span>
      </h1>
      {showCongrats && (
        <div className="congrats-message">
          Congrats! You Collected All the Figures in The {seriesName}!
          {renderConfetti()}
        </div>
      )}
      <div className="Figure-grid">
        {Figures && Figures.map(Figure => (
          <div
            key={Figure.id}
            className={`Figure-item ${collected[`${seriesId}-${Figure.id}`] ? 'collected' : ''}`}
            onClick={() => toggleCollected(Figure.id)}
          >
            <img src={Figure.imageUrl} alt={Figure.name} />
            <p>{Figure.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeriesPage;