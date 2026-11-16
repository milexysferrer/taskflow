import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { Overlay, Content, Header, Title, CloseButton } from "./Modal.styles";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}

export function Modal({ open, onOpenChange, title, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Overlay />

        <Content aria-describedby={undefined}>
          <Header>
            <Title>{title}</Title>

            <CloseButton aria-label="Close dialog">×</CloseButton>
          </Header>

          {children}
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
