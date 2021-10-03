import { derived,readable } from 'svelte/store'
import { localStore } from './notes'

export const lang = readable(
  navigator.language.match(/(es|ES)/) ? 'ES' : 'EN'
)

export const text = derived(lang,
  $language => (
    $language == 'ES' ?
    ({
      appName: 'YM Notas',
      headText: 'Notas',
      emptyList: 'No tienes notas.',
      addNoteText: 'Nueva Nota',
      addNoteInputsPlaceholders: {
        name: 'Nombre de nota:',
        text: 'Texto de nota:'
      },
      menu: {
        deleteAllItem: 'Remover Todas Las Notas',
        darkModeItem: 'Modo Oscuro',
        selectThemeItem: 'Seleccionar Tema',
        pickThemeText: 'Seleccione un tema',
        alerts: {
          remove: 'Todas las notas seran removidas! ¿Desea continuar?',
          removed: 'Todas las notas han sido removidas!',
          nothingToRemove: 'No hay notas para remover!'
        }
      },
      noteInfo: {
        nameEdit: 'Nuevo nombre:',
        textEdit: 'Note text:'
      }
    }) : ({
      appName: 'YM Notes',
      headText: 'Notes',
      emptyList: 'Nothing to see here...',
      addNoteText: 'New Note',
      addNoteInputsPlaceholders: {
        name: 'Note Name:',
        text: 'Note Text:',
      },
      menu: {
        deleteAllItem: 'Remove All Notes',
        darkModeItem: 'Dark Mode',
        selectThemeItem: 'Select Theme',
        pickThemeText: 'Pick a theme',
        alerts: {
          remove: 'All the notes will be removed! Do you want to continue?',
          removed: 'All the notes had been removed!',
          nothingToRemove: 'There\'s no notes to remove!'
        }
      },
      noteInfo: {
        nameEdit: 'New Name:',
        textEdit: 'Note Text:'
      }
    })
  )
)