import { useEffect } from "react";

const ModalConfirm = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000); // 🔥 Cierra el modal después de 2 segundos
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <p className="text-lg font-semibold text-center">{message}</p>
        <button onClick={onClose} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full">
          OK
        </button>
      </div>
    </div>
  );
};

export default ModalConfirm;
