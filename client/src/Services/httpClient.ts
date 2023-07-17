import { ISearchItem } from '../Redux/Slice/searchSlice';

export interface ICreateHttpClient {
  // TODO : 기본 타입 적용시 eslint error 수정
  // eslint-disable-next-line no-undef
  fetch(url: string, options: RequestInit): Promise<ISearchItem[]>;
  get(url: string): Promise<ISearchItem[]>;
}

export const createHttpClient = (baseURL: string): ICreateHttpClient => {
  // eslint-disable-next-line no-undef
  const fetch = async (url: string, options: RequestInit = { headers: {} }): Promise<ISearchItem[]> => {
    const response = await window.fetch(`${baseURL + url}`, {
      ...options,
      headers: {
        ...options.headers,
        Accept: 'application/json; charset=utf-8',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  };

  const get = async (url: string): Promise<ISearchItem[]> => {
    return await fetch(url, { method: 'GET' });
  };

  return { fetch, get };
};
