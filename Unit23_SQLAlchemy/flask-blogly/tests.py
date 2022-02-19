from app import app
from models import User
from unittest import TestCase

class Tests(TestCase):
    """Unit Tests for Redirects"""

    def test_redirect_home(self):
        with app.test_client() as client:
            resp = client.get('/')

            self.assertEqual(resp.status_code, 302)
            self.assertEqual(resp.location, '/users')

    def test_get_post(self):
        with app.test_client() as client:
            resp = client.post('/users/new', data={'first_name' : 'bob', 'last_name' : 'burger'})
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('bob burger', html)

            user = User.query.filter_by(first_name='bob')
            resp1 = client.get(f'/users/{user.id}/edit')

            self.assertEqual(resp1.status_code, 200)

            resp2 = client.post(f'/users/{user.id}/delete')

            self.assertEqual(resp2.status_code, 200)