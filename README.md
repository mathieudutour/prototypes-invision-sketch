# Prototypes Invision ↔︎ Sketch

Translate your prototyping links back and forth between Sketch and Invision. Not all the features can be exactly translated and when that's the case, the original link will not be removed so that you can manually decide what to do.

## Installation

- [Download](../../releases/latest/download/prototypes-invision-sketch.sketchplugin.zip) the latest release of the plugin
- Un-zip
- Double-click on prototypes-invision-sketch.sketchplugin

## Development Guide

_This plugin was created using `skpm`. For a detailed explanation on how things work, checkout the [skpm Readme](https://github.com/skpm/skpm/blob/master/README.md)._

### Usage

Install the dependencies

```bash
npm install
```

Once the installation is done, you can run some commands inside the project folder:

```bash
npm run build
```

To watch for changes:

```bash
npm run watch
```

Additionally, if you wish to run the plugin every time it is built:

```bash
npm run start
```

### Debugging

To view the output of your `console.log`, you have a few different options:

- Use the [`sketch-dev-tools`](https://github.com/skpm/sketch-dev-tools)
- Run `skpm log` in your Terminal, with the optional `-f` argument (`skpm log -f`) which causes `skpm log` to not stop when the end of logs is reached, but rather to wait for additional data to be appended to the input

## License

MIT
