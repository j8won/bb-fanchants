import { act, render, screen } from '@testing-library/react';
import TwinkleStars from '@/components/common/background/TwinkleStars';

describe('TwinkleStarts component', () => {
  it('renders 100 stars', () => {
    render(<TwinkleStars />);
    const stars = screen.getAllByTestId('star');
    expect(stars.length).toBe(100);
  });

  it('updates window size on resize', () => {
    render(<TwinkleStars />);

    const newWindowSize = {
      width: 800,
      height: 600,
    };

    act(() => {
      window.innerWidth = newWindowSize.width;
      window.innerHeight = newWindowSize.height;
      window.dispatchEvent(new Event('resize'));
    });

    const stars = screen.getAllByTestId('star');
    stars.forEach((star) => {
      const topPosition = parseInt(star.style.top, 10);
      const leftPosition = parseInt(star.style.left, 10);
      expect(topPosition).toBeGreaterThanOrEqual(0);
      expect(topPosition).toBeLessThanOrEqual(newWindowSize.height);
      expect(leftPosition).toBeGreaterThanOrEqual(0);
      expect(leftPosition).toBeLessThanOrEqual(newWindowSize.width);
    });
  });
});
