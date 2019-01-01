
class Track {
	constructor(obj) {
		this.name = obj.name
		this.description = obj.description
		this.category_id = obj.category_id
		this.status = obj.status
		this.start_date = obj.start_date
		this.goal_date = obj.goal_date
	}
}

Track.prototype.trackHTML = function () {
	return (`
		<div>
			<h3>${this.name}</h3>
		</div>
	`)
}

function newTrackForm() {
	fetch(baseUrl + 'categories')
		.then(res => res.json()
			.then(categories => {

				let categoryOptions = categories.map(category => {
					return (`<option value=${category.id}>${category.name}</option>`)
				})

				let trackForm = (`
					<fieldset>
						<strong>New Track</strong>
						<form id='new-track-form'>
							<input type='date' id='start_date' placeholder='start_date'/><br>
							<input id='name' placeholder='track name' /><br>
							<input id='description' placeholder='description'/><br>
							
							<select id='statusSelect' placeholder='status'>
								<option>choose status</option>
								<option value='new'>new</option>
								<option value='started'>started</option>
								<option value='progressing'>progressing</option>
								<option value='complete'>complete</option>
								</select><br>
								
								<select id="categorySelect"><br>
									<option>choose category</option>
									${categoryOptions}
								</select><br>
							
							<button type='submit'>Submit Track</button>
						</form>
					</fieldset>
				`)
				document.getElementById('new-form-div').innerHTML = trackForm
				createTrack()
			})
		)
}

function createTrack() {
	let form = document.querySelector('form#new-track-form')
	form.addEventListener('submit', function (event) {
		event.preventDefault()
		let start_date = event.currentTarget.start_date.value
		let name = event.currentTarget.name.value
		let description = event.currentTarget.description.value
		let status = event.currentTarget.statusSelect.value
		let category_id = event.currentTarget.categorySelect.value

		let track = {
			start_date: start_date,
			name: name,
			description: description,
			status: status,
			category_id: category_id
		}

		fetch('http://localhost:3000/api/tracks', {
			method: 'post',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(track)
		}).then(function (response) {
			document.getElementById('new-form-div').innerHTML = ''
		});
	})
}

