<script>
  import { notes } from '../store/notes.js'
  import { text as lang} from '../store/config.js'
  import Note from './Note.svelte'
  import { flip } from 'svelte/animate'
  import { fly } from 'svelte/transition'
  
  const removeNote = (id) => {
    const idx = $notes.findIndex(nt => nt.id == id)
    
    $notes.splice(idx,1)
    $notes = $notes
  }
</script>

<h1 class="heading mt-5 pt-3">{$lang.headText}</h1>
<div class="row list p-2">
  {#each $notes as {name,text,id} (id)}
    <div class="col" animate:flip="{{duration: 300}}">
      <Note {name} {text} {id}
        on:remove-note="{() => removeNote(id)}"
        on:selcted-note="{alert}"
      />
    </div>
  {:else}
  <p class="lead text-center" in:fly="{{y: 300}}">
      {$lang.emptyList}
  </p>
  {/each}
  <div class="foot"></div>
</div>

<style>
  .heading {
    font-weight: 400;
    text-align: center;
  }
  .lead {
    height: 400px
  }
  .list {
    background: transparent;
    overflow-y: scroll;
    height: 100%;
  }
  .foot {
    height: 200px
  }
</style>