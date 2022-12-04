from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Optional, Email, Length

class NewUserForm(FlaskForm):
    """Form for registering a new user"""

    username = StringField("Username",  validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])
    email = StringField("Email", validators=[InputRequired(), Email()])
    first_name = StringField("First Name",  validators=[InputRequired()])
    last_name = StringField("Last Name",  validators=[InputRequired()])

class ExistingUserForm(FlaskForm):
    """Form for logging in an existing user"""

    username = StringField("Username",  validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])

class FeedbackForm(FlaskForm):
    """Form for adding new feedback"""

    title = StringField('Title', validators=[Length(min=1, max=100)])
    content = StringField('Content', validators=[InputRequired()])

class DeleteForm(FlaskForm):
    """"Blank form for deleting"""