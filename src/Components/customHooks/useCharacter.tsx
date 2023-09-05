import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { useEffect } from 'react';
import {
  selectCharacterCollection,
  selectCollectionStatus,
  selectCollectionError,
  fetchCharacterCollection,
} from '../../store/slice/characterSlice';

export const useGetCharacterCollection = () => {
  const dispatch = useAppDispatch();

  const collectionStatus = useAppSelector(selectCollectionStatus);
  const collection = useAppSelector(selectCharacterCollection);
  const collectionError = useAppSelector(selectCollectionError);

  useEffect(() => {
    dispatch(fetchCharacterCollection());
  }, [dispatch]);

  const isUninitialized = collectionStatus === 'idle';
  const isLoading = collectionStatus === 'loading';
  const isError = collectionStatus === 'failed';
  const isSuccess = collectionStatus === 'succeeded';

  return {
    collection,
    isUninitialized,
    isLoading,
    isError,
    collectionError,
    isSuccess,
  };
};
