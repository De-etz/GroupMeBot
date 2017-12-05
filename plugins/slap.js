module.exports.generateSlap = function generateSlap(attacker, victim) {
	var phrases = [
		'$v was shot by $a.',
		'$v was pricked to death.',
		'$v ran into a cactus while trying to escape $a.',
		'$v blew up.',
		'$v was blown up by $a.',
		'$v fell off a ladder.',
		'$v fell into a patch of cacti.',
		'$v was squashed by a falling anvil.',
		'$v burned to death.',
		'$v walked into a fire whilst fighting $a.',
		'$v tried to swim in lava.',
		'$v was struck by lightning, twice.',
		'$v starved to death.',
		'$v was pummeled by $a.',
		'$v was fragged by $a.',
		'"E tu, $a? Then fall, $v."',
		'$v was wasted.',
		'$v\'s bones are scraped clean by the desolate wind.',
		'$v has died of dysentery.',
		'$v is out of usable Pokemon! $v whited out!',
		'$v got rekt.',
		'$v was sawn in half by $a.',
		'$v died. I blame $a.',
		'$v was axe-murdered by $a.',
		'$v\'s melon was split by $a.',
		'$v was sliced and diced by $a.',
		'$v was split from crotch to sternum by $a.',
		'$v\'s death put another notch in $a\'s axe.',
		'$v died from $a\'s mysterious tropical disease.',
		'$v escaped infection by dying.',
		'$v played hot-potato with a grenade.',
		'$v was knifed by $a.',
		'$v fell on his sword.',
		'$v ate a grenade.',
		'$v caught a grenade for $a.',
		'$v practiced being $a\'s clay pigeon.',
		'$v is what\'s for dinner!',
		'$v was terminated by $a.',
		'$v divided by 0.',
		'$v tried to cancel parts of sums.',
		'$v was shot before being thrown out of a plane.',
		'$v died and reincarnated as a goat.',
		'$a threw $v off a building.',
		'$v is sleeping with the fishes.',
		'$a replaced all of $v\'s music with Nickelback.',
		'$a made $v a knuckle sandwich.',
		'$a hit $v with a small, interstellar spaceship.',
		'$v was quickscoped by $a.',
		'$a put $v in check-mate.',
		'$a RSA-encrypted $v and deleted the private key.',
		'$a put $v in the friendzone.',
		'$a slapped $v with a DMCA takedown request!',
		'Death is when the monsters get you. Death comes for $v.',
		'Cowards die many times before their death. $v never tasted death but once.',
		'$v.exe has stopped responding.',
		'$v was inverted by $a.',
		'$v was caught by Mr. Greenhill.',
		'$a left a horse head in $v\'s bed.',
		'$v was the victim of North Korean missile strike.'
		];
	
	var rand = Math.floor((Math.random() * phrases.length));
	
	var phrase = phrases[rand];
	var slapPhrase = '';
	
	for (i = 0; i < phrase.length; i++) {
		var currentChar = phrase.charAt(i);
		if (currentChar == '$') {
			i++;
			if (phrase.charAt(i) == 'v') {
				slapPhrase += victim;
			} else {
				slapPhrase += attacker;
			}
		} else {
			slapPhrase += currentChar;
		}
	}	
	
	return slapPhrase;
};