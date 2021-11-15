from flask import Flask, render_template, request, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
debug = DebugToolbarExtension(app)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

responses = []

@app.route('/')
def show_home():
    title = satisfaction_survey.title
    instructions = satisfaction_survey.instructions
    return render_template('home.html', title=title, instructions=instructions)

@app.route('/start')
def start():
    return redirect('/questions/0')

@app.route('/questions/<int:question_num>')
def show_question(question_num):
    if question_num != len(responses):
        flash('Invalid question')
        return redirect(f'/questions/{len(responses)}')
    elif len(responses) == len(satisfaction_survey.questions):
        return redirect('/thanks')
    else:
        question = satisfaction_survey.questions[question_num].question
        choices = satisfaction_survey.questions[question_num].choices
        return render_template('question.html', question_number=question_num, question=question, choices=choices)

@app.route('/answer', methods=['POST'])
def handle_answer():
    answer = request.form['client_answer']
    responses.append(answer)
    if len(responses) == len(satisfaction_survey.questions):
        return redirect('/thanks')
    else:
        return redirect(f'/questions/{len(responses)}')

@app.route('/thanks')
def thank():
    return render_template('thanks.html')