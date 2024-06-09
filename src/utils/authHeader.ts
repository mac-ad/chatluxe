export const authHeader = async (jsonType = true) => {
  let header: Record<string, string> = {
    "Access-Control-Allow-Origin": location.origin,
  };

  if (jsonType) {
    header = {
      ...header,
      "Content-Type": "application/json",
    };
  }
  return header;
};
