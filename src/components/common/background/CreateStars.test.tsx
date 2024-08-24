import { render } from '@testing-library/react';
import CreateStars from '@/components/common/background/CreateStars';
describe('CreateStars component', () => {
  it('renders without crashing and displays the star at random position', () => {
    const mockWindowSize = { width: 1920, height: 1080 };
    const { container } = render(
      <CreateStars i={1} windowSize={mockWindowSize} />
    );

    const starElement = container.querySelector('div');
    expect(starElement).toBeInTheDocument();

    expect(starElement).toHaveClass('absolute', 'rounded-full', 'bg-white');

    const topPosition = parseInt(starElement!.style.top, 10);
    const leftPosition = parseInt(starElement!.style.left, 10);
    expect(topPosition).toBeGreaterThanOrEqual(0);
    expect(topPosition).toBeLessThanOrEqual(mockWindowSize.height);
    expect(leftPosition).toBeGreaterThanOrEqual(0);
    expect(leftPosition).toBeLessThanOrEqual(mockWindowSize.width);
  });
});
