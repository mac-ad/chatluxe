import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Modal, ModalContent } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";

interface FileChange {
  target: {
    files: FileList | [];
  };
}

const FileUploadComponent = ({ htmlFor }: { htmlFor?: string }) => {
  const [selectedFiles, setSelectedFiles] = useState<any>([]);

  const previewItem = useMemo(
    () => selectedFiles[selectedFiles?.length - 1],
    [selectedFiles]
  );

  const changeHandler = (e: any) => {
    setSelectedFiles((prev: any) => [...prev, ...e.target.files]);
  };

  return (
    <div className="flex flex-col gap-10 h-[80vh]">
      <h1 className="font-bold text-lg">Upload your files</h1>
      <div className=" flex-1">
        {/* selected item preview */}
        {previewItem && <div></div>}
      </div>
      <div className="flex flex-col gap-4">
        <Input placeholder="Add a caption" radius="sm" size="lg" />
        <div>
          {/* items selected and add item button */}
          <div className="flex justify-center gap-2 mt-7">
            <form className="flex items-center  gap-2 w-full">
              <div className="ml-auto flex items-center gap-2 w-ful">
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={changeHandler}
                />
                {/* add button */}
                <label
                  htmlFor="file"
                  className="aspect-square border w-[60px] rounded-md flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 transition-all"
                >
                  <Icon icon="material-symbols:add" fontSize={30} />
                </label>
              </div>
              <div className=" ml-auto bg-[#01A885] aspect-square w-[60px]  rounded-full flex items-center justify-center">
                <Button type="submit" className="bg-transparent">
                  <Icon icon="majesticons:send" fontSize={25} />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadComponent;
