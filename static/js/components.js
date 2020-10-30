//vue components are here

const note = Vue.component('note', {
    template: 
    `
    <div class="note" v-bind:id="'note-'+note.id">
        <input type="button" class="edit-button button" id="edit" value="edit" v-if="!edit">
        <input v-if="edit" class="button" value="x" type="button" id="close" style="float: right; text-align: center;">
        <input v-if="edit" type="text" class="edit" name="title" placeholder="title" id="title" required>
        <div v-else class="title">
            {{ note.title }}
        </div>
        <textarea id="text" v-if="edit" type="text" class="edit" name="text" placeholder="note" required></textarea>
        <div v-else class="text">
            {{ note.text }}
        </div>
        <div class="datetime">
            {{ note.date.split('.')[0] }}
        </div>
        <input v-if="edit" type="submit" id="save" class="button" value="save">
    </div>
    `,
    props: ['note', 'edit']
});