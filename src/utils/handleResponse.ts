export const handleResponse = async (response: any, requestOptions: any) => {
  if (!response.ok) {
    // client side errors
    if (response.status >= 400 && response.status < 500) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Client Error : ${response.status}`);
    } else if (response.stats >= 500) {
      throw new Error(`Server Error : ${response.status}`);
    } else {
      throw new Error(`Unexpected Error: ${response.status}`);
    }
  }

  const data = await response.json();
  return data;
};
