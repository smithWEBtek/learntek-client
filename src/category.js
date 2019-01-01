// console.log('category.js loaded ---');
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

	static categoryForm() {
		return (`
			<form id='new-category-form'>
				<label class='subtitle'>New Category</label>

				<!-- name -->
				<div class="field">
					<div class="control has-icons-left has-icons-right">
						<input class="input is-info" type="text" placeholder="name">
					</div>
				</div>

				<!-- Submit -->
				<div class="field is-grouped">
					<div class="control is-info">
						<button class="input is-primary">Submit</button>
					</div>

					<!-- Cancel -->
					<div class="control">
						<button class="input is-text is-danger">Cancel</button>
					</div>	
				</div>
			</form>
		`)
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
	clearApiDataDiv()
	spinnerNewFormDiv('category')

	let categoryForm = Category.categoryForm()
	$('#new-form-div').html(categoryForm)
	createCategory()
}

function createCategory() {
	$('form#new-category-form').on('submit', function (event) {
		event.preventDefault()

		let category = {
			name: event.target[0].value
		}

		fetch(`${baseUrl}categories`, {
			method: 'post',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(category)
		}).then(() => {
			clearNewFormDiv()
		});
	})
}
