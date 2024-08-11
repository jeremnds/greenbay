"use client";

import { OnUploadImageType } from "@/app/_models/types";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type UploadImageProps = {
  onUploadImage: OnUploadImageType;
};

export default function UploadImage({ onUploadImage }: UploadImageProps) {
  const [uploadedText, setUploadedText] = useState(
    "Drag 'n' drop some files here, or click to select files"
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles?.length) {
        const image = acceptedFiles[0];
        setUploadedText(`Your image ${image.name} has been uploaded! 🥳`);
        onUploadImage(image);
      } else {
        setUploadedText("ERROR: Max size:10MB, .png, .jpg, .jpeg accepted");
        onUploadImage(null);
      }
    },
    [onUploadImage]
  );

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      onDrop,
      accept: {
        "image/png": [".png"],
        "image/jpg": [".jpg"],
        "image/jpeg": [".jpeg"],
      },
      maxFiles: 1,
      maxSize: 10000000,
    });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed p-5 text-center border-gray-200"
    >
      <input {...getInputProps()} />
      <p>{uploadedText}</p>
    </div>
  );
}
