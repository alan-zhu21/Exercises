from flask import Flask, render_template, request, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
debug = DebugToolbarExtension(app)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

# responses = []

@app.route('/')
def show_home():
    title = satisfaction_survey.title
    instructions = satisfaction_survey.instructions
    return render_template('home.html', title=title, instructions=instructions)

# @app.route('/start')
# def start():
#     return redirect('/questions/0')

@app.route('/session', methods=['POST'])
def handle_session():
    session['responses'] = []
    return redirect('/questions/0')


@app.route('/questions/<int:question_num>')
def show_question(question_num):
    responses = session['responses']
    q_num = len(responses)
    print(session['responses'])
    print(f'q_num is equal to {q_num} in questions')
    print(f'question_num is equal to {question_num} in questions')
    if question_num != q_num:
        flash('Invalid question')
        return redirect(f'/questions/{q_num}')
    elif q_num == len(satisfaction_survey.questions):
        return redirect('/thanks')
    else:
        question = satisfaction_survey.questions[question_num].question
        choices = satisfaction_survey.questions[question_num].choices
        return render_template('question.html', question_number=question_num, question=question, choices=choices)


@app.route('/answer', methods=['POST'])
def handle_answer():
    answer = request.form['client_answer']
    responses = session['responses']
    responses.append(answer)
    session['responses'] = responses
    q_num = len(responses)
    print(session['responses'])
    print(f'q_num is equal to {q_num} in answers')
    if q_num == len(satisfaction_survey.questions):
        return redirect('/thanks')
    else:
        return redirect(f'/questions/{q_num}')


@app.route('/thanks')
def thank():
    return render_template('thanks.html')