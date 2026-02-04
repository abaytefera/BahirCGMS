import React, { useRef, useState } from 'react';
import { UploadCloud, X } from "lucide-react";

export default function FileUpload({ onFilesChange }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const click = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      id: crypto.randomUUID(),
      file, 
      name: file.name,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));

    const updatedTotal = [...selectedFiles, ...newFiles];
    setSelectedFiles(updatedTotal);
    
    // Send only the actual File objects to the parent
    if (onFilesChange) {
      onFilesChange(updatedTotal.map(f => f.file));
    }
  };

  const removeFile = (id) => {
    const filtered = selectedFiles.filter(f => f.id !== id);
    const removed = selectedFiles.find(f => f.id === id);
    if (removed?.preview) URL.revokeObjectURL(removed.preview);
    
    setSelectedFiles(filtered);
    if (onFilesChange) {
      onFilesChange(filtered.map(f => f.file));
    }
  };

  return (
    <div className="py-4">
      <label className="block text-[10px] font-black text-gray-400 uppercase mb-4">Supporting Evidence</label>
      <div 
        onClick={() => click.current.click()}
        className="relative border-2 border-dashed border-gray-100 rounded-[2rem] p-10 text-center hover:bg-emerald-50/30 transition-all cursor-pointer"
      >
        <input type="file" ref={click} multiple onChange={handleFileChange} className="hidden" />
        <div className="flex flex-col items-center">
          <UploadCloud size={32} className="text-emerald-600 mb-2" />
          <p className="text-gray-900 font-bold text-sm">Click to upload files</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {selectedFiles.map((file) => (
          <div key={file.id} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
            {file.preview ? (
              <img src={file.preview} className="w-full h-full object-cover" alt="preview" />
            ) : (
              <div className="flex items-center justify-center h-full text-[10px] text-gray-400">{file.name}</div>
            )}
            <button 
              type="button" 
              onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
              className="absolute top-2 right-2 bg-white rounded-lg p-1 text-rose-500"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}