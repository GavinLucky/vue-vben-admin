import { mitt } from '@vben/utils';

type Events = {
  updateProfile: any;
};

export const emitter = mitt<Events>();
