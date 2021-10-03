<script>
  import Menu from './Menu.svelte'
  import { themeColor, fontColor } from '../store/theme'
  import { text } from '../store/config'
</script>
<ons-toolbar class="bg-{$themeColor} ">
  <div class="center" style="color: var(--bs-{$fontColor})">{$text.appName}</div>
  <div class="right me-2 options">
    <Menu/>
  </div>
</ons-toolbar>

<style>
  .options {
    font-size: 1.5em
  }
</style>