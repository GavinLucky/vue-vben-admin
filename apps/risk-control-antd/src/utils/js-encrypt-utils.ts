import { useAppConfig } from '@vben/hooks';

import JSEncrypt from 'jsencrypt';

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const { rsaPrivateKey, rsaPublicKey } = useAppConfig(
  import.meta.env,
  import.meta.env.PROD,
);

const encryptor = new JSEncrypt();
encryptor.setPublicKey(rsaPublicKey); // 设置公钥

const decryptor = new JSEncrypt();
decryptor.setPrivateKey(rsaPrivateKey);
/**
 * 加密
 * @param txt 需要加密的数据
 * @returns 加密后的数据
 */
export function doEncrypt(txt: string) {
  // const encryptor = new JSEncrypt();
  // encryptor.setPublicKey(rsaPublicKey); // 设置公钥
  return encryptor.encrypt(txt); // 对需要加密的数据进行加密
}

/**
 * 解密
 * @param txt 需要解密的数据
 * @returns 解密后的数据
 */
export function doDecrypt(txt: string) {
  // const decryptor = new JSEncrypt();
  // decryptor.setPrivateKey(rsaPrivateKey); // 设置私钥
  return decryptor.decrypt(txt);
}
