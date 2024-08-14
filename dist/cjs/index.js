/**
 * Console color reference.
 */
const colorReference = {
	Reset: "\x1b[0m",
	Bright: "\x1b[1m",
	Dim: "\x1b[2m",
	Underscore: "\x1b[4m",
	Blink: "\x1b[5m",
	Reverse: "\x1b[7m",
	Hidden: "\x1b[8m",

	FgBlack: "\x1b[30m",
	FgRed: "\x1b[31m",
	FgGreen: "\x1b[32m",
	FgYellow: "\x1b[33m",
	FgBlue: "\x1b[34m",
	FgMagenta: "\x1b[35m",
	FgCyan: "\x1b[36m",
	FgWhite: "\x1b[37m",
	FgGray: "\x1b[90m",

	BgBlack: "\x1b[40m",
	BgRed: "\x1b[41m",
	BgGreen: "\x1b[42m",
	BgYellow: "\x1b[43m",
	BgBlue: "\x1b[44m",
	BgMagenta: "\x1b[45m",
	BgCyan: "\x1b[46m",
	BgWhite: "\x1b[47m",
	BgGray: "\x1b[100m",
};

/**
 * Concatenates a set of strings without spaces to allow colors to flow in the console.
 * @param  {...any} args The string to concatenate.
 * @returns The concatenated string.
 */
const __concat_colors = (...args) => args.join("");

/**
 * Convert any number less than 10 into a display of "0"
 * @param {number} number The number to convert.
 * @returns {string} The converted number display.
 */
const __double_o = (number) => {
	return +number < 10 ? `0${number}` : number;
};

/**
 * Generates a date string.
 * @returns {string}
 */
const dateString = () => {
	try {
		const date = new Date();

		return `${date.getFullYear()}-${__double_o(
			date.getMonth() + 1
		)}-${__double_o(date.getDate())} @ ${__double_o(
			date.getHours()
		)}:${__double_o(date.getMinutes())}:${__double_o(
			date.getSeconds()
		)}:${__double_o(date.getMilliseconds())}`.padEnd(25, " ");
	} catch (err) {
		warn("Failed to create datestring.", err);

		return "NO_DATE_INFO";
	}
};

/**
 * Create a log message with a date string.
 * @param  {...string} args The content to generate a log for.
 * @returns A log message with a date string.
 */
const __console = (...args) => [
	`${__concat_colors(
		colorReference.FgCyan,
		dateString(),
		colorReference.Reset
	)} |`,
	...args,
];

/**
 * Generates an error message.
 * @param  {...string} args The content to generate a log for.
 */
const error = (...args) =>
	console.error(
		...__console(
			__concat_colors(
				colorReference.BgRed,
				colorReference.Bright,
				colorReference.FgWhite,
				"ERROR:",
				colorReference.Reset,
				colorReference.FgRed
			),
			...args,
			colorReference.Reset
		)
	);

/**
 * Generates a message.
 * @param  {...string} args The content to generate a log for.
 */
const log = (...args) => console.log(...__console(...args));

/**
 * Generates a warning message.
 * @param  {...string} args The content to generate a log for.
 */
const warn = (...args) =>
	console.warn(
		...__console(
			__concat_colors(
				colorReference.BgYellow,
				colorReference.Bright,
				colorReference.FgWhite,
				"WARNING:",
				colorReference.Reset,
				colorReference.FgYellow
			),
			...args,
			colorReference.Reset
		)
	);

/**
 * Generates a success message.
 * @param  {...string} args The content to generate a log for.
 */
const success = (...args) =>
	console.log(
		...__console(
			__concat_colors(colorReference.FgGreen, ...args),
			colorReference.Reset
		)
	);

/**
 * Generates an info message.
 * @param  {...string} args The content to generate a log for.
 */
const info = (...args) =>
	console.debug(
		...__console(
			__concat_colors(colorReference.FgBlue, ...args),
			colorReference.Reset
		)
	);

/**
 * Logs to the bottom of the console and overwrites existing line.
 * @param  {...string} args The content to generate a log for.
 */
const bottom = (...args) => {
	process.stdout.write("\u001b[1G");
	process.stdout.clearLine(1);
	process.stdout.write(__console(...args).join(" "));
};

module.exports = {
	colorReference,
	dateString,
	error,
	log,
	warn,
	success,
	info,
	bottom,
};
