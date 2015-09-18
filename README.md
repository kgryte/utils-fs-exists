Exists
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Tests whether a path exists on the filesystem.


## Installation

``` bash
$ npm install utils-fs-exists
```


## Usage

``` javascript
var exists = require( 'utils-fs-exists' );
```

#### exists( path, clbk )

Tests whether a path exists on the filesystem.

``` javascript
exists( __dirname, done );

function done( bool ) {
	if ( bool ) {
		console.log( '...path exists.' );
	} else {
		console.log( '...path does not exist.' );
	}
}
```

The above callback signature matches the now __deprecated__ [`fs.exists()`](https://nodejs.org/api/fs.html#fs_fs_exists_path_callback) API. The function also accepts the more conventional `error`-first style callback signature found in most asynchronous Node APIs.

``` javascript
exists( __dirname, done );

function done( error, bool ) {
	if ( error ) {
		console.error( error );
	}
	if ( bool ) {
		console.log( '...path exists.' );
	} else {
		console.log( '...path does not exist.' );
	}
}
```


#### exists.sync( path )

Synchronously tests whether a path exists on the fileystem.

``` javascript
var bool = exists.sync( __dirname );
// returns <boolean>
```


## Notes

*	The following is considered an anti-pattern:

	``` javascript
	var fs = require( 'fs' ),
		path = require( 'path' );

	var file = path.join( __dirname, 'foo.js' );
	if ( exists.sync( __dirname ) ) {
		file = fs.readFileSync( file );
	}
	```

	Because time elapses between checking for existence and performing IO, at the time IO is performed, the path can no longer be guaranteed to exist. In other words, here, a race condition exists between the process attempting to read and another process attempting to delete.

	Instead, the following pattern is preferred, where `errors` are handled explicitly:

	``` javascript
	var fs = require( 'fs' ),
		path = require( 'path' );

	var file = path.join( __dirname, 'foo.js' );
	try {
		file = fs.readFileSync( file );
	} catch ( error ) {
		console.log( 'unable to read file.' );
		console.error( error );
	}
	```

*	Nevertheless, use cases exist where one desires to check existence __without__ performing IO. For example,

	``` javascript
	var fs = require( 'fs' ),
		path = require( 'path' );

	var file = path.join( __dirname, 'foo.js' );
	if ( exists.sync( file ) ) {
		console.log( 'Don\'t overwrite the file!' );
	} else {
		fs.writeFileSync( file, 'beep', {
		'encoding': 'utf8'
		});
	}
	```


## Examples

``` javascript
var exists = require( 'utils-fs-exists' );

// Sync:
console.log( exists.sync( __dirname ) );
// returns true

console.log( exists.sync( 'beepboop' ) );
// returns false


// Async:
exists( __dirname, done );
exists( 'beepboop', done );

function done( error, bool ) {
	if ( error ) {
		console.error( error.message );
	} else {
		console.log( bool );
	}
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/utils-fs-exists.svg
[npm-url]: https://npmjs.org/package/utils-fs-exists

[travis-image]: http://img.shields.io/travis/kgryte/utils-fs-exists/master.svg
[travis-url]: https://travis-ci.org/kgryte/utils-fs-exists

[codecov-image]: https://img.shields.io/codecov/c/github/kgryte/utils-fs-exists/master.svg
[codecov-url]: https://codecov.io/github/kgryte/utils-fs-exists?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/utils-fs-exists.svg
[dependencies-url]: https://david-dm.org/kgryte/utils-fs-exists

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/utils-fs-exists.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/utils-fs-exists

[github-issues-image]: http://img.shields.io/github/issues/kgryte/utils-fs-exists.svg
[github-issues-url]: https://github.com/kgryte/utils-fs-exists/issues
