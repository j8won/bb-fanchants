import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ConditionalStyledBackground from '@/components/common/background/ConditionalStyledBackground';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('conditional styled background', () => {
  const GRADIENT_CLASS = 'bg-custom-gradient';
  const ROOT_PATH = '/';
  const OTHER_PATH = '/about-us';

  const renderWithPath = (pathname: string) => {
    (usePathname as jest.Mock).mockReturnValue(pathname);
    render(
      <ConditionalStyledBackground>component</ConditionalStyledBackground>
    );
    return screen.getByText('component');
  };

  it('Root path: with gradient', () => {
    const view = renderWithPath(ROOT_PATH);
    expect(view).toHaveClass(GRADIENT_CLASS);
  });

  it('Other path: without gradient', () => {
    const view = renderWithPath(OTHER_PATH);
    expect(view).not.toHaveClass(GRADIENT_CLASS);
  });
});
