// console.log('track.js loaded ---');
class Track {
	constructor(obj) {
		this.name = obj.name
		this.description = obj.description
		this.category_id = obj.category_id
		this.status = obj.status
		this.start_date = obj.start_date
		this.goal_date = obj.goal_date
	}

	static trackForm(categoryOptions) {
		clearApiDataDiv()
		fetch(baseUrl + 'categories')
			.then(res => res.json()
				.then(categories => {

					let categoryOptions = categories.map(category => {
						return (`<option value=${category.id}>${category.name}</option>`)
					})

					let trackForm = (`
					<form id='new-track-form'>
						<label class='subtitle'>New Track</label>
					
						<!-- date -->
						<div class="field">
							<div class="control has-icons-left has-icons-right">
								<input class="input is-info" type="date" placeholder="start_date">
							</div>
						</div>
					
						<!-- name -->
						<div class="field">
							<div class="control has-icons-left has-icons-right">
								<input class="input is-info" type="text" placeholder="name">
							</div>
						</div>
					
						<!-- description -->
						<div class="field">
							<div class="control has-icons-left has-icons-right">
								<input class="input is-info" type="text" placeholder="description">
							</div>
						</div>
					
						<!-- status -->
						<div class="field">
							<div class="control">
								<div class="select is-info">
									<select>
										<option>status</option>
										<option class="dropdown-item" value="new">new</option>
										<option class="dropdown-item" value="started">started</option>
										<option class="dropdown-item" value="progressing">progressing</option>
										<option class="dropdown-item" value="complete">complete</option>
									</select>
								</div>
							</div>
						</div>
					
						<!-- category -->
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
					document.getElementById('new-form-div').innerHTML = trackForm
					createTrack()
				})
			)
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
	clearApiDataDiv()
	spinnerNewFormDiv('track')
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
			let form = Track.trackForm(categoryOptions)
			$('#new-form-div').html(form)
			createTrack()
		})
	)
}

function createTrack() {
	$('form#new-track-form').on('submit', function (event) {
		event.preventDefault()

		let start_date = event.target[0].value
		let name = event.target[1].value
		let description = event.target[2].value
		let status = event.target[3].value
		let category_id = event.target[4].value

		let track = {
			start_date: start_date,
			name: name,
			description: description,
			status: status,
			category_id: category_id
		}

		fetch(`${baseUrl}tracks`, {
			method: 'post',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(track)
		}).then(() => {
			clearNewFormDiv()
		});
	})
}
