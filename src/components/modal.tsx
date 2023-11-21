import { Portal } from '@ark-ui/react';
import { Flex, Stack, styled } from 'styled-system/jsx';
import { Dialog, DialogProps } from './ui/dialog';

export const Demo = (props: DialogProps) => {
  return (
    <Modal open={props.open}>
      <Stack gap="8" p="6" textAlign="center">
        <styled.h1 fontSize="xl" fontWeight="bold">
          Progresso!
        </styled.h1>
        <Flex>
          {[...Array(5)].map((_, i) => (
            <Stack key={i}>
              <styled.h2 fontSize="lg" fontWeight="bold">
                {i + 1}º ano
              </styled.h2>
              <Stack gap="2">
                <styled.p>
                  <strong>Palavras:</strong> 0/10
                </styled.p>
                <styled.p>
                  <strong>Letras:</strong> 0/10
                </styled.p>
              </Stack>
            </Stack>
          ))}
        </Flex>
      </Stack>
    </Modal>
  );
};

function Modal({
  children,
  open
}: {
  children: React.ReactNode;
  open?: boolean;
}) {
  return (
    <Dialog.Root open={open}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>{children}</Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
