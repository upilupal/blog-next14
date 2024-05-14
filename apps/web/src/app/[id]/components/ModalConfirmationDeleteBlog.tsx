import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { FC } from "react"

  interface ModalConfirmationDeleteBlogProps {
    open: boolean,
    setOpen: (value: boolean) => void,
    onDeleteBlog: () => void,
  }
  
  const  AlertDialogDemo: FC<ModalConfirmationDeleteBlogProps> = ({
    open,
    setOpen,
    onDeleteBlog
  }) => {
    return (
      <AlertDialog open = {open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDeleteBlog}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  
  export default AlertDialogDemo;