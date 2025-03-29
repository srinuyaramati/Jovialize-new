import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'draft-js/dist/Draft.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import "./editor.scss"

function TextEditor({ editorState, editorStateChange }) {

  return (
    <div>
      {/* <div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent())) }}></div> */}
      <Editor
        editorState={editorState}
        wrapperClassName="editor-wrapper"
        editorClassName="editor-body"
        onEditorStateChange={editorStateChange}
      />
    </div>
  )
}

export default TextEditor;