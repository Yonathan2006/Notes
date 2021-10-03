<script>
  import { noteInfo,notes } from '../store/notes'
  import {scale} from 'svelte/transition'
  import { onDestroy } from 'svelte'
  import { themeColor, fontColor } from '../store/theme'
  import { text as lang } from '../store/config'
  
  let modal
  let name = ''
  let text = ''
  let id = null
  
  const toggleModal = () => modal.toggle({
    animation: 'fade',
    animationOptions: { duration: .1 }
  })
  
  let opened = false
  const unsubscribe = noteInfo.subscribe(note => {
    if (opened && modal) {
      name = note.name
      text = note.text
      id = note.id
      toggleModal()
    }
    opened = true
  })
  onDestroy(() => {
    unsubscribe()
  })
  let isEditing = false
  const toggleEdit = () => {
    isEditing = !isEditing
    saveNote()
  }
  function saveNote() {
    let noteIndex = $notes.findIndex((nt) => nt.id == id)
    let note = {
      ...$notes[noteIndex],text,name,
    }
    $notes[noteIndex] = note
  }
</script>

<ons-modal bind:this={modal} class="bg-{$themeColor} text-{$fontColor} p-2">
  <ons-fab
    class="bi bi-x-lg close bg-{$themeColor} text-{$fontColor}"
    on:click={toggleModal}
  />
  <h6 class="title text-{$fontColor} display-6 {isEditing ? 'd-none' : ''}">{name}</h6>
  <input type=text bind:value={name} 
    class="form-control name-edit {isEditing ? '' : 'd-none'} form-control-lg bg-{$themeColor == 'dark' ? 'dark' : 'light'} text-{$themeColor == 'dark' ? 'light' : 'dark'}" placeholder="{$lang.noteInfo.nameEdit}">
  <ons-fab class="edit bi bi-{isEditing ? 'check-lg' : 'pencil'} bg-{$themeColor} text-{$fontColor}"
    on:click="{toggleEdit}"
  />
  <textarea class="form-control form-control-lg bg-{$themeColor == 'dark' ? 'dark' : 'light'} text-{$themeColor == 'dark' ? 'light' : 'dark'}" bind:value={text} on:input={saveNote} placeholder="{$lang.noteInfo.textEdit}"></textarea>
</ons-modal>

<style>
  .name-edit {
    position: fixed;
    top: 10px;
    width: 95%;
    left: 50%;
    transform: translateX(-50%);
  }
  .edit {
    position: fixed;
    top: 15px;
    right: 90px;
  }
  .close {
    position: fixed;
    top: 15px;
    right: 15px;
  }
  .title {
    position: fixed;
    top: 5px;
    left: 5px;
    color: #222;
  }
  textarea {
    position: fixed;
    top: 15%;
    width: 95%;
    left: 50%;
    transform: translateX(-50%);
    height: 80%;
    transition: .2s;
  }
  textarea:focus {
    height: 98%;
    top: 15%;
    width: 99%;
  }
</style>