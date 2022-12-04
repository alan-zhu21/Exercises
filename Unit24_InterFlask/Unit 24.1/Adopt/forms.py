from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField, SelectField
from wtforms.validators import InputRequired, Optional, Email, URL, NumberRange, Length


class AddPetForm(FlaskForm):
    """Form for adding a new pet"""

    name = StringField("Name", validators=[InputRequired()])
    species = SelectField("Species", choices=[('cat', 'Cat'), ('dog', 'Dog'), ('porcupine', 'Porcupine')])
    photo_url = StringField("Picture in URL format", validators=[Optional(), URL()])
    age = FloatField("Age in years", validators=[Optional(), NumberRange(min=0.0, max=30.0)])
    notes = StringField("Notes", validators=[Optional(), Length(min=10)])

class EditPetForm(FlaskForm):
    """Form for editing an existing pet"""

    photo_url = StringField("Picture in URL format", validators=[Optional(), URL()])
    notes = StringField("Notes", validators=[Optional(), Length(min=10)])
    available = BooleanField("Available?")