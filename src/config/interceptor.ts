
export const requestHandler = (api: any) => {
  api.interceptors.response.use(

    (response: any) => {

      if (response.status !== 200) {
        //TO DO
      }
      return api;

    });

  api.interceptors.request.use(

    async (config: any) => config,
    (error: any) => Promise.reject(error)

  );

  return api;
} 