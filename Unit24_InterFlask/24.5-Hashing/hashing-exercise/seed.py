from models import User, Feedback, db, bcrypt
from app import app

db.drop_all()
db.create_all()

u1 = User(username='marioman1', password='Iloveprincesspeach1!', email='motorcar21@gmail.com', first_name='ItsAMe!', last_name='AMaario!')

u2 = User(username='luigi123', password='Iloveprincesspeach1!', email='carmotor21@gmail.com', first_name='ItsAMe!', last_name='ALuigi!')

f1 = Feedback(title='First feedback', content='Not enough pizza!', username='marioman1')
f2 = Feedback(title='Another feedback', content='More pepperoni!', username='marioman1')
f3 = Feedback(title='My humble feedback', content='Add less pizza sauce', username='luigi123')

db.session.add(u1)
db.session.add(u2)
db.session.commit()

db.session.add(f1)
db.session.add(f2)
db.session.add(f3)
db.session.commit()