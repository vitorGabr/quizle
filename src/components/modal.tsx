import { Portal } from "@ark-ui/react";
import { styled } from "styled-system/jsx";
import {
  Dialog,
  DialogBackdrop,
  DialogContainer,
  DialogContent,
  type DialogProps,
} from "@/components/ui/dialog";

export const Demo = (props: DialogProps) => {
  return (
    <Dialog {...props}>
      <Portal>
        <DialogBackdrop />
        <DialogContainer>
          <DialogContent>
            <styled.div width="20vw" height="20vh">
              asd
            </styled.div>
          </DialogContent>
        </DialogContainer>
      </Portal>
    </Dialog>
  );
};
