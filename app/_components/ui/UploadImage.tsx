"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type UploadImageProps = {
  onUploadImage: (value: File | null) => void;
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
      // const file = acceptedFiles[0];
      // // const { data, error } = await supabase.storage
      // //   .from('your-bucket-name')  // Remplacez par le nom de votre bucket Supabase
      // //   .upload(`public/${file.name}`, file);

      // if (error) {
      //   console.error("Erreur lors du téléchargement", error.message);
      // } else {
      //   console.log("Fichier téléchargé avec succès:", data.Key);
      // }
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
