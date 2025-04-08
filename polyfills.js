// polyfills.js
if (typeof MessageChannel === 'undefined') {
    globalThis.MessageChannel = class MessageChannel {
      constructor() {
        this.port1 = {};
        this.port2 = {};
      }
    };
  }