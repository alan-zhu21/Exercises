from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import InputRequired, Length, Optional

"""Forms for playlist app."""

from wtforms import SelectField
from flask_wtf import FlaskForm


class PlaylistForm(FlaskForm):
    """Form for adding playlists."""

    # Add the necessary code to use this form
    name = StringField("Name", validators=[InputRequired()])
    description = StringField("Description", validators=[Length(max=100), Optional()])

class SongForm(FlaskForm):
    """Form for adding songs."""

    # Add the necessary code to use this form
    title = StringField("Title", Validators=[InputRequired()])
    artist = StringField("Artist", Validators=[InputRequired()])


# DO NOT MODIFY THIS FORM - EVERYTHING YOU NEED IS HERE
class NewSongForPlaylistForm(FlaskForm):
    """Form for adding a song to playlist."""

    song = SelectField('Song To Add', coerce=int)
