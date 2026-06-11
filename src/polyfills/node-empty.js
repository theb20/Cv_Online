// Browser stub for all Node.js built-ins imported by @anthropic-ai/sdk's server-side toolset.
// These modules are never actually called in browser context — this stub keeps the bundler happy.

const noop = () => {};
const asyncNoop = async () => {};
const asyncNoopArr = async () => [];
const asyncNoopStr = async () => '';
const asyncNoopBuf = async () => new Uint8Array();

// node:crypto
export const randomUUID = () => crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
export const createHash = () => ({ update: () => ({ digest: () => '' }) });
export const createHmac = () => ({ update: () => ({ digest: () => '' }) });
export const timingSafeEqual = () => false;

// node:path
export const resolve = (...a) => a.join('/');
export const sep = '/';
export const delimiter = ':';
export const dirname = (p = '') => p.split('/').slice(0, -1).join('/') || '/';
export const basename = (p = '') => p.split('/').pop() || '';
export const extname = (p = '') => { const b = basename(p); const i = b.lastIndexOf('.'); return i > 0 ? b.slice(i) : ''; };
export const join = (...a) => a.join('/').replace(/\/+/g, '/');
export const normalize = (p = '') => p;
export const isAbsolute = (p = '') => p.startsWith('/');
export const relative = () => '';
export const parse = (p = '') => ({ root: '', dir: dirname(p), base: basename(p), ext: extname(p), name: basename(p) });
export const posix = { resolve, sep, join, dirname, basename, extname, normalize, isAbsolute, relative };
export const win32 = posix;

// node:fs / node:fs/promises
export const readFile = asyncNoopStr;
export const writeFile = asyncNoop;
export const appendFile = asyncNoop;
export const mkdir = asyncNoop;
export const mkdtemp = async () => '/tmp/stub';
export const readdir = asyncNoopArr;
export const stat = async () => ({ isDirectory: () => false, isFile: () => true, size: 0, mtime: new Date() });
export const lstat = stat;
export const access = asyncNoop;
export const unlink = asyncNoop;
export const rm = asyncNoop;
export const copyFile = asyncNoop;
export const rename = asyncNoop;
export const open = async () => ({ read: asyncNoop, write: asyncNoop, close: asyncNoop, fd: 0 });
export const createReadStream = () => ({ on: () => {}, pipe: () => {} });
export const createWriteStream = () => ({ on: () => {}, write: noop, end: noop });
export const existsSync = () => false;
export const readFileSync = () => '';
export const writeFileSync = noop;
export const mkdirSync = noop;
export const statSync = () => ({ isDirectory: () => false, isFile: () => true, size: 0 });
export const readdirSync = () => [];
export const promises = {
  readFile, writeFile, appendFile, mkdir, mkdtemp, readdir,
  stat, lstat, access, unlink, rm, copyFile, rename, open,
};

// node:os
export const homedir = () => '/home/user';
export const tmpdir = () => '/tmp';
export const platform = () => 'browser';
export const hostname = () => 'localhost';
export const EOL = '\n';
export const cpus = () => [];
export const totalmem = () => 0;
export const freemem = () => 0;
export const networkInterfaces = () => ({});

// node:child_process
export const execFile = (cmd, args, opts, cb) => { if (typeof opts === 'function') opts(null, '', ''); else if (typeof cb === 'function') cb(null, '', ''); };
export const spawn = () => ({ stdout: { on: noop }, stderr: { on: noop }, on: noop, kill: noop });
export const exec = (cmd, opts, cb) => { if (typeof opts === 'function') opts(null, '', ''); else if (typeof cb === 'function') cb(null, '', ''); };

// node:util
export const promisify = (fn) => (...args) => new Promise((res, rej) => fn(...args, (err, val) => err ? rej(err) : res(val)));
export const inspect = (v) => String(v);
export const format = (...a) => a.join(' ');
export const inherits = noop;
export const types = { isNativeError: () => false };

// node:stream / node:stream/promises
export class Readable {
  constructor() { this._read = noop; }
  on() { return this; }
  pipe(dest) { return dest; }
  static from() { return new Readable(); }
  [Symbol.asyncIterator]() { return { next: async () => ({ done: true, value: undefined }) }; }
}
export class Writable {
  constructor() {}
  write(chunk, enc, cb) { if (typeof cb === 'function') cb(); return true; }
  end(cb) { if (typeof cb === 'function') cb(); }
  on() { return this; }
}
export class Transform extends Readable {
  constructor() { super(); this._transform = (c, e, cb) => cb(); }
}
export const pipeline = async (...streams) => {};
export const finished = (stream, cb) => cb && cb();
export const PassThrough = Transform;

// node:readline
export const createInterface = () => ({ question: (q, cb) => cb(''), close: noop, on: () => ({ close: noop }) });
export const Interface = class {};

// Catch-all default export
export default {
  randomUUID, createHash, createHmac, timingSafeEqual,
  resolve, sep, delimiter, dirname, basename, extname, join, normalize, isAbsolute, relative, parse, posix, win32,
  readFile, writeFile, mkdir, readdir, stat, access, unlink, rm, rename, createReadStream, createWriteStream,
  existsSync, readFileSync, writeFileSync, mkdirSync, statSync, readdirSync, promises,
  homedir, tmpdir, platform, hostname, EOL, cpus, totalmem, freemem, networkInterfaces,
  execFile, spawn, exec,
  promisify, inspect, types,
  Readable, Writable, Transform, pipeline, finished, PassThrough,
  createInterface,
};
