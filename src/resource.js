// console.log('resource.js loaded ---');

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

	static resourceForm(categoryOptions) {
		return (`
		<form id='new-resource-form'>
		<label class='subtitle'>New Resource</label>
		<div class="field">
			<div class="control">
				<div class="select is-info">
					<select>
						<option>category</option>
						${categoryOptions}
					</select>
				</div>
			</div>
		</div>
		<div class="field">
			<div class="control has-icons-left has-icons-right">
				<input class="input is-info" type="text" placeholder="name">
			</div>
		</div>
		<div class="field">
			<div class="control has-icons-left has-icons-right">
				<input class="input is-info" type="text" placeholder="description">
			</div>
		</div>
		<div class="field">
			<div class="control has-icons-left has-icons-right">
				<input class="input is-info" type="text" placeholder="format">
			</div>
		</div>
		<div class="field">
			<div class="control has-icons-left has-icons-right">
				<input class="input is-info" type="text" placeholder="url">
			</div>
		</div>
		 
		<div class="field is-grouped">
			<div class="control is-info">
				<button class="input is-primary">Submit</button>
			</div>
			<div class="control">
				<button class="input is-text is-danger">Cancel</button>
			</div>
		</div>
		</form>
	`)
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
	clearApiDataDiv()
	spinnerNewFormDiv('resource')
	let categoryOptions = ''

	fetch(baseUrl + 'categories', {
		method: 'get',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
	}).then(res => res.json()
		.then(categories => {
			categoryOptions = categories.map(category => {
				return (`<option class="dropdown-item" value=${category.id}>${category.name}</option>`)
			})
			let form = Resource.resourceForm(categoryOptions)
			$('#new-form-div').html(form)
			createResource()
		})
	)
}

function createResource() {
	$('form#new-resource-form').on('submit', function (event) {
		event.preventDefault()

		let category_id = event.target[0].value
		let name = event.target[1].value
		let description = event.target[2].value
		let format = event.target[3].value
		let url = event.target[4].value

		let resource = {
			name: name,
			description: description,
			category_id: category_id,
			url: url,
			format: format
		}

		fetch(`${baseUrl}resources`, {
			method: 'post',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(resource)
		}).then(() => {
			clearNewFormDiv()
		});
	})
}
