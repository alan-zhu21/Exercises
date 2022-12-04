from flask import Flask, render_template, flash, redirect
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet
from forms import AddPetForm, EditPetForm

app = Flask(__name__)
app.config['SECRET_KEY'] = 'ThisIsHidden123'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adoption_agency_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def homepage():
    """displays home page"""

    pets = Pet.query.all()
    return render_template('homepage.html',pets=pets)

@app.route('/add', methods=['GET','POST'])
def add_pet_form():
    """provides form for adding a pet and handles the changes in the db"""

    form = AddPetForm()

    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo = form.photo_url.data
        age = form.age.data
        notes = form.notes.data
        new_pet = Pet(name=name, species=species, photo_url=photo, age=age, notes=notes)
        db.session.add(new_pet)
        db.session.commit()
        flash(f'Added {name}')
        return redirect('/')
    else:
        return render_template('pet_add_form.html', form=form)

@app.route('/<int:pet_id>', methods=['GET', 'POST'])
def show_pet_details(pet_id):
    """shows details and handles edits for a particular pet"""

    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet) # for prepopulating inputs for editing

    if form.validate_on_submit():
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        pet.available = form.available.data
        db.session.commit()
        flash(f"{pet.name} updated")
        return redirect('/')
    else:
        return render_template('pet_details.html', pet=pet, form=form)