 import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useParams } from 'react-router-dom';
import '../styles/writing.css';
import decode from 'jwt-decode';

export function Writing() {
  const editorRef = useRef(null);
  const [userEmail, setUserEmail] = useState('');
  const [promptId, setPromptId] = useState('');
  const [editingNovel, setEditingNovel] = useState(null);
  const [titleInput, setTitleInput] = useState('');
  const [editorInitialValue, setEditorInitialValue] = useState(
    '<p>Start your story here!</p>'
  );
  const [promptText, setPromptText] = useState('');
  const [catalystData, setCatalystData] = useState({});
  const [midpointData, setMidpointData] = useState({});
  const [endingData, setEndingData] = useState({});

  const params = useParams();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const email = decode(token).email;
      setUserEmail(email);
      setPromptId(localStorage.getItem('promptId'));
    }
if(!promptText){
    if (params.novelId) {
      fetch(`/api/novels/${params.novelId}`)
        .then((response) => response.json())
        .then((data) => {
          setPromptId(data.prompt_id);
          setCatalystData(JSON.parse(data.prompt_id.catalyst_input));
          setMidpointData(JSON.parse(data.prompt_id.midpoint_input));
          setEndingData(JSON.parse(data.prompt_id.ending_input));

          setEditingNovel(data);
          setPromptText(data.prompt_id.prompt);
        })
        .catch((error) => {
          console.error('Error fetching novel data: ', error);
        });
    } else if (userEmail && promptId) {
      fetchPrompt(promptId);
    }}

  }, [params.novelId, userEmail, promptId]);

  useEffect(() => {
    if (editingNovel) {
      setTitleInput(editingNovel.title);
      setEditorInitialValue(editingNovel.text_input);
    }
  }, [editingNovel]);

  const fetchPrompt = (promptId) => {
    fetch(`/api/prompts/${promptId}`)
      .then((response) => response.json())
      .then((data) => {
        setPromptText(data.prompt);
        setCatalystData(JSON.parse(data.catalyst_input));
        setMidpointData(JSON.parse(data.midpoint_input));
        setEndingData(JSON.parse(data.ending_input));
      })
      .catch((error) => {
        console.error('Error fetching prompt text: ', error);
      });
  };

  const log = async () => {
    if (editorRef.current) {
      const novelId = params.novelId;
      const token = localStorage.getItem('jwt');
      const userEmail = decode(token).email;

   
      
        let novelData;
      try {
        let reqUrl;
        let method;

        if (novelId) {
          reqUrl = `/api/novels/${novelId}`;
          method = 'PUT';
          novelData = {
            title: titleInput,
            text_input: editorRef.current.getContent(),
          }
        } else {
          reqUrl = `/api/novels`;
          method = 'POST';
          novelData = {
            title: titleInput,
            text_input:editorRef.current.getContent(),
              email: userEmail,
              prompt_id: promptId,
          }
        }

        const response = await fetch(reqUrl, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(novelData),
        });

        const data = await response.json();

        if (response.ok) {
          window.location.href = `/writing/${data.id}`;
          alert('Content saved successfully');
        }
      } catch (error) {
        console.error('Error saving content: ', error);
      }
    }
  };
  return (
    <div className="writing-container">
      <h1 className="writing">Writing</h1>
      <div className="full-container">
        <div className="texteditor">
          <div className="userTitleContainer">
            <input
              className="userTitle"
              placeholder="Story Title Here"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
          </div>

          <Editor
            apiKey="1yd2u78it8w81i51bwc4b01pd50szutiv7ut912vsj5d0lq7"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={editorInitialValue}
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
                'body { font-family: Helvetica, Arial, sans-serif; font-size: 24px; white-space: pre-wrap }',
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
              {promptText || 'Prompt Not Found'}
            </p>
          </div>
          <div className="card" id="catalyst">
            <p className="card-title">The Catalyst</p>
            <p className="card-content" style={{ fontSize: '14px' }}>
              Characters: {catalystData.characters}
            </p>
            <p className="card-content" style={{ fontSize: '14px' }}>
              Reason: {catalystData.reason}
            </p>
            <p className="card-content" style={{ fontSize: '14px' }}>
              Time Period: {catalystData.time_period}
            </p>
            <p className="card-content" style={{ fontSize: '14px' }}>
              Setting: {catalystData.setting}
            </p>
            <p className="card-content" style={{ fontSize: '14px' }}>
              Action: {catalystData.action}
            </p>
          </div>
          <div className="card" id="midpoint">
            <p className="card-title">The Midpoint</p>
            <p className="card-content" style={{ fontSize: '14px' }}>
              Coping Info: {midpointData.cope_info}
            </p>
            <p className="card-content" style={{ fontSize: '14px' }}>
              Incident Consequence: {midpointData.incident_consequence}
            </p>
            <p className="card-content" style={{ fontSize: '14px' }}>
              Internal Struggles: {midpointData.internal_struggles}
            </p>
            <p className="card-content" style={{ fontSize: '14px' }}>
              Conflicts: {midpointData.conflicts}
            </p>
          </div>
          <div className="card" id="conclusion">
            <p className="card-title">The Conclusion</p>
            <p className="card-content" style={{ fontSize: '14px' }}>
              Before Climax: {endingData.before_climax}
            </p>
            <p className="card-content" style={{ fontSize: '14px' }}>
              Climax: {endingData.climax}
            </p>
            <p className="card-content" style={{ fontSize: '14px' }}>
              Fallout: {endingData.fallout}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Writing;