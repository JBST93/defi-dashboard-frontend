import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const Select = dynamic(() => import('react-select'), { ssr: false });

interface DAOOption {
  value: string;
  label: string;
}

interface DAOSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedDAOs: string[]) => void;
  availableDAOs: DAOOption[];
}

const DAOSelectModal: React.FC<DAOSelectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  availableDAOs,
}) => {
  const [selectedDAOs, setSelectedDAOs] = useState<DAOOption[]>([]);

  // Remove this condition to always render the modal
  // if (!isOpen) return null;

  const handleSave = () => {
    onSave(selectedDAOs.map((dao) => dao.value));
    onClose();
  };

  return (
    // Add a conditional class to show/hide the modal
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Select DAOs</h2>
        <Select
          isMulti
          options={availableDAOs}
          value={selectedDAOs}
          onChange={(selected) => setSelectedDAOs(selected as DAOOption[])}
          className="mb-4"
        />
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-200 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DAOSelectModal;
