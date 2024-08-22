import { getRandomValue } from '@/utils/random';

const STYLES = ['w-[4px] h-[4px]', 'w-[5px] h-[5px]', 'w-[6px] h-[6px]'];
const OPACITIES = ['opacity-100', 'opacity-50', 'opacity-10'];
const TWINKLES = ['twinkle1', 'twinkle2', 'twinkle3', 'twinkle4'];

function CreateStars({ i, windowSize }) {
  const style = STYLES[getRandomValue(STYLES.length)];
  const opacity = OPACITIES[getRandomValue(OPACITIES.length)];
  const twinkle = TWINKLES[getRandomValue(TWINKLES.length)];
  const x = getRandomValue(windowSize.width);
  const y = getRandomValue(windowSize.height);

  return (
    <div
      key={i}
      className={`absolute rounded-full bg-white ${style} ${opacity} ${twinkle}`}
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}
    />
  );
}

export default CreateStars;
