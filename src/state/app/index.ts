import { guid } from '@Utils/data/random-number';

export interface IGatsbyNode {
  id: guid;
}

// Redux requires to use serializable objects meaning no classes, rather pure objects or interfaces
// so we store in Redux reduces only serializable objects (or strings)
export interface IReduxData {
  id: guid;
}
