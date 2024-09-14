import { CONSTANTS } from '../services/config/app-config';

export const imageLoader = ({ src, width, quality }: any) => {
  return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
};
