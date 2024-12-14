import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiKey = import.meta.env.VITE_ACCESS_KEY;

const baseUrl = 'https://api.unsplash.com';

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: 'include',
  prepareHeaders: (headers) => {
      headers.set('Authorization', `Client-ID ${apiKey}`);
      headers.set('X-Ratelimit-Limit', '1000');
      headers.set('X-Ratelimit-Remaining', '999');
    return headers;
  }
});

export const ImageApi = createApi({
  reducerPath: 'contentApi',
  tagTypes: ['content/api'],
  baseQuery,
  refetchOnFocus: true,
  endpoints: () => ({}),
});