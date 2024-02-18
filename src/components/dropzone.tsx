
"use client"

import { FC } from "react";
import { default as ReactDropzone } from "react-dropzone";
import { FileIcon, UploadCloud } from "lucide-react";

interface Props {
    onDrop: (files: File[]) => void,
    multiple: boolean
}

const Dropzone: FC<Props> = ({ onDrop, multiple }) => {

    return (
        <ReactDropzone
            multiple={multiple}
            accept={{
                'image/*': ['.png', '.jpg', '.jpeg'],
            }}
            maxFiles={5}
            onDrop={async (acceptedFile) => {
                onDrop(acceptedFile)
            }}
        >
            {({ getRootProps, acceptedFiles }) => (
                <div {...getRootProps()} className="w-full border border-dashed rounded-lg">
                    <label
                        htmlFor='dropzone-file'
                        className="w-full h-full rounded-lg cursor-pointer bg-accent/30 hover:bg-accent/50 flex flex-col items-center justify-center space-y-4 p-4"
                    >
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <UploadCloud className="h-10 w-10" />
                            <p className="text-base">
                                <span className="fuente-semibold">
                                    Clic para agregar
                                </span>{' '}
                                o arrastrar y suelta
                            </p>
                        </div>


                        {acceptedFiles && acceptedFiles.length > 0 ? (
                            <div className="flex flex-col w-full space-y-2">
                                {
                                    acceptedFiles.map((file) => (
                                        <div key={file.name + file.lastModified} className="flex bg-background border w-full rounded-full px-2">
                                            <div className="py-1 px-2 items-center justify-center space-x-2">
                                                <FileIcon className="h-4 w-4 text-muted-foreground" />
                                                <p className=" font-light">
                                                    {file.name}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : null
                        }
                    </label>
                </div>
            )}
        </ReactDropzone >
    )
}

export default Dropzone;
