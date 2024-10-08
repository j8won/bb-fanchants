'use client';
import { memo, useEffect, useState } from 'react';
import { getRandomValue } from '@/lib/utils/random';

const STYLES = ['w-[4px] h-[4px]', 'w-[5px] h-[5px]', 'w-[6px] h-[6px]'];
const OPACITIES = ['opacity-100', 'opacity-50', 'opacity-10'];
const TWINKLES = ['twinkle1', 'twinkle2', 'twinkle3', 'twinkle4'];

type Props = {
  i: number;
  windowSize: {
    width: number;
    height: number;
  };
};

function CreateStars({ i, windowSize }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const style = STYLES[getRandomValue(STYLES.length)];
  const opacity = OPACITIES[getRandomValue(OPACITIES.length)];
  const twinkle = TWINKLES[getRandomValue(TWINKLES.length)];
  const x = getRandomValue(windowSize.width);
  const y = getRandomValue(windowSize.height);

  return (
    <div
      key={i}
      data-testid="star"
      className={`absolute rounded-full bg-white ${style} ${opacity} ${twinkle}`}
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}
    />
  );
}

export default memo(CreateStars);
