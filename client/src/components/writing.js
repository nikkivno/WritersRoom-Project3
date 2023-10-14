import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import '../styles/writing.css';
import decode from 'jwt-decode';

export function Writing() {
  const editorRef = useRef(null);
  const [userEmail, setUserEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [catalystData, setCatalystData] = useState({});
  const [midpointData, setMidpointData] = useState({});
  const [endingData, setEndingData] = useState({});
  const [promptId, setPromptId] = useState('');

  const log = async () => {
    // if editor has content, save content
    if (editorRef.current) {
      console.log(editorRef.current.getContent());

      const currPromptId = localStorage.getItem('promptId');
      const novelId = localStorage.getItem('novelId');
      const token = localStorage.getItem('jwt');
      const userEmail = decode(token).email;

      try {
        let reqUrl;
        let method;
        const body = {
          text_input: editorRef.current.getContent(),
          email: userEmail,
          prompt_id: currPromptId,
        };

        // if novel already exists, update content with PUT
        if (novelId) {
          reqUrl = `/api/novels/${novelId}`;
          method = 'PUT';
        } else {
          // novel doesn't exist, create with POST
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

        const data = await response.json();

        if (response.ok) {
          // set novelId to indicate novel already exists in database
          localStorage.setItem('novelId', data.id);
          alert('Content saved successfully');
        }
      } catch (error) {
        console.log('Error saving content: ', error);
      }
    }
  };

  const fetchDataForUser = async (promptId) => {
    try {
      const response = await fetch(`/api/prompts/${promptId}`);
      if (response.ok) {
        return await response.json();
      } else {
        throw Error('Error fetching user data');
      }
    } catch (error) {
      throw error;
    }
  };

  const getCatalystData = () => {
    return catalystData;
  };

  const getMidpointData = () => {
    return midpointData;
  };

  const getEndingData = () => {
    return endingData;
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const email = decode(token).email;
      setUserEmail(email);
      setPromptId(localStorage.getItem('promptId'));
    }
  }, []);

  useEffect(() => {
    if (userEmail && promptId) {
      fetchDataForUser(promptId)
        .then((data) => {
          setUserData(data);
          setCatalystData(
            data.catalyst_input ? JSON.parse(data.catalyst_input) : {}
          );
          setMidpointData(
            data.midpoint_input ? JSON.parse(data.midpoint_input) : {}
          );
          setEndingData(data.ending_input ? JSON.parse(data.ending_input) : {});
        })
        .catch((error) => console.error('Error fetching user data: ', error));
    }
  }, [userEmail, promptId]);

  return (
    <div className="writing-container">
      <h1 className="writing">Writing</h1>
      <div className="full-container">
        <div className="texteditor">
          <div className="userTitleContainer">
            <input className="userTitle" placeholder="Story Title Here" />
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
                'undo redo | blocks | fontfamily fontsize |' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style:
                'body { font-family: Helvetica, Arial, sans-serif; white-space: pre-wrap }',
            }}
          />
          <button onClick={log} className="submit">
            save
          </button>
        </div>
        <div className="card-container">
          <div className="card" id="prompt">
            <p className="card-title">Prompt</p>
            <p className="card-content" style={{ fontSize: '14px' }}>
              {userData ? userData.prompt : 'Prompt Not Found'}
            </p>
          </div>
          <div className="card" id="catalyst">
            <p className="card-title">The Catalyst</p>
            <p className="card-content" style={{ fontSize: '14px' }}>
              Characters: {getCatalystData().characters}
            </p>
            <p className="card-content" style={{ fontSize: '14px' }}>
              Reason: {getCatalystData().reason}
            </p>
          </div>
          <div className="card" id="midpoint">
            <p className="card-title">The Midpoint</p>
            <p className="card-content" style={{ fontSize: '14px' }}>
              Coping Info: {getMidpointData().cope_info}
            </p>
            <p className="card-content" style={{ fontSize: '14px' }}>
              Incident Consequence: {getMidpointData().incident_consequence}
            </p>
          </div>
          <div className="card" id="conclusion">
            <p className="card-title">The Conclusion</p>
            <p className="card-content" style={{ fontSize: '14px' }}>
              Before Climax: {getEndingData().before_climax}
            </p>
            <p className="card-content" style={{ fontSize: '14px' }}>
              Climax: {getEndingData().climax}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Writing;
