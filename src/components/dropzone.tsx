
"use client"

import { FC } from "react";
import { default as ReactDropzone } from "react-dropzone";
import { HStack, VStack } from "./stack";
import { FileIcon, UploadCloud } from "lucide-react";
import { Text } from "./text";

interface Props {
    onDrop: (files: File[]) => void;
}

const Dropzone: FC<Props> = ({ onDrop }) => {

    return (
        <ReactDropzone
            multiple={false}
            onDrop={async (acceptedFile) => {
                onDrop(acceptedFile)
            }}
        >
            {({ getRootProps, getInputProps, acceptedFiles }) => (
                <div {...getRootProps()} className="w-full aspect-square border border-dashed rounded-lg">
                    <label
                        htmlFor='dropzone-file'
                        className="w-full h-full rounded-lg cursor-pointer bg-accent/30 hover:bg-accent/50 flex flex-col items-center justify-center space-y-10"
                    >
                        <VStack className="flex flex-col items-center justify-center space-y-4 px-4">
                            <UploadCloud className="h-12 w-12" />
                            <Text level={0} className="text-base">
                                <span>
                                    Click to upload
                                </span>{' '}
                                or drag and drop
                            </Text>
                        </VStack>


                        {acceptedFiles ? (
                            <VStack className="w-full space-y-2 px-4">
                                {
                                    acceptedFiles.map((file) => (
                                        <div key={file.name + file.lastModified} className="flex bg-accent w-full rounded-full px-2">
                                            <HStack className="py-1 px-2 items-center justify-center space-x-2">
                                                <FileIcon className="h-4 w-4 text-muted-foreground" />
                                                <Text level={0} className=" font-light">
                                                    {file.name}
                                                </Text>
                                            </HStack>
                                        </div>
                                    ))
                                }
                            </VStack>
                        ) : null
                        }

                        <input
                            {...getInputProps()}
                            type='file'
                            id='dropzone-file'
                            className='hidden'
                        />
                    </label>
                </div>
            )}
        </ReactDropzone>
    )
}

export default Dropzone;
