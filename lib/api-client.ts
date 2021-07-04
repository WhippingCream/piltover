import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { getSession } from 'next-auth/client';

export const handler = async <T>(config: AxiosRequestConfig) => {
  const session = await getSession();

  const { headers, ...withoutHeaders } = config;

  try {
    const result: AxiosResponse<T> = await axios({
      ...withoutHeaders,
      baseURL: process.env.FRONT_URL,
      headers: !session
        ? headers
        : {
            ...headers,
            Authorization: `Bearer ${session.user?.accessToken}`,
          },
    });

    return result.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
