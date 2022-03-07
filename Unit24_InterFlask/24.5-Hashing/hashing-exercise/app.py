from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db, db, User, Feedback
from forms import NewUserForm, ExistingUserForm, FeedbackForm, DeleteForm
from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import Unauthorized

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///auth_exercise"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "abc123"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)

toolbar = DebugToolbarExtension(app)

@app.route('/')
def homepage():
    return redirect('/register')


@app.route('/register', methods=["GET", "POST"])
def register_user():
    """Retrieves registration form and interacts with db to add new user and redirects"""

    form = NewUserForm()

    if form.validate_on_submit():
        username = form.data.username
        password = User.register(username, form.data.password)
        email = form.data.email
        first_name = form.data.first_name
        last_name = form.data.last_name
        new_user = User(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError:
            form.username.errors.append('Username taken. Please pick another')
            return render_template('register.html', form=form)
        session['user_id'] = new_user.id
        flash('Successfully Created Your Account!')
        return redirect('/users/<username>')
    
    return render_template('register.html', form=form)


@app.route('/users/<username>')
def show_user_page(user_id):
    """Landing page for successful login"""

    if "user_id" not in session:
        flash('Please login first!')
        return redirect('/')

    user = User.query.get_or_404(user_id)
    feedback = user.feedback
    return render_template('secret.html', user=user, all_feedback=feedback)


@app.route('/login', methods=['GET', 'POST'])
def show_login_page():
    """Handles GET (shows login form) and POST (updates DB) requests for logging into the site"""

    form = ExistingUserForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)
        if user:
            session['user_id'] = user.id
            flash(f'Welcome Back, {user.username}!')
            return redirect('/users/<username>')
        else:
            form.username.errors = ['Invalid username/password']
    return render_template('login.html', form=form)


@app.route('/logout')
def logout_user():
    session.pop('user_id')
    flash('Goodbye!')
    return redirect('/')


@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):

    if "user_id" not in session or username != session['user_id']:
        raise Unauthorized()

    user = User.query.get(username)
    db.session.delete(user)
    db.session.commit()
    session.pop('username')

    return redirect('/')


@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def add_feedback(username):

    if "user_id" not in session or username != session['user_id']:
        raise Unauthorized()

    form = FeedbackForm()

    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data

        feedback = Feedback(title=title, content=content, username=username)
        db.session.add(feedback)
        db.session.commit()

        return redirect(f'/users/{feedback.username}')

    else:
        
        return render_template('add_feedback_form.html', form=form)


@app.route('/feedback/<int:fb_id>/update', methods=['GET', 'POST'])
def edit_feedback(fb_id):

    feedback = Feedback.query.get_or_404(fb_id)

    if "user_id" not in session or feedback.username != session['user_id']:
        raise Unauthorized()

    form = FeedbackForm(obj=feedback)

    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data
        db.session.commit()
        flash('Feedback Updated!')
        return redirect(f'/users/{feedback.username}')

    else:
        return render_template('edit_feedback.html', feedback=feedback, form=form)


@app.route('/feedback/<int:fb_id>/delete', methods=['POST'])
def delete_feedback(fb_id):

    feedback = Feedback.query.get_or_404(fb_id)

    if "user_id" not in session or feedback.username != session['user_id']:
        raise Unauthorized()

    form = DeleteForm()

    if form.validate_on_submit():
        db.session.delete(form)
        db.session.commit()

    return redirect(f'/users/{feedback.username}')
