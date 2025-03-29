import { Draggable } from "react-beautiful-dnd"
import { bytesToKB } from "utils/fileSizeCalculator"

export const FilesList = ({ file, errors, removeImage, index }) => (
  <tr>
    <td><i className="fas fa-grip-lines"></i></td>
    <td>
      <div className="">
        {!errors && <img
          src={file.preview}
          className="thumbImg"
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />}
      </div>
    </td>
    <td>{file.name}</td>
    <td>{bytesToKB(file.size)} KB</td>
    <td>{file.index}</td>
    <td>{file.order}</td>
    <td>
      {errors && errors.map(e => (
        <span key={e.code}>{e.message}<br /></span>
      ))
      }
      {!errors && <button
        type="button"
        className="btn-simple btn-link p-1 btn btn-danger"
        data-toggle="confirmation"
        onClick={() => removeImage(index)}><i className="fas fa-trash"></i></button>
      }
    </td>
  </tr>
)



export const DealImagesList = ({ dealImages, removeImage }) => (
  dealImages.map((file, index) => (
    <Draggable
      draggableId={file.name}
      index={index}
      key={file.name}
    >
      {(provided) => (
        <tr ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
          <td><i className="fas fa-grip-lines"></i></td>
          <td>
            <div className="">
              <img
                src={file.preview}
                className="thumbImg"
                // Revoke data uri after image is loaded
                onLoad={() => { URL.revokeObjectURL(file.preview) }}
              />
            </div>
          </td>
          <td>{file.name}</td>
          <td>{bytesToKB(file.size)} KB</td>
          {/* <td>{file.index}</td>
          <td>{file.order}</td> */}
          <td>
            {<button
              type="button"
              className="btn-simple btn-link p-1 btn btn-danger"
              data-toggle="confirmation"
              onClick={() => removeImage(index)}><i className="fas fa-trash"></i></button>
            }
          </td>
        </tr>
      )}
    </Draggable>
  ))
)