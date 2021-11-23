# Put your app in here.

from flask import Flask, request

from operations import add, div, mult, sub

app = Flask(__name__)

@app.route('/add')
def do_add():
    '''Adds a and b'''

    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    result = add(a, b)

    return str(result)

@app.route('/sub')
def do_sub():
    '''Subtracts a from b'''

    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    result = sub(a, b)

    return str(result)

@app.route('/mult')
def do_mult():
    '''Multiples a and b'''

    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    result = mult(a, b)

    return str(result)

@app.route('/div')
def do_div():
    '''Divides a into b'''

    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    result = div(a, b)

    return str(result)
