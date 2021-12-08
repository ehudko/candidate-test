import { LocalStorage } from 'node-localstorage';
// import {
//   ApiEnvironment,
//   FileDescriptor,
//   Gender,
//   SdkClient,
//   StorageProvider,
//   VerificationMethod,
// } from '@integrity_applications/private-glucotrack-sdk';

// const nodeLocalStorage = new LocalStorage('./scratch');
let nodeLocalStorage: Record<string, string> = {};
// const localStorage: StorageProvider = {
//   getItem(key: string): Promise<string> {
//     return Promise.resolve(nodeLocalStorage[key] ?? '');
//   },
//   setItem(key: string, value: string): Promise<void> {
//     nodeLocalStorage[key] = value;
//     return Promise.resolve();
//   },
//   removeItem(key: string): Promise<void> {
//     delete nodeLocalStorage[key]
//     return Promise.resolve();
//   },
//   clear(): Promise<void> {
//     nodeLocalStorage = {};
//     return Promise.resolve();
//   },
// };















// const nodeLocalStorage = new LocalStorage('./scratch');
// const localStorage: StorageProvider = {
//   getItem(key: string): Promise<string> {
//     return Promise.resolve(nodeLocalStorage.getItem(key));
//   },
//   setItem(key: string, value: string): Promise<void> {
//     return Promise.resolve(nodeLocalStorage.setItem(key, value));
//   },
//   removeItem(key: string): Promise<void> {
//     return Promise.resolve(nodeLocalStorage.removeItem(key));
//   },
//   clear(): Promise<void> {
//     return Promise.resolve(nodeLocalStorage.clear());
//   },
// };









export {
  nodeLocalStorage
}