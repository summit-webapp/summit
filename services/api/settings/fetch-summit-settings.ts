import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeGETAPI } from '../../../utils/http-methods';

/**
 * Fetch Summit Settings using the Frappe API.
 *
 * @returns The fetched Summit Settings data or an empty object if not found.
 */

async function fetchSummitSettings() {
  const additionalParams = {};
  const doctypePath = '/api/resource/Summit Settings/Summit Settings';
  const getSummitSettings = await executeGETAPI(undefined, '', undefined, additionalParams, doctypePath);
  return getSummitSettings;
}

export default fetchSummitSettings;
