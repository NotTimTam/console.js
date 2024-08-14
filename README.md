# console.js

A tiny, dependency-less package for printing pretty, timestamped messages to the console.

# Installation

```terminal
npm i @nottimtam/console.js
```

# Usage

## ES6

```js
import { log, warn, success } from "@nottimtam/console.js";

log("This is a regular log.");
warn("This is a warning.");
success("This is a success message!");
```

## CJS

```js
const { log, warn, success } = require("@nottimtam/console.js");

log("This is a regular log.");
warn("This is a warning.");
success("This is a success message!");
```

# Reference

Several methods and resources are exposed by this package.

The `log`, `warn`, `success`, `error`, and `info` methods take a variable number of arguments and display them on the screen in a timestamped, color-coded format.

The `bottom` method does the same, but attempts to log the message at the very bottom of the console. This uses `process.stdout` and is not supported by all console systems.

The `dateString` method returns a formatted date string of the current date/time, in the same format used by the logging methods.

The `colorReference` object stores easy-to-use references for each color used in console logging in case more customization is needed.
