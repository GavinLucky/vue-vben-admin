// eslint-disable-next-line import/no-named-default
import { default as baseDefault } from '@vben/tailwind-config';

const editCfg = baseDefault;
editCfg.theme.screens['3xl'] = '1920';
export { editCfg as default };
