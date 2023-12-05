import { createAction } from '@reduxjs/toolkit';

// used in the most of the slices to clean data, also for logout or relogin
export const cleanup = createAction('actions/cleanup');
