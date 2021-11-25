from unittest import TestCase
from app import app
from flask import session, request
from boggle import Boggle


class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    def test_home(self):
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn("<div id='score'>Score:", html)
            self.assertIn('board', session)
            self.assertIsNone(session.get('highscore'))
            self.assertIsNone(session.get('nplays'))

    def test_check_word(self):
        with app.test_client() as client:
            with client.session_transaction() as sess:
                sess['board'] = [['C', 'A', 'T', 'A', 'B'],
                                ['C', 'A', 'T', 'A', 'B'],
                                ['C', 'A', 'T', 'A', 'B'],
                                ['C', 'A', 'T', 'A', 'B'],
                                ['C', 'A', 'T', 'A', 'B']]
        res = client.get('/check?guess=cat')
        self.assertEqual(res.json['result'], 'ok')

    def test_not_on_board(self):
        with app.test_client() as client:
            client.get('/')
            res = client.get('/check?guess=impossible')
            self.assertEqual(res.json['result'], 'not-on-board')
            
    def test_invalid_word(self):
        with app.test_client() as client:
            client.get('/')
            res = client.get('/check?guess=fsdhvs')
            self.assertEqual(res.json['result'], 'not-word')