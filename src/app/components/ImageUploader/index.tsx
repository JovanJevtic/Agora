"use client";
 
import { UploadButton, UploadDropzone } from "@/app/libs/uploadthing";
import { ImagePlus } from "lucide-react";
import { Progress } from "@/app/components/ui/progress"
import { Button } from "../ui/button";
 
type Props = {
    onChange: (...event: any[]) => void;
    value: string
}

const UploadButtonComponent: React.FunctionComponent<Props> = ({ onChange, value }) => {
  return (
    // <UploadDropzone 
    //     endpoint="imageUploader"
    //     className="bg-background ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300 cursor-pointer border-gray-700 hover:bg-secondary transition"
    //     content={{
    //         label: 'Odaberi sliku (pritisni bilo gdje)',
    //         allowedContent: () => {
    //             return <div className="mb-5 mt-0 text-xs">Podrzan tip slike do 4MB</div>
    //         },
    //         button: ({ fileTypes, isUploading, uploadProgress, isDragActive, ready }) => {
    //             // if (isUploading) {
    //             //     return <div>Ucitavanje...</div>
    //             // }
    //             if (ready) {
    //                 return <div className="font-bold">Datoteka odabrana</div>
    //             }
    //             if (isUploading) {
    //                 <Progress value={uploadProgress} />
    //             }
    //         },
    //         uploadIcon: () => {
    //             return <ImagePlus className="mt-5 mb-3 text-primary" />
    //         }
    //     }}

    //     onClientUploadComplete={(res) => {
    //         console.log("Files: ", res);

    //         // onChange(res)
    //     }}

    //     onUploadError={(error: Error) => {
    //         // Do something with the error.
    //         alert(`ERROR! ${error.message}`);
    //     }}
    // />

    <UploadDropzone
        endpoint="imageUploader"
        className="flex flex-col border-secondary cursor-pointer pb-5 bg-background hover:bg-secondary transition"
        content={{
            button: ({ ready, fileTypes, isDragActive, isUploading, uploadProgress }) => {
                if (isUploading) {
                    return <div className="w-full flex flex-col">
                        <h1>{uploadProgress}%</h1>
                        <Progress className="w-[200px]" value={uploadProgress} />
                    </div>
                } else {
                    return <div className="flex flex-col"><Button className="font-bold" type="button">Potvrdi odabir</Button></div>
                }
            },
            allowedContent: ({ ready, fileTypes, isDragActive, isUploading, uploadProgress }) => {
                return <div className="mb-3 mt-0 text-xs text-gray-400 pb-3">Dozvoljeni su formati slika do 4MB velicine</div>
            },
            label: () => {
                return <div className="text-base">{value.length > 0 ? 'Pritisni bilo gdje da promijenis sliku' : 'Pritisni bilo gdje da odaberes sliku'}</div>
            },
            uploadIcon: () => {
                return <ImagePlus size={30} className="mt-5 mb-3" />
            }
        }}
        onClientUploadComplete={(res) => {
          onChange(res[0].url)
        }}
        onUploadError={(error: Error) => {
        //   alert(`ERROR! ${error.message}`);
        throw new Error(error.message)

        }}
    />
  );
}

export default UploadButtonComponent