# mulang-scratch
CLI for transforming a Scratch AST into a Mulang AST

## Install

```bash
# requires node > 8
sudo npm install -g mulang-scratch
```

## Run tests

```bash
npm test
```

## Building wrapper

The cli can be wrapped as an executable using [nexe](https://github.com/jaredallard/nexe): `npm install nexe -g`.

```
git clone https://github.com/mumuki/mulang-scratch
cd mulang-scratch
nexe -i src/index.js -o mulang-scratch
```

## Usage

```bash
mulang-scratch --help
```
