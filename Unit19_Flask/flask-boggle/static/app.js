class BoggleGame {
	constructor(boardId, secs = 60) {
		this.secs = secs;
		this.showTimer();

		this.score = 0;
		this.showScore();
		this.words = new Set();
		// this.board = $('#' + boardId);

		this.timer = setInterval(this.tick.bind(this), 1000);

		$('#word-form').on('submit', this.handleSubmit.bind(this));
	}

	appendWord(word) {
		const $page = $('#word-list');
		$page.append(`<li>${word}</li>`);
	}

	showMsg(msg, type) {
		const $page = $('#msg-list');
		$page.text('');
		$page.text(msg).removeClass().addClass(`msg ${type}`);
	}

	async handleSubmit(e) {
		e.preventDefault();
		let guess = $('input').val();
		$('#word-input').val('');
		if (!guess) return;
		if (this.words.has(guess)) {
			this.showMsg(`Already found ${guess}`, 'err');
			return;
		}
		const response = await axios.get('/check', { params: { guess } });
		if (response.data.result === 'not-word') {
			this.showMsg(`${guess} is not a valid English word`, 'err');
		} else if (response.data.result === 'not-on-board') {
			this.showMsg(`${guess} is not a valid word on this board`, 'err');
		} else {
			this.appendWord(guess);
			this.words.add(guess);
			this.updateScore(guess);
			this.showMsg(`Added: ${guess}`, 'ok');
		}
	}

	updateScore(word) {
		this.score += word.length;
		this.showScore();
	}

	showScore(score = this.score) {
		$('.score').text(score);
	}

	showTimer() {
		$('.timer').text(this.secs);
	}

	async tick() {
		this.secs -= 1;
		this.showTimer();

		if (this.secs === 0) {
			clearInterval(this.timer);
			$('#word-form').hide();
			await this.scoreGame();
		}
	}

	async scoreGame() {
		const response = await axios.post('/score', { score: this.score });
		if (response.data.brokeRecord) {
			this.showMsg(`New record: ${this.score}`, 'ok');
		} else {
			this.showMsg(`Final score: ${this.score}`, 'ok');
		}
	}
}
