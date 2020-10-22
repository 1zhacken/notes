import flask
from db import Notepad

app = flask.Flask(__name__)

#main page    
@app.route('/', methods=['GET'])
def index():
    return flask.render_template('/index.html')

################################### API ######################################

@app.route('/add_note', methods=['POST'])
def add_note():
    data = flask.request.form
    Notepad.add_note(data['title'], data['text'])
    return flask.jsonify({'status': 'ok'})

##############################################################################

@app.route('/get_notes', methods=['POST'])
def get_notes():
    return flask.jsonify({'notes': Notepad.get_notes(), 'status': 'ok'})

##############################################################################

@app.route('/update_note', methods=['POST'])
def update_note():
    data = flask.request.form
    Notepad.update_note(note_id=data['id'], title=data['title'], text=data['text'])
    return flask.jsonify({'status': 'ok'})

##############################################################################