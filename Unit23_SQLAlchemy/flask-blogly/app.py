"""Blogly application."""

from flask import Flask, render_template, redirect, request
from models import db, connect_db
from models import User, Post, Tag, PostTag
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
    posts = Post.query.filter_by(user_id = user_id)
    return render_template("user_details.html", user=user, posts=posts)

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

@app.route('/users/<int:user_id>/posts/new', methods=['GET'])
def show_post_add_form(user_id):
    user = User.query.get_or_404(user_id)
    tags = Tag.query.all();
    return render_template('new_post_form.html', user=user, tags=tags)

@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def handle_new_post(user_id):
    if request.form['submitted'] == 'no_cancel':
        #handle the db update
        title = request.form['title']
        content = request.form['post_content']
        new_post = Post(title=title, content=content, user_id=user_id)
        db.session.add(new_post)
        db.session.commit()
        post_id = new_post.id
        return redirect(f'/posts/{post_id}')
    else:
        return redirect(f'/users/{user_id}')

@app.route('/posts/<int:post_id>')
def show_post_details(post_id):
    post = Post.query.get_or_404(post_id)
    user = User.query.get_or_404(post.user_id)
    return render_template('post_details.html',post=post, user=user)

@app.route('/posts/<int:post_id>/edit', methods=['GET'])
def show_edit_post(post_id):
    post = Post.query.get_or_404(post_id)
    user = User.query.get_or_404(post.user_id)
    post_tags = post.tags
    tags = Tag.query.all();
    return render_template('edit_post.html', post=post, user=user, post_tags=post_tags, tags=tags)

@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def db_edit_post(post_id):
    edit_post = Post.query.get_or_404(post_id)
    edit_post.title = request.form['title']
    edit_post.content = request.form['content']
    tag_ids = [int(num) for num in request.form.getlist("tags")]
    edit_post.tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
    db.session.add(edit_post)
    db.session.commit()
    return redirect(f'/posts/{post_id}')

@app.route('/posts/<int:post_id>/delete', methods=['POST'])
def db_delete_post(post_id):
    remove_post = Post.query.get_or_404(post_id)
    user_id = remove_post.user_id
    db.session.delete(remove_post)
    db.session.commit()
    return redirect(f'/users/{user_id}')

@app.route('/tags')
def show_tag_list():
    tags = Tag.query.all()
    return render_template('tag_list.html', tags=tags)

@app.route('/tags/new', methods=['GET'])
def show_add_tag_form():

    # posts = Post.query.all()
    return render_template('add_tag.html')

@app.route('/tags/new', methods=['POST'])
def db_add_tag():
    tag_name = request.form['tag_name']
    tag = Tag(name=tag_name)
    db.session.add(tag)
    db.session.commit()
    return redirect('/tags')

@app.route('/tags/<int:tag_id>')
def show_tag_details(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    posts = tag.posts
    return render_template('tag_details.html', tag=tag, posts=posts)

@app.route('/tags/<int:tag_id>/edit', methods=['GET'])
def show_tag_edit_form(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    return render_template('edit_tag.html', tag=tag)

@app.route('/tags/<int:tag_id>/edit', methods=['POST'])
def db_edit_tag(tag_id):
    tag_name = request.form['tag_name']
    tag = Tag.query.get_or_404(tag_id)
    tag.name = tag_name
    db.session.add(tag)
    db.session.commit()
    return redirect('/tags')

@app.route('/tags/<int:tag_id>/delete', methods=['GET'])
def db_delete_tag(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    db.session.delete(tag)
    db.session.commit()
    return redirect('/tags')