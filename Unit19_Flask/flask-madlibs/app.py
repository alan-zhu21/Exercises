from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from stories import story

app = Flask(__name__)
app.config['SECRET_KEY'] = 'keyword1'
debug = DebugToolbarExtension(app)

@app.route('/')
def madlib_form():
    '''create and show the form'''

    prompts = story.prompts

    return render_template('form.html', prompts = prompts)

@app.route('/story')
def serve_story():
    '''create and show the story'''

    text = story.generate(request.args)

    return render_template('story.html', text=text)