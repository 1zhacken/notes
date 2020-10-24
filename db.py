### (on response) backend <-> (db) -> frontend
### (on data) frontend -> backend -> db
###
### db{ -> file
### _______________________
### | notes{ <- database
### |   | _________________
### |   | notepad{ <- table
### |   |   | note <- row
### |   |   | note <- row
### |   |   | ....
### |   |   | }
### |   | /technical_data/ <- table
### |   |}
### |   | __________________
### |   | notepad2{} <- table
### | ______________________
### | .......
### | }
### ________________________

import peewee as pw
from config import config as cfg
from datetime import datetime as dt

#database configuration
class DB:
    def __init__(self):
        self.db = pw.SqliteDatabase(cfg['db_file_name'])
        self.cursor = self.db.cursor()

    def __del__(self):
        self.db.close()

_db = DB()

class DB_Model(pw.Model):
    class Meta:
        database = _db.db

#database interface
class Notepad:
    @classmethod
    def get_notes():
        return Note.select().dicts()
    
    @classmethod 
    def get_note_by_id(shit, note_id):
        return Note.get(Note.note_id==note_id)

    @classmethod
    def get_notes_by_amount(shit, start, amount):
        notes = Note.select().where(
            Note.note_id >= start & 
            Note.note_id < start+amount
        )
        req = []
        for n in notes:
            req.append({'id': n.note_id, 'title': n.title, 'text': n.text, 'date': n.created_at})
        
        return req

    @classmethod
    def add_note(shit, title='new note', text=''):
        return Note (title       = title, 
                     text        = text, 
                     created_at  = str(dt.now())
                    ).save()

    @classmethod
    def update_note(shit, note_id, title, text):
        return Note (note_id    = note_id,
                     title      = title,
                     text       = text
                    ).save()
    
    @classmethod
    def delete_note(shit, note_id):
        return Note.get(Note.note_id==note_id).delete_instance()


#table struct for notes in notepad
class Note(DB_Model):
    note_id     = pw.AutoField(column_name=cfg['notepad']['note_id'])
    title       = pw.TextField(column_name=cfg['notepad']['title'])
    text        = pw.TextField(column_name=cfg['notepad']['text'])
    created_at  = pw.TextField(column_name=cfg['notepad']['created_at'])

    class Meta:
        table_name = cfg['notepad']['table_name']
        