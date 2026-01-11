// Polyfills that need to be available before modules are loaded
// This runs before setupFilesAfterEnv

// Polyfill for Headers API
if (typeof global.Headers === 'undefined') {
  global.Headers = class Headers {
    constructor(init = {}) {
      this._headers = {};
      if (init) {
        Object.entries(init).forEach(([key, value]) => {
          this._headers[key.toLowerCase()] = value;
        });
      }
    }

    get(name) {
      return this._headers[name.toLowerCase()] || null;
    }

    set(name, value) {
      this._headers[name.toLowerCase()] = value;
    }

    has(name) {
      return name.toLowerCase() in this._headers;
    }
  };
}

// Polyfill for Response API (needed for Next.js API route tests)
if (typeof global.Response === 'undefined') {
  global.Response = class Response {
    constructor(body, init = {}) {
      this.body = body;
      this.status = init.status || 200;
      this.statusText = init.statusText || 'OK';
      this.headers = new global.Headers(init.headers);
      this.ok = this.status >= 200 && this.status < 300;
    }

    async json() {
      if (typeof this.body === 'string') {
        return JSON.parse(this.body);
      }
      return this.body;
    }

    async text() {
      if (typeof this.body === 'string') {
        return this.body;
      }
      return JSON.stringify(this.body);
    }

    clone() {
      return new global.Response(this.body, {
        status: this.status,
        statusText: this.statusText,
        headers: this.headers,
      });
    }
  };
}

// Polyfill for Request API (needed for Next.js API route tests)
if (typeof global.Request === 'undefined') {
  global.Request = class Request {
    constructor(input, init = {}) {
      this.url = typeof input === 'string' ? input : input.url;
      this.method = init.method || 'GET';
      this.headers = new global.Headers(init.headers);
      this.body = init.body || null;
      this.bodyUsed = false;
    }

    async json() {
      if (this.bodyUsed) {
        throw new TypeError('Body has already been consumed');
      }
      this.bodyUsed = true;
      if (!this.body) {
        return {};
      }
      return JSON.parse(this.body);
    }

    async text() {
      if (this.bodyUsed) {
        throw new TypeError('Body has already been consumed');
      }
      this.bodyUsed = true;
      return this.body || '';
    }
  };
}




