import React, { useState, useEffect } from 'react';
    import { useParams, Link } from 'react-router-dom';

    const seriesData = {
      '1': [
        { id: 1, name: 'Smiski Doing Crunches', imageUrl: '/src/assets/images/figure1-1.png' },
        { id: 2, name: 'Smiski Stretching', imageUrl: '/src/assets/images/figure1-2.png' },
        { id: 3, name: 'Smiski Aerobics', imageUrl: '/src/assets/images/figure1-3.png' },
        { id: 4, name: 'Little SMISKI Balance', imageUrl: '/src/assets/images/figure1-4.png' },
        { id: 5, name: 'SMISKI Dumbbell', imageUrl: '/src/assets/images/figure1-5.png' },
        { id: 6, name: 'SMISKI Hoop', imageUrl: '/src/assets/images/figure1-6.png' },
      ],
      '2': [
        { id: 1, name: 'Smiski Peek-A-Boo', imageUrl: '/src/assets/images/figure2-1.png' },
        { id: 2, name: 'Smiski Little (Smelly)', imageUrl: '/src/assets/images/figure2-2.png' },
        { id: 3, name: 'Smiski Squatting', imageUrl: '/src/assets/images/figure2-3.png' },
        { id: 4, name: 'Smiski Helping Out', imageUrl: '/src/assets/images/figure2-4.png' },
        { id: 5, name: 'Smiski Resting', imageUrl: '/src/assets/images/figure2-5.png' },
        { id: 6, name: 'Smiski Holding In', imageUrl: '/src/assets/images/figure2-6.png' },
      ],
      '3': [
        { id: 1, name: 'Smiski Hugging Knees', imageUrl: '/src/assets/images/figure3-1.png' },
        { id: 2, name: 'Smiski Sitting', imageUrl: '/src/assets/images/figure3-2.png' },
        { id: 3, name: 'Smiski Looking Back', imageUrl: '/src/assets/images/figure3-3.png' },
        { id: 4, name: 'Smiski Lounging', imageUrl: '/src/assets/images/figure3-4.png' },
        { id: 5, name: 'Smiski Hiding', imageUrl: '/src/assets/images/figure3-5.png' },
        { id: 6, name: 'Smiski Peeking', imageUrl: '/src/assets/images/figure3-6.png' },
      ],
      '4': [
        { id: 1, name: 'Smiski Shampooing', imageUrl: '/src/assets/images/figure4-1.png' },
        { id: 2, name: 'Smiski Not Looking', imageUrl: '/src/assets/images/figure4-2.png' },
        { id: 3, name: 'Smiski Scrubbing', imageUrl: '/src/assets/images/figure4-3.png' },
        { id: 4, name: 'Smiski With Duck', imageUrl: '/src/assets/images/figure4-4.png' },
        { id: 5, name: 'Smiski Dazed', imageUrl: '/src/assets/images/figure4-5.png' },
        { id: 6, name: 'Smiski Looking', imageUrl: '/src/assets/images/figure4-6.png' },
      ],
      '5': [
        { id: 1, name: 'SMISKI Underpants', imageUrl: '/src/assets/images/figure5-1.png' },
        { id: 2, name: 'SMISKI Struggling', imageUrl: '/src/assets/images/figure5-2.png' },
        { id: 3, name: 'SMISKI Loose Pants3', imageUrl: '/src/assets/images/figure5-3.png' },
        { id: 4, name: 'SMISKI Putting On Socks', imageUrl: '/src/assets/images/figure5-4.png' },
        { id: 5, name: 'SMISKI Sweater', imageUrl: '/src/assets/images/figure5-5.png' },
        { id: 6, name: 'SMISKI Tight Pants', imageUrl: '/src/assets/images/figure5-6.png' },
      ],
      '6': [
        { id: 1, name: 'SMISKI Carrying Ladder', imageUrl: '/src/assets/images/figure6-1.png' },
        { id: 2, name: 'SMISKI Balancing Boxes', imageUrl: '/src/assets/images/figure6-2.png' },
        { id: 3, name: 'SMISKI Decorating', imageUrl: '/src/assets/images/figure6-3.png' },
        { id: 4, name: 'Little SMISKI Teamwork', imageUrl: '/src/assets/images/figure6-4.png' },
        { id: 5, name: 'Green Thumb SMISKI', imageUrl: '/src/assets/images/figure6-5.png' },
        { id: 6, name: 'SMISKI Falling Down', imageUrl: '/src/assets/images/figure6-6.png' },
      ],
      '7': [
        { id: 1, name: 'SMISKI before rest', imageUrl: '/src/assets/images/figure7-1.png' },
        { id: 2, name: 'SMISKI Sleepy', imageUrl: '/src/assets/images/figure7-2.png' },
        { id: 3, name: 'SMISKI co-sleeping', imageUrl: '/src/assets/images/figure7-3.png' },
        { id: 4, name: 'SMISKI reading', imageUrl: '/src/assets/images/figure7-4.png' },
        { id: 5, name: 'SMISKI at sleep', imageUrl: '/src/assets/images/figure7-5.png' },
        { id: 6, name: 'SMISKI fussing', imageUrl: '/src/assets/images/figure7-6.png' },
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
      const figures = seriesData[seriesId] || [];
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
        setCollectionCount({ collected: collectedCount, total: figures.length });

        if (collectedCount === figures.length && figures.length > 0) {
          setShowCongrats(true);
          setTimeout(() => setShowCongrats(false), 3000);
        }
      }, [collected, seriesId, figures]);

      const toggleCollected = (figureId) => {
        setCollected(prevCollected => {
          const newCollected = { ...prevCollected };
          newCollected[`${seriesId}-${figureId}`] = !newCollected[`${seriesId}-${figureId}`];
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
        <div style={{position: 'relative'}}>
          <Link to="/" className="back-button">Back to Home</Link>
          <h1>
            {seriesName}
            <span style={{ fontSize: '0.8em', color: '#777', marginLeft: '10px' }}>
              {collectionCount.collected} / {collectionCount.total}
            </span>
          </h1>
          {showCongrats && (
            <div className="congrats-message">
              Congrats You Collected All the Figures in The {seriesName}!
              {renderConfetti()}
            </div>
          )}
          <div className="figure-grid">
            {figures && figures.map(figure => (
              <div
                key={figure.id}
                className={`figure-item ${collected[`${seriesId}-${figure.id}`] ? 'collected' : ''}`}
                onClick={() => toggleCollected(figure.id)}
              >
                <img src={figure.imageUrl} alt={figure.name} />
                <p>{figure.name}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    export default SeriesPage;
