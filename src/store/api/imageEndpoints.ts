import { ImageApi } from "./image.api";

const ImageEndpointsApi = ImageApi.injectEndpoints({
  endpoints: (builder) => ({
    getImages: builder.query<any, {page: number, query: string}>({
      query: (elems) => ({
        url: `/search/photos?page=${elems.page}&query=${elems.query}`,
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      }),
    })
  })
})

export const {useGetImagesQuery} = ImageEndpointsApi;
