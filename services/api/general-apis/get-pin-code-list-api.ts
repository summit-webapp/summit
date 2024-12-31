const fetchPinCodesListAPI = async (token: any) => {
  let response: any;
  const url = 'https://summit.8848digitalerp.com/api/resource/Pin Code';
  const options = { headers: { Authorization: `${token}` } };
  const getPincodesList = await fetch(url, options);
  if (getPincodesList.ok) {
    response = await getPincodesList.json();
  } else {
    response = 'Could not fetch pin codes list';
  }

  return response;
};

export default fetchPinCodesListAPI;
