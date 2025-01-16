import { Belgrano, Belleza, Cairo, Catamaran, Nunito, Playfair_Display, Poppins, Roboto, Sofia, Spectral } from 'next/font/google';

/**
 * Dynamically imports Google Fonts using next/font/google based on the provided font name.
 *
 * @param {string} fontName - The name of the font to import.
 * @returns {Object} - The dynamically imported font object with its className.
 */
export const createFontImport = (fontName: string) => {
  switch (fontName) {
    case 'Belgrano':
      return Belgrano({
        subsets: ['latin'],
        weight: ['400'],
        display: 'swap',
      });
    case 'Belleza':
      return Belleza({
        subsets: ['latin'],
        weight: ['400'],
        display: 'swap',
      });
    case 'Cairo':
      return Cairo({
        subsets: ['latin'],
        weight: ['400', '700'],
        display: 'swap',
      });
    case 'Catamaran':
      return Catamaran({
        subsets: ['latin'],
        weight: ['400', '700'],
        display: 'swap',
      });
    case 'Nunito':
      return Nunito({
        subsets: ['latin'],
        weight: ['400', '700'],
        display: 'swap',
      });
    case 'Playfair Display':
      return Playfair_Display({
        subsets: ['latin'],
        weight: ['400', '700'],
        display: 'swap',
      });
    case 'Poppins':
      return Poppins({
        subsets: ['latin'],
        weight: ['400', '700'],
        display: 'swap',
      });
    case 'Roboto':
      return Roboto({
        subsets: ['latin'],
        weight: ['400', '700'],
        display: 'swap',
      });
    case 'Sofia':
      return Sofia({
        subsets: ['latin'],
        weight: ['400'],
        display: 'swap',
      });
    case 'Spectral':
      return Spectral({
        subsets: ['latin'],
        weight: ['400', '700'],
        display: 'swap',
      });
    default:
      return Nunito({
        subsets: ['latin'],
        weight: ['400', '700'],
        display: 'swap',
      });
  }
};
