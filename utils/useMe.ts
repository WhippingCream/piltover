import { handler } from '../lib/api-client';
import useSWR from 'swr';

export const useMe = () => {
  const { data, error } = useSWR("/auth/me", async () => {
    return await handler({
      method: "get",
      url: "/ornn-api/v1/auth/me",
    });
  });

  return { data, error };
};
