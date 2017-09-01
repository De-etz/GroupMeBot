module.exports.generateSlap = function generateSlap(attacker, victim) {
	var phrases = [
		'$v was shot by $a.',
		'$v was pricked to death.',
		'$v ran into a cactus while trying to escape $a.',
		'$v drowned.',
		'$v drowned whilst trying to escape $a.',
		'$v blew up.',
		'$v was blown up by $a.',
		'$v hit the ground too hard.',
		'$v fell from a high place.',
		'$v fell off a ladder.',
		'$v fell into a patch of cacti.',
		'$v was doomed to fall by $a.',
		'$v was blown from a high place by $a.',
		'$v was squashed by a falling anvil.',
		'$v burned to death.',
		'$v walked into a fire whilst fighting $a.',
		'$v tried to swim in lava.',
		'$v was guillotined to death. Twenty-four.',
		'$v was struck by lightning, twice.',
		'$v was slain by $a.',
		'$a finished off $v.',
		'$v starved to death.',
		'$v suffocated in a wall.',
		'$v was knocked into the void by $a.',
		'$v was pummeled by $a.',
		'$v was fragged by $a.',
		'$v was desynchronized.',
		'$v was wasted.',
		'$v\'s bones are scraped clean by the desolate wind.',
		'$v has died of dysentery.',
		'$v fainted.',
		'$v is out of usable Pokemon! $v whited out!',
		'$v is out of usable Pokemon! $v blacked out!',
		'$v whited out!',
		'$v blacked out!',
		'$v says goodbye to this cruel world.',
		'$v got rekt.',
		'$v was sawn in half by $a.',
		'$v died. I blame $a.',
		'$v was axe-murdered by $a.',
		'$v\'s melon was split by $a.',
		'$v was slice and diced by $a.',
		'$v was split from crotch to sternum by $a.',
		'$v\'s death put another notch in $a\'s axe.',
		'$v died impossibly!',
		'$v died from $a\'s mysterious tropical disease.',
		'$v escaped infection by dying.',
		'$v played hot-potato with a grenade.',
		'$v was knifed by $a.',
		'$v fell on his sword.',
		'$v ate a grenade.',
		'$v practiced being $a\'s clay pigeon.',
		'$v is what\'s for dinner!',
		'$v was terminated by $a.',
		'$v divided by 0',
		'$v tried to cancel parts of sums',
		'$v was shot before being thrown out of a plane.',
		'$v died and reincarnated as a goat.',
		'$a threw $v off a building.',
		'$v is sleeping with the fishes.',
		'$a replaced all of $v\'s music with Nickelback.',
		'$a spammed $v\'s email.',
		'$a made $v a knuckle sandwich.',
		'$a hit $v with a small, interstellar spaceship.',
		'$v was quickscoped by $a.',
		'$a put $v in check-mate.',
		'$a RSA-encrypted $v and deleted the private key.',
		'$a put $v in the friendzone.',
		'$a slapped $v with a DMCA takedown request!',
		'$v became a corpse blanket for $a.',
		'Death is when the monsters get you. Death comes for $v.',
		'Cowards die many times before their death. $v never tasted death but once.',
		'$v.exe has stopped responding.',
		'$v was inverted by $a',
		'$v was caught by Mr. Greenhill',
		'$v was the victim of North Korean missile strike"'
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