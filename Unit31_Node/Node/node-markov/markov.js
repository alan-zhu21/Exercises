/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== '');
		this.makeChains();
	}

	/** set markov chains:
    *
    *  for text of "the cat in the hat", chains will be
    *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		this.mc = {};
		this.words.forEach((word, index) => {
			if (this.mc[word]) {
				this.mc[word].push(this.words[index + 1]);
			} else {
				this.mc[word] = [ this.words[index + 1] ];
			}
		});
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		let text = [];
		let mc_array = Object.keys(this.mc);
		let start_word = mc_array[Math.floor(Math.random() * mc_array.length)];

		text.push(start_word);

		for (let i = 0; i < numWords - 1; i++) {
			let last_word = text[i];
			try {
				let word_options = this.mc[last_word];
				let rand_idx = Math.floor(Math.random() * word_options.length);
				let next_word = word_options[rand_idx];
				if (next_word) {
					text.push(next_word);
				} else {
					break;
				}
			} catch (error) {
				break;
			}
		}
		return text.join(' ');
	}
}

module.exports = { MarkovMachine };
