/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	exists = require( './../lib' );


// VARIABLES //

var expect = chai.expect;


// TESTS //

describe( 'utils-fs-exists', function tests() {

	it( 'should export a function', function test() {
		expect( exists ).to.be.a( 'function' );
	});

	it( 'should export a function to test for existence synchronously', function test() {
		expect( exists.sync ).to.be.a( 'function' );
	});

});
