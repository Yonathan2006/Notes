<script>
  import { notes } from '../store/notes'
  import { themeColor, fontColor } from '../store/theme'
  import { fly } from 'svelte/transition' 
  import { text,lang } from '../store/config'
  
  let modal
  const toggleModal = () => modal.toggle({
    animation: 'fade',
    animationOptions: {duration: .1}
  })
  const deleteAll = () => {
    ons.notification.confirm($text.menu.alerts.remove)
      .then(allowed => {
        if (allowed) {
          if ($notes.length > 0) {
            $notes = []
            ons.notification.alert($text.menu.alerts.removed)
          } else {
            ons.notification.alert($text.menu.alerts.nothingToRemove)
          }
        }
        
      })
  }
  const toggleMode = (e) => {
    if (e.target.checked === true) {
      $themeColor = 'dark'
    } else {
      $themeColor = localStorage.getItem('lastTheme')
    }
  }
  let selectionActive = false
  const toggleSelection = () => selectionActive = !selectionActive
  
  const themes = ['dark','light','primary','success','secondary','danger','warning','info']
  const setTheme = theme => {
    $themeColor = theme
    localStorage.setItem('lastTheme',$themeColor)
  }
</script>

<ons-icon class="bi bi-list-ul text-{$fontColor}"
  on:click={toggleModal}
/>
<ons-modal bind:this={modal} class="menu bg-{$themeColor} text-{$fontColor}">
  <h1 class="display-2 text-{$fontColor}">{ $lang == 'ES' ? 'Menú' : 'Menu' }</h1>
  <ons-fab 
    class="bi bi-x-lg text-{$fontColor} bg-{$themeColor} close"
    on:click={toggleModal}
  />
  <ons-list class="list bg-{$themeColor}">
    <ons-list-item class="lead text-{$fontColor}" on:click={deleteAll}>
      <ons-icon class="bi bi-trash me-4 ms-4"/>
      {$text.menu.deleteAllItem}
    </ons-list-item>
    <ons-list-item class="lead text-{$fontColor}">
      <ons-icon class="bi bi-moon me-4 ms-4"/>
      {$text.menu.darkModeItem}
      <div class="form-check form-switch dark-mode-switch">
        <input 
          type="checkbox" 
          class="form-check-input"
          on:change={toggleMode}
          checked="{$themeColor == 'dark'}"
        >
      </div>
    </ons-list-item>
    <ons-list-item on:click={toggleSelection} class="lead text-{$fontColor}">
      <ons-icon class="bi bi-palette me-4 ms-4" />
      {$text.menu.selectThemeItem}
      {#if selectionActive}
        <div transition:fly="{{ y: 100}}" class="selection border alert alert-{$themeColor}">
          <p class="display-5">{$text.menu.pickThemeText}</p>
          <i class="bi bi-x-lg close-select"></i>
          <div class="row colors row-cols-4">
          {#each themes as theme (theme)}
            <div 
              class="col bg-{theme} text-light color border rounded"
              on:click="{() => setTheme(theme)}"
            >
            </div>
          {/each}
          </div>
        </div>
      {/if}
    </ons-list-item>
    
  </ons-list>
</ons-modal>

<style>
  .list {
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-right: 15px;
  }
  .close {
    z-index: 0;
    position: fixed;
    top: 15px;
    right: 15px;
  }
  .selection {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 90%;
    overflow-y: scroll
  }
  
  .menu {
    position: fixed;
  }
  .dark-mode-switch {
    position: absolute;
    right: 10px
  }
  .colors {
    justify-content: space-around
  }
  .color {
    height: 5rem;
  }
  .close-select {
    position: absolute;
    right: 5px;
    top: 5px;
  }
</style>