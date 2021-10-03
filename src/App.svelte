<script>
  import NavBar from './comps/NavBar.svelte'
  import AddNote from './comps/AddNote.svelte'
  import Notes from './comps/Notes.svelte'
  import NoteInfo from './comps/NoteInfo.svelte'
  import { notes } from './store/notes'
  import { themeColor, fontColor } from './store/theme'
</script>
<div class="bg-{$themeColor} text-{$fontColor} main">
  <NoteInfo />
  <NavBar />
  <Notes />
  <AddNote />
</div>
<style>
  .main {
    position: fixed;
    width: 100%;
    height: 100%;
  }
</style>