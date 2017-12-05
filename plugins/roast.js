module.exports.generateroast = function generateroast(attacker, victim) {
	var phrases = [
		'Plastic surgery can fix ugliness. $v\'s stupidness lasts forever.',
		'Syria rates their chemical weapons from 1 to $v\'s breath.',
		'$a knows five fat people, and $v\'s three of them.',
		'$v\'s the reason the gene pool needs a lifeguard.',
		'200,000 years of human evolution, and $v is the product. Sad.',
		'"It\'s yuuuuuuge" - Trump, on $v\'s mother',
		'$a caught $v using cheat codes for Wii Fit',
		'Some explain to $v that the M&Ms with Ws aren\'t defects.',
		'$a once looked out and saw $v chasing the garbage truck with a shopping list',
		'$v eats Kroger-brand poptarts.',
		'$v still plays Pokemon Go',
		];
	
	var rand = Math.floor((Math.random() * phrases.length));
	
	var phrase = phrases[rand];
	var roastPhrase = '';
	
	for (i = 0; i < phrase.length; i++) {
		var currentChar = phrase.charAt(i);
		if (currentChar == '$') {
			i++;
			if (phrase.charAt(i) == 'v') {
				roastPhrase += victim;
			} else {
				roastPhrase += attacker;
			}
		} else {
			roastPhrase += currentChar;
		}
	}	
	
	return roastPhrase;
};