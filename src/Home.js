import './App.css'
import React, { useContext, useState } from 'react'
import UserContext from './components/user'
import hunnidpng from './resources/hunnidpng.png'
import PdfUpload from './components/pdfUpload'
import TextUpload from './components/textUpload'

import useCollapse from 'react-collapsed'
const url = 'http://localhost:3001/pdfToText'
const urlForText = 'http://localhost:3001/TextBoxToRecommendation'

function Collapsible(props) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()
  return props.style === 1 ? (
    <div className="result_card_primary">
      <div className="card-header" {...getToggleProps()}>
        {props.tag}
      </div>
      <div {...getCollapseProps()}>
        <div className="content">{props.children}</div>
      </div>
    </div>
  ) : (
    <div className="result_card_secondary">
      <div className="card-header" {...getToggleProps()}>
        {props.tag}
      </div>
      <div {...getCollapseProps()}>
        <div className="content">{props.children}</div>
      </div>
    </div>
  )
}

function Home() {
  const [pdfText, setPdfText] = useState(null)
  const [resourceArray, setResourceArray] = useState(null)
  const user = useContext(UserContext)
  const isLoggedin = user ? Object.keys(user).length != 0 : null
  const testData = [
    {
      id: 1,
      tag: 'Vector Functions',
      question: [
        'Find the dot product of these two vectors',
        'Calculate the scalar proejction of these two vectors',
      ],
      resources: [
        'https://getbootstrap.com/docs/4.0/components/card/',
        'Chapter 3.2 of Early Transcendentals',
        'Chapter 3.2 of Early Transcendentals',
        'Chapter 3.2 of Early Transcendentals',
        'Chapter 3.2 of Early Transcendentals',
        'Chapter 3.2 of Early Transcendentals',
      ],
    },
    {
      id: 2,
      tag: 'Quadratic Equations',
      question: ['Convert the equation 6x^2 - 17x + 12 into standard form.'],
      resources: [
        'https://getbootstrap.com/docs/4.0/components/badge',
        'Chapter 4.1 of Early Transcendentals',
      ],
    },
    {
      id: 3,
      tag: 'Parametric Equations',
      question: [
        'Choose the graph that fits the equation: x = 4  -2t, y = 3 + 6t-4t^2',
        'x^2 + y^2 = 36, but convert it into parametric equations',
      ],
      resources: [
        'https://getbootstrap.com/docs/4.0/components/badge',
        'Chapter 4.1 of Early Transcendentals',
      ],
    },
    {
      id: 4,
      tag: 'Derivatives',
      question: [
        'What is the derivative of x^2+ y^2?',
        'Find the slope of the line y = x^2 + 2x + 4 at x = 2.?',
      ],
      resources: [
        'https://getbootstrap.com/docs/4.0/components/badge',
        'Chapter 4.1 of Early Transcendentals',
        'Chapter 4.3 of Early Transcendentals',
        'https://getbootstrap.com/docs/4.0/components/badge',
      ],
    },
  ]
  // const handleUploadedFile = (file) => {
  //   let formData = new FormData()
  //   formData.append('pdf', file[0], file[0].name)
  //   formData.append('Content-Type', 'application/pdf')

  //   const requestOptions = {
  //     method: 'POST',
  //     body: formData,
  //     redirect: 'follow',
  //   }

  //   fetch(url, requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => {
  //       const parsedResult = JSON.parse(result)
  //       setPdfText(parsedResult.data.text)
  //     })
  //     .catch((error) => console.log('error', error))
  // }
  const handleUploadedFile = (file) => {
    // to clear existing cards
    setResourceArray(null)
    setPdfText(testData)
  }
  const displayResources = (resources) => {
    console.log(resources.toString())
    return resources.toString().includes('http') ? (
      <li>
        <a
          className="card-text"
          href={resources.toString()}
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
    formData.append(
      'question',
      document.getElementById('questionToCategorize').value,
    )
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
    document.getElementById('questionToCategorize').value = ''
  }
  const displayTagQuestion = (obj, id) => {
    console.log(obj)
    return id % 2 === 1 ? (
      <Collapsible style={0} tag={obj.tag}>
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
      <Collapsible style={1} tag={obj.tag}>
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
            {!pdfText && (
              <p className={'instructions'}>
                We&apos;ll recommend you study materials that best suit your
                needs.
              </p>
            )}
            {pdfText && (
              <p className={'topic_instructions'}>
                Below are some topics we think you should focus on. <br></br>{' '}
                Click a topic to see some related resources we recommend.
              </p>
            )}
            <div className="upload-section">
              {resourceArray && (
                <div className="extracted-text-section">
                  {resourceArray.map((obj) => displayTagQuestion(obj, obj.id))}
                  {/* {pdfText &&
                  pdfText.map((page, index) => <p key={index}>{page}</p>)} */}
                </div>
              )}

              {pdfText && (
                <div className="extracted-text-section">
                  {testData.map((obj) => displayTagQuestion(obj, obj.id))}
                  {/* {pdfText &&
                  pdfText.map((page, index) => <p key={index}>{page}</p>)} */}
                </div>
              )}
              <div className="container d-flex flex-column align-items-center">
                <div className="row border-top">
                  <div className="col-xl">
                    <div className="text-upload-container">
                      <form onSubmit={handleUploadedText}>
                        <div className="form-group">
                          <label className="p-1">Just one question?</label>
                          <textarea
                            className="form-control-sm"
                            id="questionToCategorize"
                            rows="4"
                            cols="50"
                            placeholder="Input question to categorize here:"
                          ></textarea>
                          <div className="p-2">
                            <input
                              type="submit"
                              className="upload-text-button"
                              value="Get Resources"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-xl">
                    <div className="text-upload-container">
                      <div className="form-group">
                        <label className="p-1">Upload an assignment?</label>
                        <PdfUpload
                          data-testid="FileUpload"
                          accept=".pdf"
                          updateFileCb={handleUploadedFile}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Home
