import * as AlertDialog from "@radix-ui/react-alert-dialog";

import { Button } from "../Button";

import {
  Overlay,
  Content,
  Title,
  Description,
  Actions,
} from "./ConfirmDialog.styles";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <Overlay />

        <Content>
          <Title>{title}</Title>

          <Description>{description}</Description>

          <Actions>
            <AlertDialog.Cancel asChild>
              <Button variant="secondary">Cancel</Button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <Button variant="danger" onClick={onConfirm}>
                {confirmLabel}
              </Button>
            </AlertDialog.Action>
          </Actions>
        </Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
