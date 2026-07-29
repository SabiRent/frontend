import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as React from "react";

export interface ModalProps {
  /** Controlled open state */
  open?: boolean;
  /** Called when the modal requests to open/close */
  onOpenChange?: (open: boolean) => void;
  /** Optional element that opens the modal when clicked. Must be a single element (e.g. <Button>Open</Button>) — Base UI merges trigger props directly onto it via `render`. */
  trigger?: React.ReactElement;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Modal body */
  children?: React.ReactNode;
  /** Optional footer, typically action buttons */
  footer?: React.ReactNode;
  /** Hide the built-in top-right close (X) icon */
  hideCloseButton?: boolean;
  /** Modal content width */
  width?: React.CSSProperties["width"];
  /** Modal content background color */
  backgroundColor?: React.CSSProperties["backgroundColor"];
  /** Modal content border radius */
  borderRadius?: React.CSSProperties["borderRadius"];
  className?: string;
}

/**
 * Reusable Modal built on shadcn's Dialog (Base UI underneath).
 *
 * Usage:
 *   const [open, setOpen] = useState(false);
 *
 *   <Modal
 *     open={open}
 *     onOpenChange={setOpen}
 *     title="Delete project"
 *     description="This action can't be undone."
 *     hideCloseButton
 *     footer={
 *       <>
 *         <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
 *         <Button variant="destructive" onClick={handleDelete}>Delete</Button>
 *       </>
 *     }
 *   >
 *     <p>Modal body content goes here.</p>
 *   </Modal>
 */
export function Modal({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  hideCloseButton = false,
  width = "500px",
  backgroundColor = "#FDFEFE",
  borderRadius = "12px",
  className,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger render={trigger} />}

      <DialogContent
        showCloseButton={!hideCloseButton}
        className={`max-w-[calc(100%-2rem)] sm:max-w-none ${className ?? ""}`}
        style={{ width, backgroundColor, borderRadius }}
      >
        {(title || description) && (
          <DialogHeader>
            {title && (
              <DialogTitle className="text-[#031316]">{title}</DialogTitle>
            )}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        {children}

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
