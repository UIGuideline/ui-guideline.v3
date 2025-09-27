/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

declare module '*.yml' {
  const content: any;
  export default content;
}

declare module '*.yaml' {
  const content: any;
  export default content;
}
