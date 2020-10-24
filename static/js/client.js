$(document).ready(() => {
    /*$.post(
        'api/add_note',
        {'title': 'first note!', 'text': 'hello there'},
        (json) => {
            console.log('creating note => ' + json.status);
        }
    )*/

    $.post(
        'api/get_notes', 
        {'start': 0, 'count': 10},
        (json) => {
            console.log('getting notes => ' + json.status);
            var notes = json.notes;
            console.log(notes)
        }
    )
})

