// src/Chatbot.js
import "./Chatbot.css"
import React, {useEffect, useState } from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faMinus, faPaperPlane,  faMicrophone,faCamera, faFileImage } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid'
import { IoReloadCircleOutline } from 'react-icons/io5';
import { marked } from 'marked';
import Message from './Message';
import DOMPurify from 'dompurify';
import { text } from "@fortawesome/fontawesome-svg-core";
import { json } from "react-router-dom";


const Lists = {
  legalConsumersList:{
    content:[{
      id:uuidv4(),
      text:"How do I file for divorce and what are the requirements?"},
      {
        id:uuidv4(),
        text:"What are my rights as an employee?"

      },
      {
        id:uuidv4(),
        text:"Provide examples of [legal case/issue]"}]
  },
  legalResearchList:{
    content:[
    {
      id:uuidv4(),
      text:'Prompts for Legal Research'
    },{
      id:uuidv4(),
      text:"What are the latest developments in [legal area]?"
    },
    {
      id:uuidv4(),
      text:"What are the relevant laws or regulations regarding [legal issue]?"
    },{
      id:uuidv4(),
      text:"What are the pros and cons of [legal argument/position]?"
    },{
      id:uuidv4(),
      text:"Provide a summary of [case name]"
    },{
      id:uuidv4(),
      text:"Discuss the role of [legal principle or concept] in [specific area of law]"
    }]

  },
  DraftingLegalDocuments:{
    content:[{
      id:uuidv4(),
      text:"Draft a Sales Agreement for transferring ownership of a vehicle"},
      {
        id:uuidv4(),
        text:"Write a Cease and Desist Letter for copyright infringement"

      },
      {
        id:uuidv4(),
        text:"What are the recommended provisions for a Licensing Agreement?"},
        {
          id:uuidv4(),
          text:"What are the necessary elements for an Employment Contract?"
        },{
          id:uuidv4(),
          text:"What are the typical terms for a Joint Venture Agreement?"
        },{
          id:uuidv4(),
          text:"What are the most common mistakes to avoid when drafting a Settlement Agreement?"
        }
      
      ]
  },
  familylawList:{
    content:[{
      id:uuidv4(),
      text:"Draft a prenuptial agreement for engaged couples who want to protect their assets"},
      {
        id:uuidv4(),
        text:"Create a child custody agreement for divorcing parents"

      },
      {
        id:uuidv4(),
        text:"Write a postnuptial agreement for spouses who want to modify their marital property rights"},
      
      {
        id:uuidv4(),
        text:"What are the standard clauses for a child support agreement?"
      },
      {
        id:uuidv4(),
        text:"What are the most common mistakes to avoid when drafting a separation agreement?"
      }

      
      ]
  },
  personalinjuryList:{
    content:[{
      id:uuidv4(),
      text:"Draft a demand letter for a slip and fall case"},
      {
        id:uuidv4(),
        text:"Draft a settlement agreement for a car accident case involving multiple parties"

      },
      {
        id:uuidv4(),
        text:"Write a complaint for a medical malpractice lawsuit"}]
  },
  EmployLabourList:{
    content:[{
      id:uuidv4(),
      text:"Draft a non-disclosure agreement for a new employee."},
      {
        id:uuidv4(),
        text:"Write a workplace harassment policy for a small business."

      },
      {
        id:uuidv4(),
        text:"What should be included in a severance agreement?"}]
  },
  immigrationList:{
    content:[{
      id:uuidv4(),
      text:"Write a request for evidence response for an H-1B visa applicant"},
      {
        id:uuidv4(),
        text:"Draft a memorandum of understanding for a family seeking asylum"

      },
      {
        id:uuidv4(),
        text:"Write a request for evidence response for an H-1B visa applicant"}]
  },

}



