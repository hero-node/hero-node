import * as IPFS from 'ipfs';

let instance;

class Ipfs {
  constructor() {
    return new IPFS();
  }
}

export default () => {
  if (!instance) instance = new Ipfs();

  return instance;
};
