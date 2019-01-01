const baseUrl = 'https://learntek-api.herokuapp.com/api/'

const dataDiv = document.getElementById('api-data')

clearDataDiv()
listenToDataLinks()
listenToNewFormLinks()

function clearDataDiv() {
	dataDiv.innerHTML = ''
}

function listenToDataLinks() {
	let apiLinks = document.querySelectorAll('a.api-links')
	apiLinks.forEach(link => {
		link.addEventListener('click', getApiData)
	})
}

function getApiData(event) {
	event.preventDefault()
	let url = this.id
	let dataDiv = document.getElementById('api-data')

	dataDiv.innerHTML = '...loading...'
	let apiDataHtml = ''

	fetch(baseUrl + url)
		.then(res => res.json()
			.then(data => {
				switch (url) {

					case 'tracks':
						data.forEach(item => {
							let newTrack = new Track(item)
							document.getElementById('new-form-div').innerHTML = ''
							apiDataHtml += newTrack.trackHTML()
						})
						dataDiv.innerHTML = apiDataHtml
						break;

					case 'resources':
						data.forEach(item => {
							let newResource = new Resource(item)
							document.getElementById('new-form-div').innerHTML = ''
							apiDataHtml += newResource.resourceHTML()
						})
						dataDiv.innerHTML = apiDataHtml
						break;

					case 'activities':
						data.forEach(item => {
							let newActivity = new Activity(item)
							document.getElementById('new-form-div').innerHTML = ''
							apiDataHtml += newActivity.activityHTML()
						})
						dataDiv.innerHTML = apiDataHtml
						break;

					case 'categories':
						data.forEach(item => {
							let newCategory = new Category(item)
							document.getElementById('new-form-div').innerHTML = ''
							apiDataHtml += newCategory.categoryHTML()
						})
						dataDiv.innerHTML = apiDataHtml
						listenCategoryResources()
						break;

					default:
						console.log('there was no data returned');
				}
			})
		)
}

function listenToNewFormLinks() {
	let apiNewLinks = document.querySelectorAll('a.api-new-links')
	apiNewLinks.forEach(link => {
		link.addEventListener('click', getNewForm)
	})
}

function getNewForm(event) {
	event.preventDefault()
	let form = this.id
	clearDataDiv()

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
			console.log('there was no form specified in the request, (check this.id) ');
	}
}

