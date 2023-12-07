import React from "react";

interface IProps {
  children: React.ReactNode | React.ReactElement;
  htmlFor: string;
  label: string;
  modalOpen: boolean;
  setModalOpen: (arg: boolean) => void;
  btnSize?: string;
  btnTheme?: string;
}

const Modal = ({
  children,
  htmlFor,
  label,
  modalOpen,
  setModalOpen,
  btnSize = "btn-md",
  btnTheme,
}: IProps) => {
  return (
    <>
      <label
        onClick={() => setModalOpen(true)}
        htmlFor={htmlFor}
        className={`btn rounded lg:mt-0 ${btnSize} ${btnTheme} `}
      >
        {label}
      </label>

      {modalOpen && (
        <>
          <input type="checkbox" id={htmlFor} className="modal-toggle" />
          <div className="modal">
            <div className="modal-box rounded">
              <div className="modal-action">
                <label
                  htmlFor={htmlFor}
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg font-normal"
                >
                  x
                </label>
              </div>
              {children}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
