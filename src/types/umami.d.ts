declare global {
  interface Window {
    umami: {
      track: (event?: string | object | Function, data?: object) => void;
      identify: (id?: string | object, data?: object) => void;
    };
  }
}

export {};
