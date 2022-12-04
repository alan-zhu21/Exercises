"""Seed file to make sample data for db."""

from models import Department, Employee, db
from app import app

# Create all tables
db.drop_all()
db.create_all()

d1 = Department(dept_code="mktg", dept_name="Marketing", phone="897-9999")
d2 = Department(dept_code="acct", dept_name="Accounting", phone="111-5429")
river = Employee(name="River Bottom", state="NY", dept_code="mktg")
joaquin = Employee(name="Joaquin Phoenix", dept_code="acct")

db.session.add(d1)
db.session.add(d2)
db.session.commit()

db.session.add(river)
db.session.add(joaquin)
db.session.commit()