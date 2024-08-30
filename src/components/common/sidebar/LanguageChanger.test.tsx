import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import { fireEvent, render, screen } from '@testing-library/react';
import LanguageChanger from '@/components/common/sidebar/LanguageChanger';
import { INFOS } from '@/lib/constants/LOCALE';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe('Language Changer Button', () => {
  const mockUseTranslation = useTranslation as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;
  const mockUsePathname = jest.mocked(usePathname, true);

  const currentLanguage = 'ko';

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      refresh: jest.fn(),
    });

    mockUsePathname.mockReturnValue('/');
    mockUseTranslation.mockReturnValue({
      i18n: {
        language: currentLanguage,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders KOR and ENG buttons correctly', () => {
    render(<LanguageChanger />);

    Object.entries(INFOS).forEach(([id, info]) => {
      const button = screen.getByText(info.buttonText);
      expect(button).toBeInTheDocument();

      if (id === currentLanguage) {
        expect(button).toBeDisabled();
      } else {
        expect(button).toBeEnabled();
      }
    });
  });

  it('changes language and updates URL when a different locale is clicked', () => {
    render(<LanguageChanger />);
    const { push, refresh } = mockUseRouter.mock.results[0].value;

    const engButton = screen.getByText(INFOS.en.buttonText);
    fireEvent.click(engButton);

    expect(document.cookie).toContain('NEXT_LOCALE=en');
    expect(push).toHaveBeenCalledWith('/en/');
    expect(refresh).toHaveBeenCalled();
  });

  it('does not change URL or language when the current locale is clicked', () => {
    render(<LanguageChanger />);
    const { push, refresh } = mockUseRouter.mock.results[0].value;

    const korButton = screen.getByText(INFOS.ko.buttonText);
    fireEvent.click(korButton);

    expect(push).not.toHaveBeenCalled();
    expect(refresh).not.toHaveBeenCalled();
  });
});
