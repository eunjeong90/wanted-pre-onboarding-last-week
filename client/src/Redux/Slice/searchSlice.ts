import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createHttpClient } from '../../Services/httpClient';
import searchService from '../../Services/searchService';
import { RootState } from '../store';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const httpClient = createHttpClient(BASE_URL as string);
const apiService = searchService(httpClient);
export interface ISearchItem {
  sickCd: string;
  sickNm: string;
}
interface ISearchCache {
  query: string;
  list: ISearchItem[];
  expireTime: string;
}
interface ISearchState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  data: ISearchCache[];
  cache: Record<string, ISearchItem[]>;
}

const initialState: ISearchState = {
  status: 'idle',
  error: null,
  data: [],
  cache: {},
};

export const getSearchQuery = createAsyncThunk(
  'search/getSearchQuery',
  async (query: string, { getState }): Promise<ISearchItem[]> => {
    const state = getState() as RootState;
    const cachedData = state.search.data.find((item) => item.query === query);
    if (cachedData && cachedData.expireTime > new Date().toISOString()) return cachedData.list.slice(0, 7);
    else {
      const response = await apiService.getSearchQuery(query);
      console.info('calling api');
      const expireTime = new Date();
      expireTime.setMinutes(expireTime.getMinutes() + 5);
      return response.slice(0, 7);
    }
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchList: (state, action) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchQuery.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSearchQuery.fulfilled, (state, action) => {
        state.status = 'idle';
        const isCached = state.data.some((item) => item.query === action.meta.arg);
        const expireTime = new Date();
        expireTime.setMinutes(expireTime.getMinutes() + 5);
        if (!isCached) {
          const expireTime = new Date();
          expireTime.setMinutes(expireTime.getMinutes() + 5);
          state.data.push({ query: action.meta.arg, list: action.payload, expireTime: expireTime.toISOString() });
        }
      });
  },
});

export default searchSlice.reducer;
