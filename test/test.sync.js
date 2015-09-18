/* global require, describe, it */
'use strict';

var mpath = './../lib/sync.js';


// MODULES //

var chai = require( 'chai' ),
	fs = require( 'fs' ),
	proxyquire = require( 'proxyquire' ).noCallThru(),
	exists = require( mpath );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'sync', function tests() {

	it( 'should export a function', function test() {
		expect( exists ).to.be.a( 'function' );
	});

	it( 'should positively test', function test() {
		assert.isTrue( exists( __filename ) );
	});

	it( 'should negatively test', function test() {
		assert.isFalse( exists( 'beepboopbebop' ) );
	});

	it( 'should positively test using `statSync`', function test() {
		var exists = proxyquire( mpath, {
			'fs': {
				'statSync': fs.statSync
			}
		});
		assert.isTrue( exists( __filename ) );
	});

	it( 'should negatively test using `statSync`', function test() {
		var exists = proxyquire( mpath, {
			'fs': {
				'statSync': fs.statSync
			}
		});
		assert.isFalse( exists( 'beepboopbebop' ) );
	});

});
