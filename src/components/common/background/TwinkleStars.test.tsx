import { render, screen } from '@testing-library/react';
import TwinkleStars from '@/components/common/background/TwinkleStars';

describe('TwinkleStarts component', () => {
  it('renders 100 stars', () => {
    render(<TwinkleStars />);
    const stars = screen.getAllByTestId('star');
    expect(stars.length).toBe(100);
  });
});
