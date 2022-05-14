# pack-all-tarballs

[![NPM version](https://img.shields.io/npm/v/pack-all-tarballs?color=a1b858&label=)](https://www.npmjs.com/package/pack-all-tarballs)

## Why

In some situations, people don't have Internet access in their development environment. Typically, to support the `npm install` command, a repository mirror will be configured. Then people need to transfer `tgz` files from the Internet to the mirror somehow. However, it's not convenient enough to do that. So I write this util to automatically download all used packages as `tgz` files(which also means you need to implement upload util yourself regarding your mirror).

## Install

```bash
npm install -g pack-all-tarballs
```

## Usage

First make sure you have your lock file ready. To pack all packages into `./tarballs` folder, just run:

```bash
pack-all-tarballs
```

**NOTE:** Currently only `package-lock.json` and `pnpm-lock.yaml` are supported.

For complicated usage, run `pack-all-tarballs -h`. You are able to change the output directory and which lock file to use.

## License

[MIT](./LICENSE) License © 2022 [winwin2011](https://github.com/YuJianghao)
