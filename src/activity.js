class Activity {
	constructor(obj) {
		this.name = obj.name
		this.description = obj.description
		this.status = obj.status
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

	let activityForm = (`
		<fieldset>
			<strong>New Activity</strong>
			<form id='new-activity-form'>
				<input id='name' placeholder='activity name' /><br>
				<input id='description' placeholder='description'/><br>

				<select id='statusSelect' placeholder='status'>
					<option>choose status</option>
					<option value='new'>new</option>
					<option value='started'>started</option>
					<option value='progressing'>progressing</option>
					<option value='complete'>complete</option>
				</select><br>

				<button type='submit'>Submit Activity</button>
			</form>
		</fieldset>
		`)
	document.getElementById('new-form-div').innerHTML = activityForm
	createActivity()
}

function createActivity() {
	let form = document.querySelector('form#new-activity-form')
	form.addEventListener('submit', function (event) {
		event.preventDefault()
		let name = event.target[0].value
		let description = event.target[1].value
		let status = event.target[2].value

		let activity = {
			name: name,
			description: description,
			status: status
		}

		let myRequest = new Request(baseUrl + 'activities')
		// let myInit = {
		// 	method: 'POST',
		// 	body: JSON.stringify(activity),
		// 	headers: {
		// 		'Accept': 'application/json, text/plain, */*',
		// 		'Content-Type': 'application/json'
		// 	},
		// 	mode: 'cors',
		// 	cache: 'default'
		// }
		// console.log("myInit: ", myInit);

		console.log("myRequest: ", myRequest);

		// fetch(myRequest, myInit)
		// works the same 

		fetch(myRequest, {
			method: 'POST',
			body: JSON.stringify(activity),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			mode: 'cors',
			cache: 'default'
		}).then(res => res.json()
			.then(data => {
				console.log("data: ", data);
				document.getElementById('new-form-div').innerHTML = data;
			})
		)
	})
}


// fetch('http://localhost:3000/api/activities', {
// 			method: 'post',
// 			headers: {
// 				'Accept': 'application/json, text/plain, */*',
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify(activity)
// 		})