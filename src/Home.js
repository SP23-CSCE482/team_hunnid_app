import './styles/App.css'
import React, { useContext, useState } from 'react'
import UserContext from './components/user'
import hunnidpng from './resources/hunnidpng.png'
import PdfUpload from './components/pdfUpload'
import useCollapse from 'react-collapsed'

const urlpdfToText = 'http://localhost:3001/pdfToText'
const urlreqQuestions = 'http://localhost:3001/reqQuestions'
const urlreqResults = 'http://localhost:3001/reqResults'

function Collapsible(props) {
  const [isExpanded, setExpanded] = useState(props.curState)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })
  function handleOnClick() {
    setExpanded(!isExpanded);
  }
  return props.style === 1 ? (
    <div className="result_card_primary">
      <div className="card-header" {...getToggleProps({ onClick: handleOnClick })}>
        {props.tag}
      </div>
      <div {...getCollapseProps()}>
        <div className="content">{props.children}</div>
      </div>
    </div>
  ) : (
    <div className="result_card_secondary">
      <div className="card-header" {...getToggleProps({ onClick: handleOnClick })}>
        {props.tag}
      </div>
      <div {...getCollapseProps()}>
        <div className="content">{props.children}</div>
      </div>
    </div>
  )
}
Collapsible.defaultProps = {
  curState: false
}
function Home() {
  const [pdfText, setPdfText] = useState(null)
  const [pdfQuestions, setPdfQuestions] = useState(null)
  const user = useContext(UserContext)
  const isLoggedin = user ? Object.keys(user).length != 0 : null

  const handleUploadedFile = (file) => {
    let formData = new FormData()
    formData.append('pdf', file[0], file[0].name)
    formData.append('Content-Type', 'application/pdf')

    const requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    }

    fetch(urlreqQuestions, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setPdfText(null)
        setPdfQuestions(JSON.parse(result).data)
      })
      .catch((error) => console.log('error', error))
  }

  const handleQuestionSubmission = (file) => {
    let formData = new FormData()

    let temp = document.getElementsByClassName('checkbox')
    let tempData = []
    for (let itr = 0; itr < temp.length; itr++) {
      (temp[itr].checked) ? tempData.push({id: itr,question: pdfQuestions[itr].question.toString().substring(3)}) : false
    }
    formData.append('data', JSON.stringify(tempData))
    const requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    }

    fetch(urlreqResults, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setPdfQuestions(null)
        console.log("Here")
        setPdfText(JSON.parse(result).data)
      })
      .catch((error) => console.log('error', error))
  }

  const displayResources = (resources) => {
    console.log(resources.toString())
    return resources.toString().includes('http') ? (
      <li>
        <a
          className="card-text"
          href="https://www.w3schools.com/jsref/jsref_includes.asp"
          target="_blank"
          rel="noreferrer noopener"
        >
          {resources}
        </a>
      </li>
    ) : (
      <li>
        <p className="card-text">{resources}</p>
      </li>
    )
  }

  const displayQuestions = (question) => {
    return <li>{question}</li>
  }

  const displayTagQuestion = (obj, id, expanded, state) => {
    return id % 2 === 1 ? (
      <Collapsible style={0} tag={obj.tag} curState={expanded}>
        <div className="card-body">
          <div className="row">
            <div className="column">
              <h4>{(state == 0) ? "Question" : "Related Questions Missed"}</h4>
              <div className="smallcol">
                <h5 className="result_card_text_secondary">
                  {(state == 0) ? <p>{displayQuestions(obj.question[0].substring(3))}</p> : <ol>{obj.question.map((obj) => displayQuestions(obj))}</ol>}
                </h5>
              </div>
            </div>
            <div className="column">
              <h4>{(state == 1) ? "Recommended Resources" : "Mark for Model Recommendation"}</h4>
              <div className="smallcol">
                <h5 className="result_card_text_secondary">
                  <ol>
                    {(state == 1) ? <ol>{obj.question.map((obj) => displayResources(obj))}</ol> : <input className="checkbox" type="checkbox" name={(id + 1).toString() + "cMark"}></input>}
                  </ol>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </Collapsible>
    ) : (
      <Collapsible style={1} tag={obj.tag} curState={expanded}>
        <div className="card-body">
          <div className="row">
            <div className="column">
              <h4>{(state == 0) ? "Question" : "Related Questions Missed"}</h4>
              <div className="smallcol">
                <h5 className="result_card_text_primary">
                  {(state == 0) ? <p>{displayQuestions(obj.question[0].substring(3))}</p> : <ol>{obj.question.map((obj) => displayQuestions(obj))}</ol>}
                </h5>
              </div>
            </div>
            <div className="column">
              <h4>{(state == 1) ? "Recommended Resources" : "Mark for Model Recommendation"}</h4>
              <div className="smallcol">
                <h5 className="result_card_text_primary">
                  <ol>
                    {(state == 1) ? <ol>{obj.question.map((obj) => displayResources(obj))}</ol> : <input className="checkbox" type="checkbox" name={(id + 1).toString() + "cMark"}></input>}
                  </ol>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </Collapsible>
    )
  }

  return (
    <div data-testid="home-1" className="App-background">
      <div data-testid="home-2" className="App-header">
        {!isLoggedin && (
          <div className={'d-flex flex-column align-items-center py-5'}>
            <img src={hunnidpng} width={250} />
            <h2
              data-testid="welcome"
              className={'text-center font-weight-bold'}
            >
              Personalized studying, personalized learning.<br></br>
              Login to get started.
            </h2>
          </div>
        )}
        {isLoggedin && (
          <div className={'d-flex flex-column align-items-center '}>
            <h2
              data-testid="welcomeUser"
              className={'text-center font-weight-bold'}
            >
              Howdy {user.given_name}!
            </h2>
            <img src={hunnidpng} width={250} />
            {!pdfText && !pdfQuestions && (
              <p className={'instructions'}>
                Upload your assignment below, and we&apos;ll recommend you study
                materials that best suit your needs.
              </p>
            )}
            {pdfText && (
              <p className={'topic_instructions'}>
                Below are some topics we think you should focus on. Click a
                topic to see some related resources we recommend.
              </p>
            )}
            <div className="upload-section">

              {pdfQuestions && (
                <div className="extracted-text-section">
                  {pdfQuestions.map((obj) => displayTagQuestion(obj, obj.id, true, 0))}
                </div>
              )}

              {pdfText && (
                <div className="extracted-text-section">
                  {pdfText.map((obj) => displayTagQuestion(obj, obj.id, false, 1))}
                </div>
              )}

              {!pdfQuestions && (
                <PdfUpload
                  data-testid="FileUpload"
                  accept=".pdf"
                  updateFileCb={handleUploadedFile}
                />)}

              {!pdfText && pdfQuestions && (
                <div className="file-upload-container">

                  <button type="submit" value="Submit" className="upload-file-button" onClick={handleQuestionSubmission}>
                    <span>Send to Model</span>
                  </button>

                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Home
