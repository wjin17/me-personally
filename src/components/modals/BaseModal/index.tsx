import { useEffect } from "react";

export interface BaseModalProps extends React.ComponentPropsWithoutRef<"div"> {
  onClose: () => void;
}

const BaseModal: React.FC<BaseModalProps> = ({ onClose, children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="fixed left-0 top-[6rem] flex h-[calc(100vh-6rem)] w-screen items-center justify-center">
      <div
        className="absolute h-full w-full bg-neutral-500 opacity-50"
        onClick={onClose}
      />
      <div className="absolute h-2/3 w-full max-w-md p-4">{children}</div>
    </div>
  );
};

export default BaseModal;
