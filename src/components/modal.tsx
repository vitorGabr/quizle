import { Portal } from "@ark-ui/react";
import { XIcon } from "lucide-react";
import { Stack, styled } from "styled-system/jsx";
import { Dialog, DialogProps } from "./ui/dialog";

export const Demo = (props: DialogProps) => {
  return (
    <Dialog.Root {...props}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Stack gap="8" p="6">
              <Stack gap="1">
                <Dialog.Title>Dialog Title</Dialog.Title>
                <Dialog.Description>Dialog Description</Dialog.Description>
              </Stack>
              <Stack gap="3" direction="row" width="full">
                <Dialog.CloseTrigger asChild>
                  <styled.button width="full">Cancel</styled.button>
                </Dialog.CloseTrigger>
                <styled.button width="full">Confirm</styled.button>
              </Stack>
            </Stack>
            <Dialog.CloseTrigger asChild position="absolute" top="2" right="2">
              <styled.button aria-label="Close Dialog">
                <XIcon />
              </styled.button>
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
