let cache: any = {};
let expirationTime = 0; // Expiration time in seconds (1 hour)
import { useSelector, useDispatch } from "react-redux";
import {
  cache_data_state,
  setRevalidationTime,
} from "../store/slices/general_slices/cache-slice";

export const HandleAPIExpirationTime = (
  url: string,
  needToUpdate: boolean,
  response: any
) => {
  const cache_data_selector: any = useSelector(cache_data_state);
  const dispatch = useDispatch();
  console.log("cache in checking", cache_data_selector);

  // let cache:any = {};

  if (cache[url] && cache[url].timestamp + 3600 > Date.now()) {
    // If data is available in cache and not expired, return cached data
    return cache[url].response;
  }

  if (needToUpdate) {
    cache[url] = {
      timestamp: Date.now(),
      response: response,
    };
    console.log("cache in updating", cache);
    dispatch(setRevalidationTime(cache));
    return 0;
  }
};

export const handleUpdateCachingOfData = (url: any, response: any) => {
  console.log("cache in updating", cache);
  console.log("cache params", url, response);
  cache[url] = {
    timestamp: Date.now(),
    response: response,
  };
  console.log("cache in updating 2", cache);
};
