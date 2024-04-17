
import React, { useState } from 'react';
import { DocumentArrowUpIcon, DocumentCheckIcon } from "@heroicons/react/24/solid";
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next'


export const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleUpload = () => {
    // 在这里处理上传逻辑，例如使用 fetch 或 axios 发送文件到服务器
    console.log('上传文件:', file);
    // 实际应用中，这里应包含上传文件到服务器的代码
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4 border bg-custom7  rounded-xl w-full max-w-sm ">
      <div className="flex items-center justify-center rounded-lg bg-custom6 p-4 shadow-md">
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center w-16 h-16 bg-white rounded-full hover:bg-gray-400 transition duration-150 ease-in-out cursor-pointer"
        >
          {file ? (
            <DocumentCheckIcon className="w-10 h-10 text-custom0" />
          ) : (
            <DocumentArrowUpIcon className="w-10 h-10 text-custom0" />
          )}
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="sr-only"
        />
      </div>
      <span className="text-white z-10">支持格式：jpg, jpeg, png, gif, doc, docx, xls, xlsx, pdf, txt</span>
      {file && (
        <div className="flex flex-col bg-gray-100 p-4 rounded-md shadow-md z-10">
          <span className="block text-gray-800 font-medium mb-1">已选择文件：</span>
          <span className="block text-gray-500">{file.name}</span>
        </div>
      )}
    </div>
  );
};



export const FileMultiUpload = (onClose) => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

	//Sigle
  const handleSigleFile = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };
	//Multi
  const handleFileChange = (event) => {
    const newFiles = event.target.files;
    if (newFiles.length > 0) {
      setFiles([...files, ...newFiles]);
    }
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleUpload = () => {
    // 在这里处理上传逻辑，例如使用 fetch 或 axios 发送文件到服务器
    console.log('上传文件:', files);
    // 实际应用中，这里应包含上传文件到服务器的代码

    // 文件上传成功后显示弹窗
    setShowAlert(true);
		  // 上传成功后关闭对话框
    if (onClose && typeof onClose === 'function') {
      onClose();
    }

    // 清空文件列表
    setFiles([]);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-6 space-y-4 border bg-custom7 rounded-xl w-full max-w-sm ">
      
      <div className="flex flex-col items-center justify-center rounded-lg bg-custom6 p-4 shadow-md">
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center w-16 h-16 bg-white rounded-full hover:bg-gray-400 transition duration-150 ease-in-out cursor-pointer"
        >
          <DocumentArrowUpIcon className="w-10 h-10 text-custom0" />
        </label>
        <input
          id="file-upload"
          type="file"
					// accept=".json"
          onChange={handleFileChange}
          className="sr-only"
          // multiple
        />
      </div>
      <span className="text-white z-10">支持格式：jpg, jpeg, png, gif, doc, docx, xls, xlsx, pdf, txt</span>
		{files.length === 0 && <p className="text-custom6 font-bold">当前未选择文件</p>}
      {files.length > 0 && (
        <div className="flex flex-col bg-gray-100 p-4 rounded-md shadow-md z-10">
          <span className="block text-gray-800 font-medium mb-1">已选择文件：</span>
          {files.map((file, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="block text-gray-500">{file.name}</span>
              <button
                onClick={() => handleRemoveFile(index)}
                className="px-2 text-red-600 hover:text-red-800"
              >
                删除
              </button>
            </div>
          ))}
          <button
            onClick={handleUpload}
            className="btn text-custom0
				            text-lg font-bold mt-2 hover:brightness-200 hover:underline"
          >
            开始上传
          </button>
        </div>
      )}
    </div>
  );
};


export const FileUploadDialog = ({ open, onClose }) => {
		const { t } = useTranslation();

	

  return (
    <Dialog open={open} onClose={onClose}>
		<div className="flex flex-col">
      <DialogTitle>{t("upload.title")}</DialogTitle>
      <DialogContent>
		<FileMultiUpload onClose={onClose}/>
      </DialogContent>
		<button className="text-xl pb-2 hover:underline hover:font-bold" onClick={onClose}>{t("upload.close")}</button>
		</div>
    </Dialog>
  );
};
