$(document).ready(() => {
    //config consts
    const _notes_per_load = 10;

    //data vars
    let notes = [];
    let last_note = 0;

    // ---------------------------------------------------------- //

    //automaticaly load first 10 notes
    $.post(
        'api/get_notes', 
        {'start': last_note, 'count': _notes_per_load},
        (json) => {
            last_note += _notes_per_load;
            console.log('getting notes => ' + json.status);
            notes = json.notes;
            console.log(notes);
        }

        //load data to #notes-list here
    );
    
    // ----------------------------------------------------------- //

    $('load-more').click(() => {
        $.post(
            'api/get_notes', 
            {'start': last_note, 'count': _notes_per_load},
            (json) => {
                last_note += _notes_per_load;
                console.log('getting notes => ' + json.status);
                notes = json.notes;
            }
        )

        //update #notes-list here
    });

   // ------------------------------------------------------------ //
})