import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import '../styles/writing.css';

export function Writing() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
    <div>
        <h1 className='writing'>Writing</h1>
    </div>
    <div className='full-container'>
      <div className='texteditor'>
      <Editor
        apiKey='1yd2u78it8w81i51bwc4b01pd50szutiv7ut912vsj5d0lq7'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>Start your story here!</p>"
        init={{
          height: 700,
          width: 1200,
          menubar: false,
          browser_spellcheck: true,
          
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log} className='submit'>log editor content</button>
      </div>
      <div className='card-container'>
      <div className='card' id='prompt'>
        <p>Prompt</p>
      </div>
      <div className='card' id='catylist'>
        <p>The Catylist</p>
      </div>
      <div className='card' id='midpoint'>
        <p>The Midpoint</p>
      </div>
      <div className='card' id='conclusion'>
        <p>The Conclusion</p>
      </div>
    </div>
    </div>
    </>
  );
}

export default Writing;