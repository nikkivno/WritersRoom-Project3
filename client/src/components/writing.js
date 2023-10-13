import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "../styles/writing.css";
import decode from "jwt-decode";

function Writing() {
  const editorRef = useRef(null);
  const [userEmail, setUserEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [catalystData, setCatalystData] = useState({});
  const [midpointData, setMidpointData] = useState({});
  const [endingData, setEndingData] = useState({});
  const [promptId, setPromptId] = useState("");

  // Original log function for saving content
  const log = async () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());

      const token = localStorage.getItem("jwt");
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
        if (promptId) {
          reqUrl = `/api/novels/${promptId}`;
          method = "PUT";
        } else {
          reqUrl = `/api/novels`;
          method = "POST";
        }

        const response = await fetch(reqUrl, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          alert("Content saved successfully");
        }
      } catch (error) {
        console.log("Error saving content: ", error);
      }
    }
  };

  useEffect(() => {
    // Fetch the user's email from localStorage
    const token = localStorage.getItem("jwt");
    if (token) {
      const email = decode(token).email;
      setUserEmail(email);
      setPromptId(localStorage.getItem("promptId"));
    }
  }, []);

  useEffect(() => {
    if (userEmail && promptId) {
      // Fetch prompt data for the given promptId
      fetchDataForUser(promptId)
        .then((data) => {
          setUserData(data);
          setCatalystData(data.catalyst_input ? JSON.parse(data.catalyst_input) : {});
          setMidpointData(data.midpoint_input ? JSON.parse(data.midpoint_input) : {});
          setEndingData(data.ending_input ? JSON.parse(data.ending_input) : {});
        })
        .catch((error) => console.error("Error fetching user data: ", error));
    }
  }, [userEmail, promptId]);

  const getCatalystData = () => {
    return catalystData;
  };

  const getMidpointData = () => {
    return midpointData;
  };

  const getEndingData = () => {
    return endingData;
  };

  return (
    <>
      <div>
        <h1 className="writing">Writing</h1>
      </div>
      <div className="full-container">
        <div className="texteditor">
          {/* Your text editor component */}
          <Editor
            apiKey="1yd2u78it8w81i51bwc4b01pd50szutiv7ut912vsj5d0lq7"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>Start your story here!</p>"
            init={{  height: 700,
              width: 1200,
              menubar: false,
              browser_spellcheck: true,

              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",

                content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            
          />
          <button onClick={log} className="submit">
            Save
          </button>
        </div>
        <div className="card-container">
  <div className="card" id="prompt">
    <p style={{fontSize: '12px' }}>Prompt</p>
    <p style={{ fontSize: '8px' }}>{userData ? userData.prompt : "Prompt Not Found"}</p>
  </div>
  <div className="card" id="catalyst">
    <p style={{ fontSize: '12px' }}>The Catalyst</p>
    <p style={{ fontSize: '8px' }}>Characters: {getCatalystData().characters}</p>
    <p style={{ fontSize: '8px' }}>Reason: {getCatalystData().reason}</p>
  </div>
  <div className="card" id="midpoint">
    <p style={{ fontSize: '12px' }}>The Midpoint</p>
    <p style={{ fontSize: '8px' }}>Coping Info: {getMidpointData().cope_info}</p>
    <p style={{ fontSize: '8px' }}>Incident Consequence: {getMidpointData().incident_consequence}</p>
  </div>
  <div className="card" id="conclusion">
    <p style={{ fontSize: '12px' }}>The Conclusion</p>
    <p style={{ fontSize: '8px' }}>Before Climax: {getEndingData().before_climax}</p>
    <p style={{ fontSize: '8px' }}>Climax: {getEndingData().climax}</p>
  </div>
</div>
      </div>
    </>
  );
}

async function fetchDataForUser(promptId) {
  try {
    const response = await fetch(`/api/prompts/${promptId}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error fetching user data");
    }
  } catch (error) {
    throw error;
  }
}

export default Writing;