import axios from "axios";
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from "tough-cookie";

const jar = new CookieJar();
export const client = wrapper(axios.create({ withCredentials: true,jar }));