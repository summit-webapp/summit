import { Belgrano, Belleza, Cairo, Catamaran, Nunito, Playfair_Display, Poppins, Roboto, Sofia, Spectral } from 'next/font/google';

// Lots of approaches can be use to use fonts dynamically. But below code approach is to fix error - Font loaders must be called and assigned
// to a const in the module scope on build.

/**
 * Preload all fonts at the module level.
 * Each font is assigned to a constant to comply with the module scope requirements of next/font.
 */
const belgranoFont = Belgrano({ subsets: ['latin'], weight: ['400'], display: 'swap' });
const bellezaFont = Belleza({ subsets: ['latin'], weight: ['400'], display: 'swap' });
const cairoFont = Cairo({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });
const catamaranFont = Catamaran({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });
const nunitoFont = Nunito({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });
const playfairDisplayFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});
const poppinsFont = Poppins({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });
const robotoFont = Roboto({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });
const sofiaFont = Sofia({ subsets: ['latin'], weight: ['400'], display: 'swap' });
const spectralFont = Spectral({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });

/**
 * Fonts object for lookup based on font names.
 */
const fonts: any = {
  Belgrano: belgranoFont,
  Belleza: bellezaFont,
  Cairo: cairoFont,
  Catamaran: catamaranFont,
  Nunito: nunitoFont,
  Playfair_Display: playfairDisplayFont,
  Poppins: poppinsFont,
  Roboto: robotoFont,
  Sofia: sofiaFont,
  Spectral: spectralFont,
} as const;
/**
 * Export function to get the font by name.
 *
 * @param {string} fontName - The name of the font to import. Spaces in the name will be replaced with underscores.
 * @returns {Object} - The imported font object with its className.
 */
export const createFontImport = (fontName: string) => {
  if (!fontName) return fonts.Nunito; // Default to Nunito if no fontName is provided

  // Normalize fontName by replacing spaces with underscores
  const normalizedFontName = fontName.replace(/ /g, '_');

  // Check if the normalized name exists in the fonts object
  return fonts[normalizedFontName as keyof typeof fonts] || fonts.Nunito;
};
