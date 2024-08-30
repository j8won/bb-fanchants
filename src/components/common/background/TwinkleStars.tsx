import CreateStars from '@/components/common/background/CreateStars';
import { useEffect, useState } from 'react';

function TwinkleStars({ numbersOfStars = 100 }: { numbersOfStars?: number }) {
  const [windowSize, setWindowSize] = useState({
    width: 1920,
    height: 1080,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
  }, []);

  return (
    <div className="relative top-0 w-full h-full">
      {Array.from({ length: numbersOfStars }, (_, i) => (
        <CreateStars key={i} i={i} windowSize={windowSize} />
      ))}
    </div>
  );
}

export default TwinkleStars;
