
import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useLocation, useParams } from 'react-router-dom';
import '../styles/writing.css';
import decode from 'jwt-decode';

export function Writing() {
  const editorRef = useRef(null);
  const [userEmail, setUserEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [promptId, setPromptId] = useState('');
  const [editingNovel, setEditingNovel] = useState(null);
  const [titleInput, setTitleInput] = useState('');
  const [editorInitialValue, setEditorInitialValue] = useState('<p>Start your story here!</p>');
  const [promptText, setPromptText] = useState('');
  const [promptsArray, setPromptsArray] = useState([]);
  const [catalystData, setCatalystData] = useState({});
  const [midpointData, setMidpointData] = useState({});
  const [endingData, setEndingData] = useState({});
  const [catalystCharacters, setCatalystCharacters] = useState('');
  const [catalystReason, setCatalystReason] = useState('');
  const [midpointCopeInfo, setMidpointCopeInfo] = useState('');
  const [midpointIncidentConsequence, setMidpointIncidentConsequence] = useState('');
  const [endingBeforeClimax, setEndingBeforeClimax] = useState('');
  const [endingClimax, setEndingClimax] = useState('');
  
  const location = useLocation();
  const params = useParams();

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
          setCardData(data);
          fetchPromptText(data._id);
        })
        .catch((error) => console.error('Error fetching user data: ', error));
    }
  }, [userEmail, promptId]);

  useEffect(() => {
    if (params.novelId) {
      fetch(`/api/novels/${params.novelId}`)
        .then((response) => response.json())
        .then((data) => {
          setEditingNovel(data);
          fetchPromptText(data.prompt_id);
          setPromptsArray(data.prompts);
          setPromptsData(data);
          setCatalystCharacters(data.catalyst_characters || '');
          setCatalystReason(data.catalyst_reason || '');
          setMidpointCopeInfo(data.midpoint_cope_info || '');
          setMidpointIncidentConsequence(data.midpoint_incident_consequence || '');
          setEndingBeforeClimax(data.ending_before_climax || '');
          setEndingClimax(data.ending_climax || '');
        })
        .catch((error) => {
          console.error('Error fetching novel data: ', error);
        });
    }
  }, [params.novelId]);

  useEffect(() => {
    if (editingNovel) {
      setTitleInput(editingNovel.title);
      setEditorInitialValue(editingNovel.text_input);
      setPromptsData(editingNovel);
    }
  }, [editingNovel]);

  const fetchPromptText = (promptId) => {
    fetch(`/api/prompts/${promptId}`)
      .then((response) => response.json())
      .then((data) => {
        setPromptText(data.prompt);
      })
      .catch((error) => {
        console.error('Error fetching prompt text: ', error);
      });
  };

  const saveCardData = (novelData) => {
    const novelWithCardData = {
      ...novelData,
      prompts: [
        {
          catalyst: {
            characters: catalystCharacters,
            reason: catalystReason,
          },
          midpoint: {
            cope_info: midpointCopeInfo,
            incident_consequence: midpointIncidentConsequence,
          },
          ending: {
            before_climax: endingBeforeClimax,
            climax: endingClimax,
          },
        },
        ...promptsArray,
      ],
    };

    return novelWithCardData;
  };

 
  const log = async () => {
    if (editorRef.current) {
      const currPromptId = promptId;
      const novelId = params.novelId;
      const token = localStorage.getItem('jwt');
      const userEmail = decode(token).email;
  
      const novelData = {
        title: titleInput,
        text_input: editorRef.current.getContent(),
        email: userEmail,
        prompt_id: currPromptId,
        prompts: promptsArray.concat({
          catalyst: {
            characters: catalystCharacters,
            reason: catalystReason,
          },
          midpoint: {
            cope_info: midpointCopeInfo,
            incident_consequence: midpointIncidentConsequence,
          },
          ending: {
            before_climax: endingBeforeClimax,
            climax: endingClimax,
          },
        }),
      };
  
      try {
        let reqUrl;
        let method;
  
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

  const setCardData = (data) => {
    if (data.catalyst_input) {
      setCatalystData(JSON.parse(data.catalyst_input));
    } else {
      setCatalystData({});
    }
    if (data.midpoint_input) {
      setMidpointData(JSON.parse(data.midpoint_input));
    } else {
      setMidpointData({});
    }
    if (data.ending_input) {
      setEndingData(JSON.parse(data.ending_input));
    } else {
      setEndingData({});
    }
  };

  const setPromptsData = (data) => {
    setPromptsArray(data.prompts || []);
    if (data.catalyst_input) {
      setCatalystData(JSON.parse(data.catalyst_input));
    } else {
      setCatalystData({});
    }
    if (data.midpoint_input) {
      setMidpointData(JSON.parse(data.midpoint_input));
    } else {
      setMidpointData({});
    }
    if (data.ending_input) {
      setEndingData(JSON.parse(data.ending_input));
    } else {
      setEndingData({});
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
              {promptText || (userData ? userData.prompt : 'Prompt Not Found')}
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
          </div>
          <div className="card" id="midpoint">
            <p className= "card-title">The Midpoint</p>
            <p className="card-content" style={{ fontSize: '14px' }}>
              Coping Info: {midpointData.cope_info}
            </p>
            <p className="card-content" style={{ fontSize: '14px' }}>
              Incident Consequence: {midpointData.incident_consequence}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Writing;