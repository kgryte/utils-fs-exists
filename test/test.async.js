/* global require, describe, it */
'use strict';

var mpath = './../lib/async.js';


// MODULES //

var chai = require( 'chai' ),
	fs = require( 'fs' ),
	proxyquire = require( 'proxyquire' ).noCallThru(),
	exists = require( mpath );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'async', function tests() {

	it( 'should export a function', function test() {
		expect( exists ).to.be.a( 'function' );
	});

	it( 'should positively test', function test( done ) {
		exists( __filename, onExists );
		function onExists( bool ) {
			assert.isTrue( bool );
			done();
		}
	});

	it( 'should negatively test', function test( done ) {
		exists( 'beepboopbebop', onExists );
		function onExists( bool ) {
			assert.isFalse( bool );
			done();
		}
	});

	it( 'should positively test using `stat`', function test( done ) {
		var exists = proxyquire( mpath, {
			'fs': {
				'stat': fs.stat
			}
		});
		exists( __filename, onExists );
		function onExists( bool ) {
			assert.isTrue( bool );
			done();
		}
	});

	it( 'should negatively test using `stat`', function test( done ) {
		var exists = proxyquire( mpath, {
			'fs': {
				'stat': fs.stat
			}
		});
		exists( 'beepboopbebop', onExists );
		function onExists( bool ) {
			assert.isFalse( bool );
			done();
		}
	});

	it( 'should positively test and support error-first callbacks', function test( done ) {
		exists( __filename, onExists );
		function onExists( error, bool ) {
			assert.isNull( error );
			assert.isTrue( bool );
			done();
		}
	});

	it( 'should negatively test and support error-first callbacks', function test( done ) {
		exists( 'beepboopbebop', onExists );
		function onExists( error, bool ) {
			assert.ok( error );
			assert.isFalse( bool );
			done();
		}
	});

	it( 'should positively test using `stat` and support error-first callbacks', function test( done ) {
		var exists = proxyquire( mpath, {
			'fs': {
				'stat': fs.stat
			}
		});
		exists( __filename, onExists );
		function onExists( error, bool ) {
			assert.isNull( error );
			assert.isTrue( bool );
			done();
		}
	});

	it( 'should negatively test using `stat` and support error-first callbacks', function test( done ) {
		var exists = proxyquire( mpath, {
			'fs': {
				'stat': fs.stat
			}
		});
		exists( 'beepboopbebop', onExists );
		function onExists( error, bool ) {
			assert.ok( error );
			assert.isFalse( bool );
			done();
		}
	});

});
