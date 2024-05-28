import apiHandler from "@/utils/apiHandler";

const getAllTodos = ({ signal }: { signal?: AbortSignal }) => {
  let url = `https://jsonplaceholder.typicode.com/todos/`;
  return apiHandler.get({
    requestURL: url,
    signal: signal,
  });
};

export default { getAllTodos };
