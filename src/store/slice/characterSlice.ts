//createSlice para crear slice y un initialState para el slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import type { CharacterType, RawCharacter } from '../../types/character.d';
import axios from 'axios';
import type { Episode } from '../../types/episode.d';

const { VITE_BASE_API_URL: URL_API } = import.meta.env;

export const fetchCharacterCollection = createAsyncThunk(
  'character/fetchCharacterCollection',
  async () => {
    const { data }: { data: { results: RawCharacter[] } } = await axios.get(
      `${URL_API}/character`
    );

    const transformedCharacterList: CharacterType[] = await Promise.all(data.results.map(
        async (character: RawCharacter) => {
          const { data }: { data: Episode } = await axios.get(
            character.episode[0]
          );
          /* eslint-disable */
          const { origin, location, episode, url, created, ...restOfCharacter } =
            character;
          /* eslint-enable */
          return {
            ...restOfCharacter,
            lastKnownLocation: character.location.name,
            firstSeenIn: data.name,
          };
        }
      ))
    return transformedCharacterList;
  }
);

type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
type ErrorStatus = string | null | undefined;

interface CharacterState {
  collection: CharacterType[];
  collectionStatus: LoadingStatus;
  collectionError: ErrorStatus;
  detail: CharacterType;
  detailStatus: LoadingStatus;
  detailError: ErrorStatus;
}

const initialState: CharacterState = {
  collection: [], //
  collectionStatus: 'idle',
  collectionError: null,
  detail: {} as CharacterType,
  detailStatus: 'idle',
  detailError: null,
};

const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCharacterCollection.pending, (state) => {
          state.collectionStatus = 'loading'
        })
        .addCase(fetchCharacterCollection.fulfilled, (state, action) => {
          state.collectionStatus = 'succeeded'
          state.collection = action.payload
        })
        .addCase(fetchCharacterCollection.rejected, (state, action) => {
          state.collectionStatus = 'failed'
          state.collectionError = action.error.message
        })
    },
  })

export const selectCharacterCollection = (state: RootState) =>
  state.character.collection;
export const selectCollectionStatus = (state: RootState) =>
  state.character.collectionStatus;
export const selectCollectionError = (state: RootState) =>
  state.character.collectionError;
export const selectDetail = (state: RootState) => state.character.detail;
export const selectDetailStatus = (state: RootState) =>
  state.character.detailStatus;
export const selectDetailError = (state: RootState) =>
  state.character.detailError;

export default characterSlice.reducer;
