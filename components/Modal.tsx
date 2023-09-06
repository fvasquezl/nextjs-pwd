import React, { ReactNode, Dispatch, SetStateAction } from "react";

interface ModalProps {
  children: ReactNode;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ children, modalOpen, setModalOpen }) => {
  return (
    <>
      {modalOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    onClick={() => setModalOpen(false)}
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        // <div className="bg-black/50 fixed inset-0">
        //   <div className="flex justify-center items-center h-full">
        //     <div className="flex flex-col items-end bg-slate-300 w-1/2 p-5">
        //       <button
        //         onClick={() => setModalOpen(false)}
        //         className="text-2xl mb-3"
        //       >
        //         &times;
        //       </button>

        //       {children}
        //     </div>
        //   </div>
        // </div>
      )}
    </>
  );
};

export default Modal;
