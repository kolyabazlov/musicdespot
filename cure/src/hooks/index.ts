// Создается копия useDispatch, useSelector, чтобы обойти TS Error
// https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks

// TODO: Стремный импорт
import { RootState } from '@redux/store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
