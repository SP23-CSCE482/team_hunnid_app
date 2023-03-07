// SRC : fBruzja
const pdfJsLib = require('pdfjs-dist/es5/build/pdf.js')

function getText(pdfUrl) {
  const loadingTask = pdfJsLib.getDocument(pdfUrl)
  var completeStr = ''
  return loadingTask.promise
    .then(function (doc) {
      const numPages = doc.numPages

      let promises // will hold chained promises
      promises = doc.getMetadata().then() // need to resolve the pdf metadata in order to proceed with the pages

      const loadPage = function (pageNum) {
        return doc.getPage(pageNum).then(function (page) {
          return page
            .getTextContent()
            .then(function (content) {
              const strings = content.items.map(function (item) {
                return item.str
              })
              completeStr += strings.join(' ')
              page.cleanup()
            })
            .then()
        })
      }

      for (let i = 1; i <= numPages; i++) {
        promises = promises.then(loadPage.bind(null, i))
      }
      return promises
    })
    .then(
      function () {
        console.log('End of Document, text extracted')
        console.log(completeStr)
        return completeStr
      },
      function (err) {
        console.error('Error: ' + err)
      },
    )
}

module.exports = getText
