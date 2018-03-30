// https://github.com/rollup/rollup
// https://github.com/rollup/rollup-starter-lib
// https://github.com/rollup

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

// console.log('library name' + pkg.libName + ', version: ' + pkg.version);

export default [
	// browser-friendly UMD build
	{
		input: './src/index.js',
		output: {
			name: pkg.libName,
			file: pkg.main,
			format: 'umd'
		},
		plugins: [
			babel(babelrc()),
			// resolve(), // so Rollup can find `ms`
			commonjs() // so Rollup can convert `ms` to an ES module
		]
	},
	{
		input: './src/index.js',
		output: [{ file: pkg.cjs, format: 'cjs' }],
		plugins: [babel(babelrc())]
	},
	{
		input: './src/index.js',
		output: [{ file: pkg.module, format: 'es' }]
	}
];
