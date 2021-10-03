<script>
  import { scale } from 'svelte/transition'
  import { notes } from '../store/notes.js'
  import { text } from '../store/config'
  import { onMount } from 'svelte'
  import { themeColor, fontColor } from '../store/theme'
  import { uid } from 'uid'
  
  let modal;
  let isOpen = false
  let newNoteName = '',
    newNoteText = '';
  let isEditing = false;

  const toggleModal = () => {
    modal.toggle({
      animation: 'fade',
      animationOptions: {
        duration: .08
      }
    });
    isOpen = !isOpen;
  };
  
  const focuser = node => {
    node.on = node.addEventListener
    node.on('focus', () => isEditing = true)
    node.on('blur', () => isEditing = false)
  }

  
  const saveNote = () => {
    if (newNoteName) {
      const note = {
        name: newNoteName,
        text: newNoteText,
        id: uid()
      }
      $notes = [
        note,
        ...$notes
      ]
      newNoteName = ''
      newNoteText = ''
      toggleModal()
    }
  }
</script>
<ons-modal bind:this={modal} class="bg-{$themeColor} text-{$fontColor} p-3">
  <ons-fab class="bi bi-x-lg close me-5 bg-{$themeColor} text-{$fontColor}" on:click={toggleModal} />
  <h1 class="display-3 fixed-top text-{$fontColor}" style="transform: scale({ isEditing ? '0' : '1'}); transition: .1s">{$text.addNoteText}</h1>
  <ons-fab class="bi bi-check-lg bg-{$themeColor} text-{$fontColor}" on:click={saveNote} disabled="{!newNoteName}"/>
  <input class="form-control form-control-lg mb-3 bg-{$themeColor == 'dark' ? 'dark' : 'light'} text-{$themeColor == 'dark' ? 'light' : 'dark'}" placeholder="{$text.addNoteInputsPlaceholders.name}" bind:value={newNoteName} use:focuser />
  <textarea class="form-control form-control-lg note-text bg-{$themeColor == 'dark' ? 'dark' : 'light'} text-{$themeColor == 'dark' ? 'light' : 'dark'}" placeholder="{$text.addNoteInputsPlaceholders.text}" bind:value={newNoteText} use:focuser />
</ons-modal>
{#if !isOpen}
  <ons-fab 
    class="bi bi-plus-lg add bg-{$themeColor} text-{$fontColor}"
    on:click={toggleModal}
    transition:scale
  />
{/if}

<style>
  .add {
    z-index: 0;
    position: absolute;
    bottom: 15px;
    right: 15px
  }
  .note-text {
    height: 300px
  }
</style>