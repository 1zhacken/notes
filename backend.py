import db
import flask

app = flask.Flask(__name__)

#main page    
@app.route('/', methods=['GET'])
def index():
    return flask.render_template('/index.html')

################################### API ######################################

@app.route('/api/add_note', methods=['POST'])
def add_note():
    data = flask.request.form
    db.Notepad.add_note(data['title'], data['text'])
    return flask.jsonify({'status': 'ok'})

##############################################################################

@app.route('/api/get_notes', methods=['POST'])
def get_notes():
    data = flask.request.form
    notes = db.Notepad.get_notes_by_amount(int(data['start']), int(data['count']))
    #                                  1 --^               2 --^  | где 3???? ─┐
    # "get_notes_by_amount() takes 2 positional arguments but 3 were given"  <─┘
    # по всей видимости, peewee передает первым параметром какой-то мусор. но зачем?
    
    return flask.jsonify({'notes': notes, 'status': 'ok'})

##############################################################################

@app.route('/api/update_note', methods=['POST'])
def update_note():
    data = flask.request.form
    db.Notepad.update_note(note_id=data['id'], title=data['title'], text=data['text'])
    return flask.jsonify({'status': 'ok'})

##############################################################################

@app.route('/api/delete_note', methods=['POST'])
def delete_note():
    data = flask.request.form
    db.Notepad.delete_note(note_id=data['id'])
    return flask.jsonify({'status': 'ok'})

##############################################################################