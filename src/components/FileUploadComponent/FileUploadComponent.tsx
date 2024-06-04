import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Modal, ModalContent } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";

interface FileChange {
  target: {
    files: FileList | [];
  };
}

const FileUploadComponent = ({
  onSubmit,
  register,
  handleSubmit,
  defaultValues,
}: {
  onSubmit: Function;
  register: any;
  handleSubmit: any;
  defaultValues: any;
}) => {
  const previewItem = useMemo(
    () =>
      defaultValues?.images && defaultValues?.images?.length > 0
        ? defaultValues?.images?.[defaultValues?.images?.length - 1]
        : null,
    [defaultValues?.images]
  );

  console.log("previreItems = ", defaultValues);

  // const changeHandler = (e: any) => {
  //   setValue((prev: any) => [...prev, ...e.target.files]);
  // };

  return (
    <div className="flex flex-col gap-10 h-[80vh]">
      <h1 className="font-bold text-lg">Upload your files</h1>
      <div className="flex-1 flex items-center justify-center ">
        {/* selected item preview */}
        {previewItem && (
          <div className="w-full  h-[300px] ">
            <img
              src={URL.createObjectURL(previewItem)}
              className="h-full w-full object-contain"
              alt=""
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <Input placeholder="Add a caption" radius="sm" size="lg" />
        <div>
          {/* items selected and add item button */}
          <div className="flex justify-center gap-2 mt-7">
            <form
              enc-type="multipart/form-data"
              className="flex items-center  gap-2 w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* {defaultValues?.images &&
                defaultValues?.images?.length > 0 &&*/}
              {/* {defaultValues?.images?.map((item: File) => (
                <div className="w-[60px] aspect-square ml-auto">
                  <img
                    src={URL.createObjectURL(item)}
                    className="h-full w-full object-contain"
                    alt=""
                  />
                </div>
              ))} */}
              <div className="flex items-center gap-2 w-ful">
                {/* <input
                  type="file"
                  id="file"
                  className="hidden"
                  multiple
                  // onChange={changeHandler}
                  {...register("images")}
                /> */}
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
