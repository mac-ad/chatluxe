export const handleResponse = (response: any, requestOptions: any) => {
  const abortController = new AbortController();

  return response.text().then((text: any) => {
    let data;
    if (text === "") {
      text = JSON.stringify({});
    }

    try {
      data = text && JSON.parse(text);
      data.status = response.status;
      data.requestOptions = requestOptions;
    } catch (err) {}

    return data;
  });
};
