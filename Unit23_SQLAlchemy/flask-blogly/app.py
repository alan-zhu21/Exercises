"""Blogly application."""

from flask import Flask, render_template, redirect, request
from models import db, connect_db
from models import User
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.debug = True
app.config['SECRET_KEY'] = '123Letsgo'
debug = DebugToolbarExtension(app)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)
db.create_all()

@app.route('/')
def send_to_home():
    return redirect('/users')

@app.route('/users')
def home_page():
    users = User.query.all()
    return render_template("users.html", users=users)

@app.route('/users/<int:user_id>')
def show_user_details(user_id):
    user = User.query.get_or_404(user_id)
    return render_template("user_details.html", user=user)

@app.route('/users/new', methods=['GET'])
def add_user_page():
    return render_template('user_add_form.html')

@app.route('/users/new', methods=['POST'])
def user_db_insert():
    fn = request.form['first_name']
    ln = request.form['last_name']
    url = request.form['image_url']
    new_user = User(first_name=fn, last_name=ln ,image_url=url)
    db.session.add(new_user)
    db.session.commit()
    return redirect('/users')

@app.route('/users/<int:user_id>/edit')
def edit_user(user_id):
    user = User.query.get_or_404(user_id)
    return render_template('edit_user_page.html', user=user)

@app.route('/users/<int:user_id>/edit', methods=['POST'])
def user_db_update(user_id):
    fn = request.form['first_name']
    ln = request.form['last_name']
    url = request.form['image_url']
    user = User.query.get_or_404(user_id)
    user.first_name = fn
    user.last_name = ln
    user.image_url = url
    db.session.add(user)
    db.session.commit()
    return redirect('/users')

@app.route('/users/<int:user_id>/delete', methods=['POST'])
def user_db_delete(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return redirect('/users')

# @app.route('/add_to_db', methods=['POST'])
# def add_user_to_db():
#     new_user = request.form['first_name', 'last_name', 'image_url']
#     User(new_user)
#     redirect 