const Chatbot = ({isDarkMode}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [modelopened,setmodelopened] = useState(false)
  const [customprompt,setcustomPrompt] = useState([])
  const [newprompt,setnewPrompt] = useState({})
  const [promptList,setPromptList] = useState([{
    id:uuidv4(),
    text:"write your custom"
  }])

  const [isTyping, setIsTyping] = useState(false);
  const [botMessage, setBotMessage] = useState(null);

  


  useEffect(() => {
    // Load chat history from local storage
      const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
      setMessages(savedMessages);
      console.log(Lists.legalConsumersList.content)
      const getlocal = JSON.parse(localStorage.getItem('promptsList'))
      if (getlocal!==null && promptList.length===1){
        setPromptList((prevState)=>([...prevState,...getlocal]))
      }
  }, []);
  
  useEffect(() => {
    // Save chat history to local storage whenever messages state changes
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const [showContent, setShowContent] = useState({
    customPrompts: false,
    legalConsumers: false,
    legalResearch: false,
    draftingDocuments: false,
    familyLawyers: false,
    personalInjury: false,
    employmentLabor: false,
    immigration: false,
  });

  const toggleContent = (section) => {
    setShowContent((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const sendMessage = async (message, regenerate = false) => {


    const userMessage = { sender: 'user', text: message };
    if (!regenerate) {
      setMessages((prevMessages) => [...prevMessages, userMessage]);
    }
    

    setInput(''); 
    setIsTyping(true);

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4o',
        messages: [{ role: 'user', content: message }],
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      

      let botMessageContent = response.data.choices[0].message.content;
      botMessageContent = formatReply(botMessageContent);
      setBotMessage(botMessageContent);
    } catch (error) {
      console.error('Error fetching the chatbot response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const formatReply = (reply) => {
    const html = marked(reply);
    return DOMPurify.sanitize(html);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
    }
  };

  const handleRegenerate = (message) => {
    sendMessage(message, true);
  };

  useEffect(() => {
    if (botMessage) {
      const botMessageObj = { sender: 'bot', text: botMessage };
      setMessages((prevMessages) => [...prevMessages, botMessageObj]);
      setBotMessage(null);
    }
  }, [botMessage]);

  console.log(process.env.REACT_APP_OPENAI_API_KEY)

  const popupbtnClicked=()=>{
    setmodelopened(true)
  }

  const closePromptPopup = ()=>{
    setmodelopened(false)
  }

  const changesearchPrompt = (e)=>{

    const promptOb = {
      id:uuidv4(),
      text:e.target.value
    }
    setnewPrompt(promptOb)
    
  }
  const h = [{id:uuidv4(),text:"provide Custom"}]
  

  const addCustomList =async ()=>{
    const v = document.getElementById('customPromptInputEle').value
    if(v!==''){
          
         
          document.getElementById('customPromptInputEle').value=''
          const retrieve = JSON.parse(localStorage.getItem('promptsList'))
          const fin = [...retrieve,newprompt]
          
          localStorage.setItem('promptsList',JSON.stringify(fin))
          const getCustom = localStorage.getItem('promptsList')
          const parseCustom = JSON.parse(getCustom)
          setPromptList(parseCustom) 
          alert('custom Prompt Added Succesfully')
          
    }
    else{
      alert("provide a value")
    }
    
    
  }

  const promptClick = (each)=>{
    document.getElementById('inputElement').value= each.text
    setInput(each.text)
    closePromptPopup()
  
  }

  Lists.legalConsumersList.content.map((each)=>{
    console.log(each.text)
  })

  return (
    <div className={`chat-area ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="chatbox" >
        <h3>Chats</h3>
        
        {messages.map((msg, index) => {
            if(msg.sender==='user'){
                 return (
                    <div  key={index} className="chatContsender" style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }} >
                        <span className={`${isDarkMode ? 'senderDark' : 'senderlight'} ${msg.sender==='user'?"senderClass":"botclass"}`} >{msg.text}</span>
                    </div>
                )
            }
            else{
                return (

                    <div key={index} className="chatCont" style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }} >
                        {/*<p className={`${isDarkMode ? 'senderDark' : 'senderlight'} ${msg.sender==='user'?"senderClass":"botclass"}`} >{msg.text}</p>*/}
                        {/*   <span className={`${isDarkMode ? 'senderDark' : 'senderlight'} ${msg.sender==='user'?"senderClass":"botclass"}`} >{msg.text}</span>*/}
                        <Message istyping={isTyping} key={index} sender={msg.sender} text={msg.text} />
                      
                          <IoReloadCircleOutline
                          className="regenerate-icon"
                          onClick={() => handleRegenerate(msg.text)}
                        />
                       
                        
                        
                    </div>
                    
                )
            }
       })}
              {isTyping && <div style={{color:"red"}} className="  message bot typing">legAI is typing...</div>}
      </div>
      <div className="promptBtnContainer">
        <button onClick={popupbtnClicked} className="prompsBtn">
          Prompts
        </button>
        <Popup open={modelopened} onClose={closePromptPopup} className="popupclass" modal>
            {close => (
              <div className="modal-prompt">

                
                <button className="close" onClick={close}>
                  &times;
                </button>


                <div className="header">Prompts Base</div>
                <div className="content">
                  <p className="promptPopupDescript">Choose the prompt that suits you best. Once you click, it'll appear in the text input field. You can then send it as is or add your own words.</p>
                  <div className="customPromptinputContainer">
                    <input id="customPromptInputEle" className="inputPrompt" type="text" onChange={changesearchPrompt}/>
                    <button onClick={addCustomList} className="buttonPlusIcon">
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    
                  </div>
                  <div className="promptsCont">

                  
                  <div className="toggle-content">
                    <button className="toggle-button" onClick={() => toggleContent('customPrompts')}>
                    Custom prompts
                      {showContent.customPrompts ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </button>
                    <div className="contentview">
                    {showContent.customPrompts&&(
                      <div className="contentview">
                      {promptList.map((each)=>(
                        
                          <button onClick={()=>promptClick(each)} key={each.id} className="contentParaShow">{each.text}</button>
                         
                        
                      ))}
                      
                      </div>
                      
                    )}
                    </div>
                   
                  </div>
                  <div className="toggle-content">
                    <button className="toggle-button" onClick={() => toggleContent('legalConsumers')}>
                    Prompts for Legal Consumers
                      {showContent.legalConsumers ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </button>
                    {showContent.legalConsumers&&(
                      <>
                      {Lists.legalConsumersList.content.map((each)=>(
                            <button onClick={()=>promptClick(each)} key={each.id} className="contentParaShow">{each.text}</button>
                        
                      ))}
                      
                      </>
                    )}
                  </div>
                  <div className="toggle-content">
                    <button className="toggle-button" onClick={() => toggleContent('legalResearch')}>
                    Prompts for Legal Research
                      {showContent.legalResearch ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </button>
                    {showContent.legalResearch&&(
                      <>
                      {Lists.legalResearchList.content.map((each)=>(
                            <button onClick={()=>promptClick(each)} key={each.id} className="contentParaShow">{each.text}</button>
                        
                      ))}
                      
                      </>
                    )}
                  </div>
                  <div className="toggle-content">
                    <button className="toggle-button" onClick={() => toggleContent('draftingDocuments')}>
                    Prompts for Drafting Legal Documents
                      {showContent.draftingDocuments ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </button>
                    {showContent.draftingDocuments&&(
                      <>
                      {Lists.DraftingLegalDocuments.content.map((each)=>(
                            <button onClick={()=>promptClick(each)} key={each.id} className="contentParaShow">{each.text}</button>
                        
                      ))}
                      
                      </>
                    )}
                  </div>
                  <div className="toggle-content">
                    <button className="toggle-button" onClick={() => toggleContent('familyLawyers')}>
                    Prompts for Family Lawyers
                      {showContent.familyLawyers ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </button>
                    {showContent.familyLawyers &&(
                      <>
                      {Lists.familylawList.content.map((each)=>(
                            <button onClick={()=>promptClick(each)} key={each.id} className="contentParaShow">{each.text}</button>
                        
                      ))}
                      
                      </>
                    )}
                  </div>
                  <div className="toggle-content">
                    <button className="toggle-button" onClick={() => toggleContent('personalInjury')}>
                    Prompts for Personal Injury Lawyers
                      {showContent.personalInjury ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </button>
                    {showContent.personalInjury &&(
                      <>
                      {Lists.personalinjuryList.content.map((each)=>(
                            <button onClick={()=>promptClick(each)} key={each.id} className="contentParaShow">{each.text}</button>
                        
                      ))}
                      
                      </>
                    )}
                  </div>
                  <div className="toggle-content">
                    <button className="toggle-button" onClick={() => toggleContent('employmentLabor')}>
                    Prompts for Employment Labor lawyers
                      {showContent.employmentLabor ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </button>
                    {showContent.employmentLabor &&(
                      <>
                      {Lists.EmployLabourList.content.map((each)=>(
                            <button onClick={()=>promptClick(each)} key={each.id} className="contentParaShow">{each.text}</button>
                        
                      ))}
                      
                      </>
                    )}
                  </div>
                  <div className="toggle-content">
                    <button className="toggle-button" onClick={() => toggleContent('immigration')}>
                    Prompts for Immigration lawyers
                      {showContent.immigration ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </button>
                    {showContent.immigration &&(
                      <>
                      {Lists.immigrationList.content.map((each)=>(
                            <button onClick={()=>promptClick(each)} key={each.id} className="contentParaShow">{each.text}</button>
                        
                      ))}
                      
                      </>
                    )}
                  </div>

                 
                  
                  </div>
                    
                </div>
              </div>
            )}
          </Popup>
      </div>
      <div className="inputandSendbtnContainer">
        <form  onSubmit={handleSubmit} className="inputSendContn">
        <FontAwesomeIcon className="micIcon" icon={faMicrophone} />
          <FontAwesomeIcon className="micIcon" icon={faCamera} />
            <input
            className='inputmsg'
            id="inputElement"
            type="text"
            placeholder="Ask Your Question?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            
            />
        <button className="sendMsgbtn" >
              <FontAwesomeIcon icon={faPaperPlane} />

        </button>
        </form>
          
      </div>
      
    </div>
  );
};

export default Chatbot;
