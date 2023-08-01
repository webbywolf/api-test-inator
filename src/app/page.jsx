'use client';

import React, { useState, useRef } from 'react';

import { FiUploadCloud } from 'react-icons/fi';
import {
  MdOutlineClear,
  MdOutlineDone,
  MdOutlineFileDownload,
} from 'react-icons/md';
import { TbReload } from 'react-icons/tb';

import { MoonLoader } from 'react-spinners';

export default function Home() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiLink, setApiLink] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(0);

  const selectImageRef = useRef(null);

  const uploadImage = async () => {
    if (!image || apiLink === '' || image.size / 1024 > 2048) {
      alert('Please select a valid image or enter a valid API URL');
      return;
    }
    console.log(image);

    // edit this as per the API
    // ---------------------

    // setLoading(true);
    // const formData = new FormData();
    // formData.append('image', image);

    // const res = await fetch(apiLink, {
    //   method: 'POST',
    //   body: formData,
    // });
    // const data = await res.json();

    // if (data) {
    //   setIsSubmitted(1);
    // } else {
    //   setIsSubmitted(2);
    // }

    setImage(null);
    setApiLink('');
    setLoading(false);
  };

  const download = async () => {
    console.log('download');
  };

  if (isSubmitted === 1)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center ">
        <div className="flex flex-col items-center justify-center rounded-md w-full  max-w-[80vw]">
          <div className="bg-green-500  rounded-full p-5">
            <MdOutlineDone className="text-6xl text-white " />
          </div>
          <br />
          <span className="text-xl font-medium text-center ">Success</span>
          <br />
          <button
            className="flex item items-center justify-evenly gap-3 px-10 py-3 rounded-md bg-blue-700 text-white font-medium"
            onClick={download}>
            <MdOutlineFileDownload className="text-xl text-white" />
            <span>Download</span>
          </button>
        </div>
      </main>
    );

  if (isSubmitted === 2)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center ">
        <div className="flex flex-col items-center justify-center rounded-md w-full  max-w-[80vw]">
          <div className="bg-red-500  rounded-full p-5">
            <MdOutlineClear className="text-6xl text-white" />
          </div>
          <br />
          <span className="text-xl font-medium text-center ">
            Image upload failed
          </span>
          <br />
          <button
            className="flex item items-center justify-evenly gap-3 px-10 py-3 rounded-md bg-blue-700 text-white font-medium"
            onClick={() => setIsSubmitted(0)}>
            <TbReload className="text-xl text-white" />
            <span>Try Again</span>
          </button>
        </div>
      </main>
    );

  if (loading)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center ">
        <div className="flex flex-col items-center justify-center rounded-md w-full  max-w-[80vw]">
          <MoonLoader color="#1d4ed8" size={80} />
          <br />
          <span className="text-xl font-medium text-center ">
            We are processing the file
          </span>
        </div>
      </main>
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <div className="flex flex-col items-center justify-center rounded-md w-full  max-w-[80vw]">
        <div
          className="flex flex-col items-center justify-center bg-gray-200  rounded-md sm:w-[50%] w-full h-56 cursor-copy"
          onClick={() => {
            selectImageRef.current.click();
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            setImage(e.dataTransfer.files[0]);
          }}>
          <input
            type="file"
            name=""
            id=""
            className="hidden"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            ref={selectImageRef}
          />
          <FiUploadCloud className="text-6xl text-blue-700" />
          <h2 className="text-xl font-medium text-center ">
            Drag and drop or click here
          </h2>
          <span className="text-gray-500 text-sm font-normal text-center">
            to upload your image (max 2 MB)
          </span>
        </div>

        <br />
        <br />

        {image && (
          <div className="flex flex-col items-center justify-center rounded-md sm:w-[50%] w-full ">
            <div className="flex  justify-between items-center text-gray-500 text-base font-medium text-center p-5 bg-gray-200 w-full rounded-md border-2 border-dashed border-gray-500">
              <div className="flex flex-col justify-start items-start ">
                <span className=" cursor-pointer">{image.name}</span>
                <span className="text-gray-400 text-sm font-normal">
                  Size: {(image.size / 1024 / 1000).toFixed(2)} MB{' '}
                </span>
              </div>
              <MdOutlineClear
                className="text-2xl  cursor-pointer"
                onClick={() => {
                  setImage(null);
                }}
              />
            </div>
          </div>
        )}

        <br />
        <br />

        <div className="flex flex-col items-start justify-center sm:w-[50%] w-full">
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter API URL"
            className="w-full h-12 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700 
            px-5 focus:border-transparent"
            onChange={(e) => {
              setApiLink(e.target.value);
            }}
          />
          <br />

          <button
            className="px-10 py-3 rounded-md bg-blue-700 text-white font-medium"
            onClick={uploadImage}>
            Submit
          </button>
        </div>
      </div>
    </main>
  );
}
