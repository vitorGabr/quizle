import { styled, Center } from 'styled-system/jsx';

export const Key = styled(Center, {
  base: {
    rounded: 'lg',
    h: '10',
    color: 'white',
    fontSize: 'md',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    _selected: {
      bgColor: 'neutral.700'
    },
    _hover: {
      bgColor: 'neutral.700'
    },
    cursor: 'pointer',
    userSelect: 'none'
  },
  variants: {
    type: {
      other: {
        px: '2',
        minW: {
          base: 'auto',
          md: '10'
        }
      },
      default: {
        w: {
          base: 'full',
          md: '10'
        }
      }
    },
    status: {
      correct: {
        bgColor: 'letterStatus.correct',
        color: 'neutral.700',
        _hover: {
          bgColor: 'letterStatus.correct'
        }
      },
      incorrect: {
        bgColor: 'letterStatus.incorrect'
      },
      unanswered: {
        bgColor: 'letterStatus.unanswered',
        color: 'neutral.700',
        _hover: {
          bgColor: 'letterStatus.unanswered'
        }
      },
      disabled: {
        bgColor: 'neutral.700'
      }
    }
  },
  defaultVariants: {
    type: 'default',
    status: 'disabled'
  }
});
