type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm?: () => void;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-lg mx-auto my-6 transform transition-all duration-300 ease-out"
        role="document"
      >
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          {/* Modal Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
            <button
              type="button"
              className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-slate-500 bg-transparent border-0 outline-none opacity-60 hover:opacity-100 focus:outline-none"
              onClick={onClose}
            >
              ×
            </button>
          </div>

          {/* Modal Body */}
          <div className="relative flex-auto p-6">{children}</div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
            <button
              type="button"
              className="px-6 py-2 mb-1 mr-2 text-sm font-bold text-slate-600 uppercase transition-all duration-150 ease-linear bg-white border border-slate-200 rounded shadow outline-none hover:bg-slate-100 hover:shadow-md focus:outline-none"
              onClick={onClose}
            >
              Close
            </button>
            {onConfirm && (
              <button
                type="button"
                className="px-6 py-2 mb-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-600 rounded shadow outline-none hover:bg-blue-700 hover:shadow-lg focus:outline-none"
                onClick={onConfirm}
              >
                Confirm
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
