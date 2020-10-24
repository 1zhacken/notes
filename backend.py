import db
import flask

app = flask.Flask(__name__)

#main page    
@app.route('/', methods=['GET'])
def index():
    return flask.render_template('/index.html')

################################### API ######################################

@app.route('/add_note', methods=['POST'])
def add_note():
    data = flask.request.form
    db.Notepad.add_note(data['title'], data['text'])
    return flask.jsonify({'status': 'ok'})

##############################################################################

@app.route('/get_notes', methods=['POST'])
def get_notes():
    data = flask.request.form
    return flask.jsonify({'notes': db.Notepad.get_notes_by_amount(data['start'], data['count']), 'status': 'ok'})

##############################################################################

@app.route('/update_note', methods=['POST'])
def update_note():
    data = flask.request.form
    db.Notepad.update_note(note_id=data['id'], title=data['title'], text=data['text'])
    return flask.jsonify({'status': 'ok'})

##############################################################################