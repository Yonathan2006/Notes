<script>
  import { fly, scale } from 'svelte/transition'
  import { noteInfo } from '../store/notes'
  import { createEventDispatcher } from 'svelte'
  import { themeColor, fontColor } from '../store/theme'
  
  export let name = ''
  export let text = ''
  export let id 
  const showInfo = () => {
    $noteInfo = {
      text,
      name,
      id
    }
  }
  const dispatch = createEventDispatcher()
  const removeNote = () => {
    dispatch('remove-note')
  }
</script>

<div class="col note alert alert-{$themeColor} rounded border"  in:scale="{{duration: 300}}" out:fly="{{duration: 300, x:-300}}"
  on:click={showInfo}
>
  <b class="lead">{name}</b> 
  <i class="float-end bi bi-trash display-5 m-2"
    on:click|stopPropagation={removeNote}
  />
  <hr style="margin: 2px"/>
  <span class="text-small">{text.slice(0,25)}...</span>
</div>

<style>
  .note-info {
    position: fixed;
    top: 0px;
  }
  .note:hover {
    box-shadow: 0 5px 8px #00000030;
  }
</style>