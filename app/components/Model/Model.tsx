"use client";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModelProps {
  isActive: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: String;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
}

const Model: React.FC<ModelProps> = ({
  isActive,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryLabel,
}) => {
  const [showModel, setShowModel] = useState(isActive);

  useEffect(() => {
    setShowModel(isActive);
  }, [isActive]);

  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModel(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAct = useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [disabled, secondaryAction]);

  return (
    <>
      {isActive && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
          <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-frll lg:h-auto md:h-auto">
            <div
              className={`translate duration-300 h-full ${
                showModel ? "translate-y-0" : "translate-y-full"
              } ${showModel ? `opacity-100` : `opacity-0`}`}
            >
              <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus-outline-none">
                <header className="flex items-center p-4 rounded-t justify-center relative border-b-[1px]">
                  <button
                    className="p-1 border-0 hover:opacity-70 transition absolute left-8"
                    onClick={handleClose}
                  >
                    <IoMdClose />
                  </button>
                  <div className="text-lg font-semibold">{title}</div>
                </header>
                <section className="relative px-6 pt-8 pb-6 flex-auto">
                  {body}
                </section>
                <div className="flex flex-col gap-4 px-8 pt-2 pb-8">
                  <div className="flex item-center gap-4 w-full">
                    {secondaryAction && secondaryLabel && (
                      <Button
                        disabled={disabled}
                        label={secondaryLabel}
                        onClick={handleSecondaryAct}
                      />
                    )}
                    <Button
                      disabled={disabled}
                      label={actionLabel}
                      onClick={handleSubmit}
                    />
                  </div>
                  {footer}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Model;
