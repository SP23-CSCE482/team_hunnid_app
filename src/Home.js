import './App.css'
import React, { useContext, useState } from 'react'
import UserContext from './components/user'
import hunnidpng from './resources/hunnidpng.png'
import PdfUpload from './components/pdfUpload'
import useCollapse from 'react-collapsed'
import { BASE_API_URL } from './utils/constants'
const port = process.env.PORT || 3001;
const url = BASE_API_URL+'/pdfToText'
const urlForText = BASE_API_URL+'/TextBoxToRecommendation'

function Collapsible(props) {
  const [isExpanded, setExpanded] = useState(props.curState)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })
  function handleOnClick() {
    setExpanded(!isExpanded);
  }
  return props.style === 1 ? (
    <div className="result_card_primary">
      <div className="card-header" {...getToggleProps({onClick: handleOnClick})}>
        {props.tag}
      </div>
      <div {...getCollapseProps()}>
        <div className="content">{props.children}</div>
      </div>
    </div>
  ) : (
    <div className="result_card_secondary">
      <div className="card-header" {...getToggleProps({onClick: handleOnClick})}>
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
  const [resourceArray, setResourceArray] = useState(null)
  const [pdfQuestions, setPdfQuestions] = useState(null)
  const user = useContext(UserContext)
  const isLoggedin = user ? Object.keys(user).length != 0 : null

  const handleUploadedFile = (file) => {
    // to clear existing cards
    setResourceArray(null)
    let formData = new FormData()
    formData.append('pdf', file[0], file[0].name)
    formData.append('Content-Type', 'application/pdf')

    const requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    }

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
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
          href = {resources.toString()}
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

  const handleUploadedText = (event) => {
    // to clear existing cards
    setPdfText(null)

    event.preventDefault()
    let formData = new FormData()
    formData.append("question",document.getElementById('questionToCategorize').value)
    const requestOptions = {
      method: 'POST',
      body: formData,
    }

    fetch(urlForText, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const parsedResult = JSON.parse(result)
        console.log(parsedResult.data)
        console.log(Array.isArray(parsedResult.data))
        setResourceArray([parsedResult])
        console.log(resourceArray)
      })
      .catch((error) => console.log('error', error))
      document.getElementById('questionToCategorize').value =''
  }
  const displayTagQuestion = (obj, id, expanded, state) => {
    console.log(obj)
    return id % 2 === 1 ? (
      <Collapsible style={0} tag={obj.tag} curState={expanded}>
        <input type="checkbox" name={id.toString() + "cMark"}></input>
        <div className="card-body">
          <div className="row">
            <div className="column">
              <h4>Related Questions Missed</h4>
              <div className="smallcol">
                <h5 className="result_card_text_secondary">
                  <ol>{obj.question.map((obj) => displayQuestions(obj))}</ol>
                </h5>
              </div>
            </div>
            <div className="column">
              <h4>Recommended Resources</h4>
              <div className="smallcol">
                <h5 className="result_card_text_secondary">
                  <ol>
                    {obj.resources.map((obj) => displayResources(obj, obj.id))}
                  </ol>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </Collapsible>
    ) : (
      <Collapsible style={1} tag={obj.tag} curState={expanded}>
        <input type="checkbox" name={id.toString() + "cMark"}></input>
        <div className="card-body">
          <div className="row">
            <div className="column">
              <h4>Related Questions Missed</h4>
              <div className="smallcol">
                <h5 className="result_card_text_primary">
                  <ol>{obj.question.map((obj) => displayQuestions(obj))}</ol>
                </h5>
              </div>
            </div>
            <div className="column">
              <h4>Recommended Resources</h4>
              <div className="smallcol">
                <h5 className="result_card_text_primary">
                  <ol>
                    {obj.resources.map((obj) => displayResources(obj, obj.id))}
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
            {resourceArray && (
              <div className="extracted-text-section">
                {resourceArray.map((obj) => displayTagQuestion(obj, obj.id))}
              </div>
            )}
            <form onSubmit={handleUploadedText}>
                <label>
                  Input Question to Categorize:
                  <textarea id="questionToCategorize" rows="4" cols="50">
                  </textarea>
                </label>
              <input type="submit" className="upload-file-button" value="Get Resources"/>
            </form>
            <div className="upload-section">
              {pdfQuestions && (
                <div className="extracted-text-section">
                  {pdfQuestions.map((obj) => displayTagQuestion(obj, obj.id, false))}
                </div>
              )}

              {pdfText && (
                <div className="extracted-text-section">
                  {pdfText.map((obj) => displayTagQuestion(obj, obj.id, true))}
                </div>
              )}

              {!pdfQuestions && (
                <PdfUpload
                  data-testid="FileUpload"
                  accept=".pdf"
                  updateFileCb={handleUploadedFile}
                />)}

            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Home
