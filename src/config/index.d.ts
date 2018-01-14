import { EggAppConfig } from 'egg';

declare module 'egg' {
  export interface EggAppConfig {
    ipfs: {
      host: string;
      port: string;
      protocol: string;
    };
  }
}
