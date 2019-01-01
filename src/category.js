
function getData() {
	let apiLinks = document.querySelectorAll('a.api-links')
	apiLinks.forEach(link => {
	})
}

class Category {
	constructor(obj) {
		this.id = obj.id
		this.name = obj.name
		this.resources = obj.resources
	}
}

Category.prototype.categoryHTML = function () {
	return (`
		<div>
			<h3>${this.name}</h3>
			<button class='category-resources-buttons' id=${this.id}>show resources</button>
		</div>
		<div data-id=${this.id} class='category-resources-div'></div> 
		`)
}

function listenCategoryResources() {
	const categoryResourceButtons = document.querySelectorAll('button.category-resources-buttons')
	categoryResourceButtons.forEach(button => {
		button.addEventListener('click', function (event) {
			event.preventDefault()
			showCategoryResources(this.id)
			button.remove()
		})
	});
}

function showCategoryResources(id) {
	fetch(baseUrl + 'resources.json')
		.then(res => res.json()
			.then(data => {
				let resources = data.filter(r => {
					return r.category_id === +id
				})
				let resourcesHTML = resources.map((r, i) => {
					return `<li>${r.name}</li>`
				}).join('')
				document.querySelectorAll('.category-resources-div')[id - 1].innerHTML = resourcesHTML
			})
		)
}

function newCategoryForm() {
	let categoryForm = (`
		<fieldset>
			<strong>New Category</strong>
			<form id='new-category-form'>
				<input id='name' placeholder='category name' /><br>
				<button type='submit'>Submit Category</button>
			</form>
		</fieldset>
		`)
	document.getElementById('new-form-div').innerHTML = categoryForm
	createCategory()
}

function createCategory() {
	let form = document.querySelector('form#new-category-form')
	form.addEventListener('submit', function (event) {
		event.preventDefault()
		let name = event.currentTarget.name.value
		let category = {
			name: name
		}

		fetch('http://localhost:3000/api/categories', {
			method: 'post',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(category)
		}).then(function (response) {
			document.getElementById('new-form-div').innerHTML = ''
		});
	})
}
