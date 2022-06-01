import useSWR, { MutatorCallback } from 'swr';
import NextAPIFetcher from '~/modules/api/nextApiFetcher';
import { FetcherError } from '~/modules/lib/errors';
import { User } from '~/types/Models';

type UserHookResult = {
  user?: User;
  mutateUser: MutatorCallback;
};

export default function useUser(): UserHookResult {
  const wrapper = (endpoint: string) => NextAPIFetcher({ endpoint });
  const { data: user, mutate: mutateUser } = useSWR<User, FetcherError>('/api/user', {
    fetcher: wrapper,
  });

  return { user, mutateUser };
}
