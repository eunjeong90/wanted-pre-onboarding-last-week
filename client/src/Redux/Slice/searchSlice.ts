import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createHttpClient } from '../../Services/httpClient';
import searchService from '../../Services/searchService';
import { RootState } from '../store';

export interface ISearchItem {
  sickCd: string;
  sickNm: string;
}
interface ISearchCache {
  query: string;
  list: ISearchItem[];
  // expireTime: number;
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

const BASE_URL = process.env.REACT_APP_BASE_URL;
const httpClient = createHttpClient(BASE_URL as string);
const apiService = searchService(httpClient);

export const getSearchQuery = createAsyncThunk(
  'search/getSearchQuery',
  async (query: string, { getState }): Promise<ISearchItem[]> => {
    const state = getState() as RootState;
    const cachedData = state.search.data.find((item) => item.query === query);
    if (cachedData) return cachedData.list;
    else {
      const response = await apiService.getSearchQuery(query);
      return response;
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
        if (!isCached) {
          state.data.push({ query: action.meta.arg, list: action.payload });
        }
      });
  },
});

export default searchSlice.reducer;
