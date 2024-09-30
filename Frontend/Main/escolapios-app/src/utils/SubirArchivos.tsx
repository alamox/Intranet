import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';

interface FileUploadProps {
    onFileUpload: (file: File) => void;
    disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, disabled = false }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            onFileUpload(event.target.files[0]);
        }
    };
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        if (selectedFile) {
            onFileUpload(selectedFile);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} 
            disabled={disabled}/>
            <button onClick={handleUploadClick}><FaUpload/></button>
            
        </div>
    );
};

export default FileUpload;
