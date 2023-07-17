import { ICreateHttpClient } from './httpClient';

const searchService = (httpClient: ICreateHttpClient) => {
  const getSearchQuery = async (query: string) => {
    let queryUrl = `/sick?q=${query}`;
    return await httpClient.get(queryUrl);
  };

  return { getSearchQuery };
};

export default searchService;
