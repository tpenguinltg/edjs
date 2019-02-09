const AddressParser = {};

AddressParser.tokens = {
	NTH_LINE: 'NTH_LINE',
	COMMA: 'COMMA',
	SEMICOLON: 'SEMICOLON',
};

AddressParser.createToken = function(type, value) {
	return { type, value };
};

AddressParser.extractAddress = function(input) {
	return input.match(/^\d*(?:[,;]\d*)*/)[0];
};

AddressParser.tokenizeAddress = function(address) {
	const tokens = [];
	let match;
	for (; address; address = address.substring(match[0].length)) {
		if (match = /^\d+/.exec(address))
			tokens.push(AddressParser.createToken(AddressParser.tokens.NTH_LINE, parseInt(match[0], 10)));
		else if (match = /^,/.exec(address))
			tokens.push(AddressParser.createToken(AddressParser.tokens.COMMA));
		else if (match = /^;/.exec(address))
			tokens.push(AddressParser.createToken(AddressParser.tokens.SEMICOLON));
	}

	return tokens;
};

if (typeof module !== "undefined")
	module.exports = AddressParser;
