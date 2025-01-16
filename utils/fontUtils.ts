import { Belgrano, Belleza, Cairo, Catamaran, Nunito, Playfair_Display, Poppins, Roboto, Sofia, Spectral } from 'next/font/google';

/**
 * Dynamically imports Google Fonts using next/font/google based on the provided font name.
 *
 * @param {string} fontName - The name of the font to import.
 * @returns {Object} - The dynamically imported font object with its className.
 */
// Preload all fonts at the module level
const fonts = {
  Belgrano: Belgrano({ subsets: ['latin'], weight: ['400'], display: 'swap' }),
  Belleza: Belleza({ subsets: ['latin'], weight: ['400'], display: 'swap' }),
  Cairo: Cairo({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' }),
  Catamaran: Catamaran({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' }),
  Nunito: Nunito({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' }),
  Playfair_Display: Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' }),
  Poppins: Poppins({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' }),
  Roboto: Roboto({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' }),
  Sofia: Sofia({ subsets: ['latin'], weight: ['400'], display: 'swap' }),
  Spectral: Spectral({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' }),
};

// Export function to get the font by name
export const createFontImport = (fontName: string) => {
  return fonts[fontName] || fonts.Nunito; // Default to Nunito if font is not found
};
