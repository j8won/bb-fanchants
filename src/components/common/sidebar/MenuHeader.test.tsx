import { fireEvent, render, screen } from '@testing-library/react';
import MenuHeader from '@/components/common/sidebar/MenuHeader';

const closeMenuMock = jest.fn();

const languageChangerText = 'LanguageChanger';
jest.mock('@/components/common/sidebar/LanguageChanger', () =>
  jest.fn(() => <div>{languageChangerText}</div>)
);

describe('Menu Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders LanguageChanger and close button correctly', () => {
    render(<MenuHeader closeMenu={closeMenuMock} />);

    expect(screen.getByText(languageChangerText)).toBeInTheDocument();

    const closeBtn = screen.getByAltText('close');
    expect(closeBtn).toBeInTheDocument();
    expect(closeBtn).toHaveAttribute('src', '/icons/icons8-close.svg');
  });

  it('calls closeMenu when close button is clicked', () => {
    render(<MenuHeader closeMenu={closeMenuMock} />);

    const closeBtn = screen.getByAltText('close');
    fireEvent.click(closeBtn);

    expect(closeMenuMock).toHaveBeenCalledTimes(1);
  });
});
