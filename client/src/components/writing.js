import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import '../styles/writing.css';
import decode from 'jwt-decode';

export function Writing() {
  const editorRef = useRef(null);
  const log = async () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());

      const promptId = localStorage.getItem('promptId');
      const novelId = localStorage.getItem('novelId');
      const token = localStorage.getItem('jwt');
      const userEmail = decode(token).email;

      // save content
      try {
        let reqUrl;
        let method;
        const body = {
          text_input: editorRef.current.getContent(),
          email: userEmail,
          prompt_id: promptId,
        };

        // if novel already exists, update it. Else, create it
        if (novelId) {
          reqUrl = `/api/novels/${novelId}`;
          method = 'PUT';
        } else {
          reqUrl = `/api/novels`;
          method = 'POST';
        }

        const response = await fetch(reqUrl, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          alert('Content saved successfully');
        }
      } catch (error) {
        console.log('Error saving content: ', error);
      }
    }
  };
  return (
    <>
      <div>
        <h1 className="writing">Writing</h1>
      </div>
      <div className="full-container">
        <div className="texteditor">
        <div className='userTitleContainer'>
          <input className='userTitle' placeholder='Story Title Here'/>
        </div>
          <Editor
            apiKey="1yd2u78it8w81i51bwc4b01pd50szutiv7ut912vsj5d0lq7"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>Start your story here!</p>"
            init={{
              height: 700,
              width: 1200,
              menubar: false,
              browser_spellcheck: true,

              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'code',
                'help',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',

              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
          <button onClick={log} className="submit">
            log editor content
          </button>
        </div>
        <div className="card-container">
          <div className="card" id="prompt">
            <p>Prompt</p>
          </div>
          <div className="card" id="catylist">
            <p>The Catylist</p>
          </div>
          <div className="card" id="midpoint">
            <p>The Midpoint</p>
          </div>
          <div className="card" id="conclusion">
            <p>The Conclusion</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Writing;
