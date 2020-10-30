var _last_note = 0;
const _notes_per_load = 10;
let notes = [];
let note_views = [];

//getting notes from backend
let get_notes = (from, to) => {
    anim(to-from);
    $.post(
        'api/get_notes', 
        {'start': from, 'count': to},
        (json) => {
            _last_note += to;
            return json.notes;
        })
};

//send note to backend
let send_note = (title, text) => {
    $.post(
        'api/add_note',
        {'title': title, 'text': text},
        (json) => {
            return json.status === 'ok'
        }
    )
};

let update_notes_list = () => {
    $.post(
        'api/get_notes', 
        {'start': _last_note, 'count': _notes_per_load},
        (json) => {
            console.log('getting notes => ' + json.status);
            notes = json.notes;
            anim(notes.length);
            _last_note = notes.length;
            //notes seams like [{id, text, title, ..}, {}, {}]
            //we're get one of notes as n
            //and create Vue.component for it
            notes.forEach((n) => {
                note_views.push(create_note_view(n))
            });
            //and now we're append all views to DOM
            note_views.forEach((view) => {
                $('#notes').append(view.$el)
            });                    
        }
    );
};

//function for load-animation in address line
let anim = (count, i=0) => {
    s = '[' + '='.repeat(i) + '>' + '.'.repeat(count-i) + ']'; // https://site.com/#[======>...]
    location.hash = s;

    if (i < count) setTimeout(() => {anim(count, i+1)}, 300);
    else{
        location.hash = 'success!';
        setTimeout(() => {location.hash = ''}, 3000);
    }
}

//creating Vue.component from data
let create_note_view = (data) => {
    let n = new note({
        propsData: {
            note: data,
            edit: false
        }
    });
    return n.$mount();
    //$('#notes').append(n.$el)
}

//on page loaded
$(document).ready(() => {    
    // ---------------------------------------------------------- //

    //automaticaly load first 10 notes
    $.post(
        'api/get_notes', 
        {'start': _last_note, 'count': _notes_per_load},
        (json) => {
            _last_note += _notes_per_load;
            console.log('getting notes => ' + json.status);
            notes = json.notes;
            anim(notes.length);
            //notes seams like [{id, text, title, ..}, {}, {}]
            //we're get one of notes as n
            //and create Vue.component for it
            notes.forEach((n) => {
                note_views.push(create_note_view(n))
            });
            //and now we're append all views to DOM
            note_views.forEach((view) => {
                $('#notes').append(view.$el)
            });                    
        }
    );
    
    // ----------------------------------------------------------- //

    //ToDo: rework to loading more notes when page scrolled to bottom
    $('#load-more').click(() => {
        //get_notes(_last_note, _notes_per_load)
        //update #notes-list here
    });

   // ------------------------------------------------------------ //

   $('#create-note').click(() => {
    //check is now creation form is exist
    if (document.getElementById('note-edit') == null){
        //if no, we'll create new
        n = create_note_view({id: 'edit', title: '', text: '', date: ''});
        n.edit = true;
        $('#notes').append(n.$el);
        
        $('#note-edit').ready(() => {
            //there smooooothly scrolling to new note
            $([document.documentElement, document.body]).animate({
            scrollTop: $("#note-edit").offset().top
                }, 2000);
            //adding close function
            $('#close').click(() => $('#note-edit').remove())
            //and also we'll create handler for save-button 
            $('#note-edit').children('#save').click(() => {
                let n = {'title': $('#note-edit').children('#title').val(),
                         'text': $('#note-edit').children('#text').val()}

                //send note to backend
                send_note(n.title, n.text)
                $('#note-edit').remove()
                update_notes_list();
        });
        })
    }

    //if form is exist, make focus to it's text field
    else{
        $('#note-edit').children('textarea[name="text"]').focus()
    }
   });

   // ------------------------------------------------------------- //

});
