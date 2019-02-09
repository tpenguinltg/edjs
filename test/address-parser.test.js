const assert = require("assert").strict;
const AddressParser = require("../src/address-parser");

describe("AddressParser", () => {
	describe("extractAddress", () => {
		function extractAddressTest(description, expectedAddress) {
			it(description, () => {
				const input = expectedAddress + "p";

				const address = AddressParser.extractAddress(input);

				assert.equal(address, expectedAddress);
			});
		}

		extractAddressTest("should extract an empty address", "");
		extractAddressTest("should extract a single digit numeric address", "4");
		extractAddressTest("should extract a single multi-digit numeric address", "45");

		extractAddressTest("should extract a comma range", "35,400");
		extractAddressTest("should extract a left-only comma range", "35,");
		extractAddressTest("should extract a right-only comma range", ",400");
		extractAddressTest("should extract an empty comma range", ",");

		extractAddressTest("should extract a semicolon range", "35;400");
		extractAddressTest("should extract a left-only semicolon range", "35;");
		extractAddressTest("should extract a right-only semicolon range", ";400");
		extractAddressTest("should extract an empty semicolon range", ";");

		extractAddressTest("should extract a multipart range", "1,4;9;16,25");
	});

	describe("tokenizeAddress", () => {
		function tokenizeAddressTest(description, address, expectedTokens) {
			it(description, () => {
				assert.deepEqual(
					AddressParser.tokenizeAddress(address),
					expectedTokens
				);
			});
		}

		tokenizeAddressTest("should tokenize the empty address", "", []);

		tokenizeAddressTest("should tokenize a single numerical address", "45", [
			AddressParser.createToken(AddressParser.tokens.NTH_LINE, 45),
		]);

		tokenizeAddressTest("should tokenize a single numerical address with a leading 0", "045", [
			AddressParser.createToken(AddressParser.tokens.NTH_LINE, 45),
		]);

		tokenizeAddressTest("should tokenize an empty comma range", ",", [
			AddressParser.createToken(AddressParser.tokens.COMMA),
		]);
		tokenizeAddressTest("should tokenize a left-sided comma range", "45,", [
			AddressParser.createToken(AddressParser.tokens.NTH_LINE, 45),
			AddressParser.createToken(AddressParser.tokens.COMMA),
		]);
		tokenizeAddressTest("should tokenize a right-sided comma range", ",600", [
			AddressParser.createToken(AddressParser.tokens.COMMA),
			AddressParser.createToken(AddressParser.tokens.NTH_LINE, 600),
		]);
		tokenizeAddressTest("should tokenize a comma range", "45,600", [
			AddressParser.createToken(AddressParser.tokens.NTH_LINE, 45),
			AddressParser.createToken(AddressParser.tokens.COMMA),
			AddressParser.createToken(AddressParser.tokens.NTH_LINE, 600),
		]);

		tokenizeAddressTest("should tokenize an empty semicolon range", ";", [
			AddressParser.createToken(AddressParser.tokens.SEMICOLON),
		]);
		tokenizeAddressTest("should tokenize a left-sided semicolon range", "45;", [
			AddressParser.createToken(AddressParser.tokens.NTH_LINE, 45),
			AddressParser.createToken(AddressParser.tokens.SEMICOLON),
		]);
		tokenizeAddressTest("should tokenize a right-sided semicolon range", ";600", [
			AddressParser.createToken(AddressParser.tokens.SEMICOLON),
			AddressParser.createToken(AddressParser.tokens.NTH_LINE, 600),
		]);
		tokenizeAddressTest("should tokenize a semicolon range", "45;600", [
			AddressParser.createToken(AddressParser.tokens.NTH_LINE, 45),
			AddressParser.createToken(AddressParser.tokens.SEMICOLON),
			AddressParser.createToken(AddressParser.tokens.NTH_LINE, 600),
		]);

		tokenizeAddressTest("should tokenize a multipart address", "1,4;9;16,25", [
			AddressParser.createToken(AddressParser.tokens.NTH_LINE, 1),
			AddressParser.createToken(AddressParser.tokens.COMMA),
			AddressParser.createToken(AddressParser.tokens.NTH_LINE, 4),
			AddressParser.createToken(AddressParser.tokens.SEMICOLON),
			AddressParser.createToken(AddressParser.tokens.NTH_LINE, 9),
			AddressParser.createToken(AddressParser.tokens.SEMICOLON),
			AddressParser.createToken(AddressParser.tokens.NTH_LINE, 16),
			AddressParser.createToken(AddressParser.tokens.COMMA),
			AddressParser.createToken(AddressParser.tokens.NTH_LINE, 25),
		]);
	});
});
