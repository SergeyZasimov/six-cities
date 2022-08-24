import { User } from '../types/user';
import { datatype, internet, name } from 'faker';

export const createMockHost = (): User => ({
  id: datatype.number(),
  avatarUrl: internet.avatar(),
  name: name.firstName(),
  isPro: datatype.boolean()
});
