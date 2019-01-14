# scratch-cli
CLI for the Scratch interpreter

## Install

```bash
# requires node > 6
sudo npm install -g scratch-cli
```

## Run tests

```bash
npm test
```

## Building wrapper

The cli can be wrapped as an executable using [nexe](https://github.com/jaredallard/nexe): `npm install nexe -g`.

```
git clone https://github.com/luchotc/scratch-cli
cd scratch-cli
nexe -i src/index.js -o scratch-cli
```

## Usage

```bash
scratch-cli --help
```
