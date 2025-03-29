import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { DealImagesList, FilesList } from "./uploadedImagesList";
import "./styles.scss";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export function ImagesDropZone ({dealImages, onChangeDealImages, removeImage, maxFiles}) {

  const imageSizeValidation = (file) => {
    if (file.size > 2097152) {
      return {
        code: "size-too-large",
        message: `The image isze is larger than 2 MB`
      };
    }
  }
  const dropZoneConfig = {
    maxFiles: maxFiles,
    accept: {
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
    },
    onDrop: acceptedFiles => {
      onChangeDealImages(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    },
    validator: imageSizeValidation
  }

  const { getRootProps, getInputProps, fileRejections } = useDropzone(dropZoneConfig);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    // return () => dealImages.forEach(file => URL.revokeObjectURL(file.preview));
    // setFiles(dealImages);
  }, []);

  // accepted files component
  const acceptedFileItems = dealImages.map((file, index) => (
    <FilesList 
      file={file}
      removeImage={removeImage}
      index={index}
      key={index} />
  ));

  // rejected files component
  const fileRejectionItems = fileRejections.map(({ file, errors }, index) => (
    <FilesList 
      file={file} 
      errors={errors} 
      key={index} />
  ));
  // table header
  const TableHeader = (
    <thead>
      <tr>
        <td width={`30`}> &nbsp; </td>
        <td>Image</td>
        <td>Image name</td>
        <td>Image size</td>
        {/* <td>Index</td>
        <td>order</td> */}
        <td>Action</td>
      </tr>
    </thead>
  )

  const reorder = (startIndex, endIndex) => {
    const result = Array.from(dealImages);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    result.map((row, index) => (row.order = index));
    return result;
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    
    if (!destination) {
      return;
    }
    const update = reorder(source.index, destination.index);
    onChangeDealImages(update);
  };

  return (
    <div>
      <section className="dropzoneContainer">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <em>(5 files are the maximum number of files you can drop here)</em>
          <em>(2MB is the maximum size of an image)</em>
        </div>
        <aside className="thumbsContainer mt-3">
          {dealImages.length !== 0 &&
            <div className="thumbs">
              <h5>Accepted files</h5>
              <Table className="border table-hover table-striped deal-images-list">
                {TableHeader}
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId={"dndTableBody"}>
                    {(provided) => (
                      <tbody ref={provided.innerRef} {...provided.droppableProps}>
                        <DealImagesList dealImages={dealImages} removeImage={removeImage} />
                      </tbody>
                    )}
                  </Droppable>
                </DragDropContext>
              </Table>
            </div>
          }

          {fileRejections.length !== 0 &&
            <div>
              <h5 className="text-danger">Rejected files</h5>
              <Table className="border table-hover table-striped">
                {TableHeader}
                <tbody>
                  {fileRejectionItems}
                </tbody>
              </Table>
            </div>
          }

        </aside>
      </section>
    </div>
  )
}