from types import MethodType
from boggle import Boggle
from flask import Flask, render_template, request, session, jsonify, redirect
from flask_debugtoolbar import DebugToolbarExtension

boggle_game = Boggle()
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
debug = DebugToolbarExtension(app)


@app.route('/', methods=['GET','POST'])
def display_board():
    """Landing page for the main board"""
    
    html_board = boggle_game.make_board()
    session['board'] = html_board
    return render_template('index.html', board=html_board)

@app.route('/check')
def check_guess():
    """Checks submitted word using backend logic and returns outcome"""

    word = request.args.get('guess', '')
    board = session['board']
    result = boggle_game.check_valid_word(board, word)
    return jsonify({'result': result})

@app.route('/score', methods=['POST'])
def score_game():
    """Completes backend recordkeeping tasks and checks for any new high score"""
    
    score = request.json['score']
    highscore = session.get('highscore', 0)
    play_count = session.get('play_count', 0)
    session['play_count'] = play_count + 1
    session['highscore'] = max(score, highscore)

    return jsonify(brokeRecord=score > highscore)