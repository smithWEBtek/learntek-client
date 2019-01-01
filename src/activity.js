// console.log('activity.js loaded ---')
class Activity {
	constructor(obj) {
		this.name = obj.name
		this.description = obj.description
		this.status = obj.status
	}

	static activityForm() {
		let activityForm = (`
		<form id='new-activity-form'>
			<label class='subtitle'>New Activity</label>
		
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
		document.getElementById('new-form-div').innerHTML = activityForm
		createActivity()
	}
}

Activity.prototype.activityHTML = function () {
	return (`
		<div>
			<fieldset>
				<h3>${this.name}</h3>
				<p>${this.description}</p>
				<p>status: ${this.status}</p>
			</fieldset>	
		</div>
	`)
}

function newActivityForm() {
	clearApiDataDiv()
	spinnerNewFormDiv('activity')

	let form = Activity.activityForm()
	$('#new-form-div').html(form)
	createActivity()
}

function createActivity() {
	$('form#new-activity-form').on('submit', function (event) {
		event.preventDefault()

		let name = event.target[0].value
		let description = event.target[1].value
		let status = event.target[2].value

		let activity = {
			name: name,
			description: description,
			status: status
		}

		fetch(`${baseUrl}activities`, {
			method: 'post',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(activity)
		}).then(() => {
			clearNewFormDiv()
		});
	})
}
