// import { GetMediaFiles } from "@/lib/types";
// import React from "react";
// import MediaUploadButton from "./upload-buttons";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "../ui/command";
// import MediaCard from "./media-card";
// import { FolderSearch } from "lucide-react";

// type Props = {
//   data: GetMediaFiles;
//   subaccountId: string;
// };

// const MediaComponent = ({ data, subaccountId }: Props) => {
//   return (
//     <div className="flex flex-col gap-4 h-full w-full">
//       <div className="flex justify-between items-center">
//         <h1 className="text-4xl">Media Bucket</h1>
//         {/* <MediaUploadButton subaccountId={subaccountId} /> */}
//         <button className="text-white">
//           <input type="file" />
//         </button>
//       </div>
//       <Command className="bg-transparent">
//         <CommandInput placeholder="Search for file name..." />
//         <CommandList className="pb-40 max-h-full ">
//           <CommandEmpty>No Media Files</CommandEmpty>
//           <CommandGroup heading="Media Files">
//             <div className="flex flex-wrap gap-4 pt-4">
//               {data?.Media.map((file) => (
//                 <CommandItem
//                   key={file.id}
//                   className="p-0 max-w-[300px] w-full rounded-lg !bg-transparent !font-medium !text-white"
//                 >
//                   <MediaCard file={file} />
//                 </CommandItem>
//               ))}
//               {!data?.Media.length && (
//                 <div className="flex items-center justify-center w-full flex-col">
//                   <FolderSearch
//                     size={200}
//                     className="dark:text-muted text-slate-300"
//                   />
//                   <p className="text-muted-foreground ">
//                     Empty! no files to show.
//                   </p>
//                 </div>
//               )}
//             </div>
//           </CommandGroup>
//         </CommandList>
//       </Command>
//     </div>
//   );
// };

// export default MediaComponent;

import { GetMediaFiles } from "@/lib/types";
import React, { useState, useEffect } from "react";
import MediaUploadButton from "./upload-buttons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import MediaCard from "./media-card";
import { FolderSearch } from "lucide-react";

type Props = {
  data: GetMediaFiles;
  subaccountId: string;
};

const MediaComponent = ({ data, subaccountId }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mediaList, setMediaList] = useState<any[]>([]); // لیست رسانه‌ها

  // استفاده از useEffect برای بارگذاری داده‌ها از localStorage
  useEffect(() => {
    // بارگذاری داده‌های موجود از localStorage (اگر وجود داشته باشد)
    const savedMedia = localStorage.getItem("mediaList");
    if (savedMedia) {
      setMediaList(JSON.parse(savedMedia));
    }
  }, []);

  // هندلر برای انتخاب فایل
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setSelectedFile(file);
    }
  };

  // ارسال فایل به لیست رسانه‌ها (بدون نیاز به API)
  const handleUpload = () => {
    if (!selectedFile) return;

    // فرض بر این است که فایل نامی برای شناسایی خواهد داشت
    const newFile = {
      id: selectedFile.name, // استفاده از نام فایل به عنوان id
      name: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type,
      previewUrl: URL.createObjectURL(selectedFile),
    };

    // افزودن فایل به لیست رسانه‌ها
    const updatedMediaList = [...mediaList, newFile];

    // ذخیره لیست جدید در localStorage
    localStorage.setItem("mediaList", JSON.stringify(updatedMediaList));

    // به‌روزرسانی state
    setMediaList(updatedMediaList);
    setSelectedFile(null); // بعد از آپلود، فایل انتخاب شده را پاک می‌کنیم
    console.log("File uploaded successfully");
  };

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Media Bucket</h1>
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer text-white">
            Select File
          </label>
          {selectedFile && (
            <div className="mt-2">
              <p>Selected file: {selectedFile.name}</p>
              <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Upload File
              </button>
            </div>
          )}
        </div>
      </div>
      <Command className="bg-transparent">
        <CommandInput placeholder="Search for file name..." />
        <CommandList className="pb-40 max-h-full ">
          <CommandEmpty>No Media Files</CommandEmpty>
          <CommandGroup heading="Media Files">
            <div className="flex flex-wrap gap-4 pt-4">
              {mediaList?.map((file) => (
                <CommandItem
                  key={file.id}
                  className="p-0 max-w-[300px] w-full rounded-lg !bg-transparent !font-medium !text-white"
                >
                  <MediaCard key={file.id} file={file} />
                </CommandItem>
              ))}
              {!mediaList?.length && (
                <div className="flex items-center justify-center w-full flex-col">
                  <FolderSearch
                    size={200}
                    className="dark:text-muted text-slate-300"
                  />
                  <p className="text-muted-foreground ">
                    Empty! no files to show.
                  </p>
                </div>
              )}
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default MediaComponent;
