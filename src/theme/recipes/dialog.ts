import { dialogAnatomy } from '@ark-ui/anatomy';
import { defineSlotRecipe } from '@pandacss/dev';

export const dialog = defineSlotRecipe({
  className: 'dialog',
  slots: dialogAnatomy.keys(),
  base: {
    backdrop: {
      backdropFilter: 'blur(4px)',
      background: {
        base: 'rgba(0, 0, 0, 0.4)'
      },
      inset: '0',
      position: 'fixed',
      zIndex: 'overlay',
      _open: {
        animation: 'backdrop-in'
      },
      _closed: {
        animation: 'backdrop-out'
      }
    },
    positioner: {
      alignItems: 'center',
      display: 'flex',
      inset: '0',
      justifyContent: 'center',
      position: 'fixed',
      zIndex: 'modal'
    },
    content: {
      background: '#4a4a4a',
      borderRadius: 'xl',
      boxShadow: 'lg',
      minW: 'sm',
      position: 'relative',
      _open: {
        animation: 'dialog-in'
      },
      _closed: {
        animation: 'dialog-out'
      }
    },
    title: {
      fontWeight: 'semibold',
      textStyle: 'lg'
    },
    description: {
      color: 'white',
      textStyle: 'sm'
    }
  }
});
