import { fireEvent, render, screen } from '@testing-library/react';
import Header from '@/components/common/sidebar/Header';
import React from 'react';

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('Header', () => {
  const openMenuMock = jest.fn();

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-lifecycle
    render(<Header openMenu={openMenuMock} />);
  });

  it('renders the logo image with correct attribute', () => {
    const logoImage = screen.getByAltText('home');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/icons/logo.svg');
  });

  it('has a link that navigate to "/" when the logo is clicked', () => {
    const logoLink = screen.getByRole('link', { name: /home/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders the menu button with correct attribute', () => {
    const menuButton = screen.getByAltText('menu');
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute('src', '/icons/icons8-menu.svg');
  });

  it('calls openMenu when the menu button is clicked', () => {
    const menuButton = screen.getByAltText('menu');
    fireEvent.click(menuButton);
    expect(openMenuMock).toHaveBeenCalledTimes(1);
  });
});
