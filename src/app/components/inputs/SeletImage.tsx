'use client';

import { ImageType } from '@/app/admin/add-products/AddProductForm';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface SelectImageProps {
  item?: ImageType;
  hadleFileChange: (value: File) => void;
}

const SelectImage: React.FC<SelectImageProps> = ({ item, hadleFileChange }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      hadleFileChange(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] }
  });
  return (
    <div
      {...getRootProps()}
      className="flex cursor-pointer items-center
    justify-center
    border-2
    border-dashed
    border-slate-400
    text-sm
    font-normal
    text-slate-400
    "
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here</p>
      ) : (
        <p>Drag drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default SelectImage;
