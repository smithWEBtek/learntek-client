
class Resource {
	constructor(obj) {
		this.name = obj.name
		this.category_id = obj.category_id
		this.name = obj.name
		this.description = obj.description
		this.category_id = obj.category_id
		this.status = obj.status
		this.start_date = obj.start_date
		this.goal_date = obj.goal_date
	}
}

Resource.prototype.resourceHTML = function () {
	return (`
		<div>
		<h3>${this.name}</h3>
		</div>
	`)
}

function newResourceForm() {
	fetch(baseUrl + 'categories')
		.then(res => res.json()
			.then(categories => {

				let categoryOptions = categories.map(category => {
					return (`<option value=${category.id}>${category.name}</option>`)
				})

				let resourceForm = (`
					<fieldset>
						<strong>New Resource</strong>
						<form id='new-resource-form'>
							<input id='name' placeholder='resource name' /><br>
							<input id='description' placeholder='description'/><br>
							<input id='url' placeholder='url'/><br>
							<input id='format' placeholder='format'/><br>
							<select id="categorySelect"><br>
							<option>choose category</option>
								${categoryOptions}
							</select><br>
							<button type='submit'>Submit Resource</button>
						</form>
					</fieldset>
				`)
				document.getElementById('new-form-div').innerHTML = resourceForm
				createResource()
			})
		)
}

function createResource() {
	let form = document.querySelector('form#new-resource-form')
	form.addEventListener('submit', function (event) {
		event.preventDefault()
		let name = event.currentTarget.name.value
		let description = event.currentTarget.description.value
		let url = event.currentTarget.url.value
		let format = event.currentTarget.format.value
		let category_id = event.currentTarget.categorySelect.value

		let resource = {
			name: name,
			description: description,
			category_id: category_id,
			url: url,
			format: format
		}

		fetch('http://localhost:3000/api/resources', {
			method: 'post',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(resource)
		}).then(function (response) {
			document.getElementById('new-form-div').innerHTML = ''
		});
	})
}
