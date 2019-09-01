$(function () {
  console.log('index.js loaded ...');
  listenToDataLinks()
  listenForNewFormLinks()
})

const baseUrl = 'https://learntek-api.herokuapp.com/api/'
// const baseUrl = 'http://127.0.0.1:3001/api/'

console.log('baseURL: ', baseURL)
function clearNewFormDiv() {
  $('div#new-form-div').html('')
}

function spinnerNewFormDiv(path) {
  $('div#new-form-div').html(`
		<p>
			<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
			fetching <strong>new ${path} form</strong>
		</p>
	`)
}

function clearApiDataDiv() {
  $('div#api-data-div').html('')
}

function spinnerApiDataDiv(url) {
  $('div#api-data-div').html(`
		<p>
			<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
			fetching <strong>${url}</strong> API data
		</p>
	`)
}

function listenToDataLinks() {
  $('tag.api-links').on('click', getApiData)
}

function getApiData(event) {
  event.preventDefault()
  clearNewFormDiv()


  let url = this.id
  let dataDiv = $('div#api-data-div')
  spinnerApiDataDiv(url)

  setTimeout(() => {
    $.ajax({
      url: baseUrl + url,
      method: 'get',
      dataType: 'json'
    }).done(function (data) {

      clearApiDataDiv()
      switch (url) {
        case 'tracks':
          data.forEach(obj => {
            let newTrack = new Track(obj)
            dataDiv.append(newTrack.trackHTML())
          })
          break;

        case 'resources':
          data.forEach(obj => {
            let newResource = new Resource(obj)
            dataDiv.append(newResource.resourceHTML())
          })
          break;

        case 'activities':
          data.forEach(obj => {
            let newActivity = new Activity(obj)
            dataDiv.append(newActivity.activityHTML())
          })
          break;

        case 'categories':
          data.forEach(obj => {
            let newCategory = new Category(obj)
            dataDiv.append(newCategory.categoryHTML())
          })
          listenCategoryResources()
          break;

        default:
          console.log('there was no data returned');
      }
    })
  }, 500);
}

function listenForNewFormLinks() {
  $('tag.api-new-links').on('click', getNewForm)
}

function getNewForm(event) {
  event.preventDefault()
  let form = this.id

  switch (form) {
    case 'new-track':
      newTrackForm()
      break;
    case 'new-resource':
      newResourceForm()
      break;
    case 'new-activity':
      newActivityForm()
      break;
    case 'new-category':
      newCategoryForm()
      break;
    default:
      console.log('there was no form specified in the request');
  }
}
