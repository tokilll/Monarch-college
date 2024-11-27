document.addEventListener('DOMContentLoaded', function () {
	fetch('../api/api.php?action=gradingshow') // Fetch existing grading data
		.then((response) => response.json())
		.then((data) => {
			const table_subject_container = document.getElementById(
				'subjects-container',
			)
				? document.getElementById('subjects-container')
				: (() => {
						subjectContainer = Object.assign(
							document.createElement('div'),
							{ id: 'subjects-container' },
						);
						document.body.appendChild(subjectContainer);
						return subjectContainer;
					})();
			const table = document.createElement('table');
			const headerRow = document.createElement('tr');

			const headers = [
				'Subject Code',
				'Description',
				'Units',
				'Grades',
				'Remarks',
			];
			//assign each headers to headerrow
			headers.forEach((headerText) => {
				headerRow.appendChild(
					Object.assign(document.createElement('th'), {
						textContent: `${headerText}`,
					}),
				);
			});
			table.appendChild(headerRow);

			// Populate the table with data
			data.forEach((subject) => {
				const row = document.createElement('tr');
				const subrows = [
					['Subject Code', 'sub_code'],
					['Description', 'sub_desc'],
					['Units', 'sub_units'],
					['Grades', 'sub_grade'],
					['Remarks', 'remarks'],
				];
				subrows.forEach((arrsubrow) => {
					const cell = document.createElement('td');
					cell.textContent = subject[arrsubrow[1]] ?? 'N/A';
					row.appendChild(cell);
				});
				table.appendChild(row);
			});

			table_subject_container.appendChild(table);
			//updated grade with alert please don't touch, this is popup alert, use this on different site don't touch it..

			// // Add "Update Grade" button functionality
			// const addGradeButton = document.createElement('button');
			// addGradeButton.textContent = 'Update Grade';
			// addGradeButton.addEventListener('click', function () {
			// 	const subjectCode = prompt('Enter the Subject Code:');
			// 	const subject = data.find(
			// 		(sub) => sub.sub_code === subjectCode,
			// 	);

			// 	if (subject) {
			// 		const grade = prompt('Enter the Grade:');
			// 		const remarks = getGradeRemarks(grade); // Determine the remarks (Pass/Fail/Inc/NFE)

			// 		// Update the grade and remarks on the table
			// 		const rows = table.querySelectorAll('tr');
			// 		rows.forEach((row) => {
			// 			const cells = row.querySelectorAll('td');
			// 			if (
			// 				cells.length > 0 &&
			// 				cells[0].textContent === subjectCode
			// 			) {
			// 				cells[3].textContent = grade; // Update grade cell
			// 				cells[4].textContent = remarks; // Update remarks cell
			// 			}
			// 		});

			// 		// Send the updated grade to the server for saving to the database
			// 		updateGrade(subjectCode, grade, remarks);
			// 	} else {
			// 		alert('Subject code not found!');
			// 	}
			// });

			// table_subject_container.appendChild(addGradeButton);

		})
		.catch((error) => {
			console.error(
				'There was a problem with the fetch operation:',
				error,
			);
		});
});

function generateUpdateGradeButton() {
	//add update grade button via html
	const update_button_div = Object.assign(document.createElement('div'), {
		className: 'updateGradeBtn',
		id: 'updateGradeBtn',
	});
	const update_button_div_dialog = Object.assign(
		document.createElement('div'),
		{
			className: 'updateGradeBtnDialog',
			id: 'updateGradeBtnDialog',
		},
	);

	//submit button
	const updateGrdBtn = Object.assign(document.createElement('button'), {
		type: 'Submit',
		textContent: 'Update',
	});
	updateGrdBtn.addEventListener('click', function () {
		const grades = {};
		fetch('../api/api.php?action=gradingupdate', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				data.forEach((subject) => {
					try {
						const grade = subject['sub_code'];
						const allowedValues = ['INC', 'NFE', 'NC'];
						const gradeValue = document.getElementById(grade).value
							? document.getElementById(grade).value
							: document.getElementById(grade).placeholder;
						const parseGradeValue = parseFloat(gradeValue);
						if (parseGradeValue >= 0 && parseGradeValue <= 5) {
							grades[grade] = parseGradeValue.toString();
						} else if (
							allowedValues.includes(gradeValue.toUpperCase())
						) {
							grades[grade] = gradeValue.toUpperCase();
						} else {
							throw Error(
								`The grade value on ${grade} is not valid`,
							);
						}
					} catch (error) {
						allowedValues = '1-5, inc, ne';
						alert(
							`failed to update data : ${error.value}, it needs to be ${allowedValues}`,
						);
					}
				});
				const gradesJson = JSON.stringify(grades);
				console.log(gradesJson);
				updateGrade(gradesJson);
				window.location.reload();
			});
	});

	//cancel update button
	// const cancelUpdateGrdBtn = document.createElement('button');
	// cancelUpdateGrdBtn.id = 'cancelUpdateGrade';
	// cancelUpdateGrdBtn.textContent = 'Cancel';
	// cancelUpdateGrdBtn.addEventListener('click', function () {
	// 	const updateGradeBtnDiv = document.getElementById('updateGradeBtn');
	// 	updateGradeBtnDiv.style.display = 'none';
	// });

	// //update grade title
	// const updateGradeTitle = Object.assign(document.createElement('h2'), {
	// 	textContent: 'UPDATE GRADES',
	// 	className: 'updateGradesTitle',
	// });

	//make update grade table
	fetch('../api/api.php?action=gradingupdate')
		.then((response) => response.json())
		.then((data) => {
			const tableUpdateGrade = Object.assign(
				document.createElement('table'),
				{ className: 'gradingupdatetable' },
			);
			const tableUpdateHeaderRows = document.createElement('tr');

			//creating headers
			const tableUpdateGradeHeaders = [
				'Subject Code',
				'Subject Description',
				'Subject Grade',
			];
			tableUpdateGradeHeaders.forEach((header) => {
				const tableHeaders = Object.assign(
					document.createElement('th'),
					{ textContent: `${header}` },
				);
				tableUpdateHeaderRows.appendChild(tableHeaders);
			});

			//creating object each subject
			data.forEach((subject) => {
				const tableUpdateGradeRows = document.createElement('tr');
				const tableUpdateGradeRowsList = [
					'sub_code',
					'sub_desc',
					'sub_grade',
				];
				tableUpdateGradeRowsList.forEach((row) => {
					const tableRow = document.createElement('td');
					if (row == 'sub_grade') {
						inputLabelGrade = document.createElement('input');
						inputLabelGrade.id = subject['sub_code'];
						inputLabelGrade.type = 'text';
						inputLabelGrade.placeholder = subject[row];
						tableRow.appendChild(inputLabelGrade);
					} else tableRow.textContent = subject[row];
					tableUpdateGradeRows.appendChild(tableRow);
				});
				tableUpdateGrade.appendChild(tableUpdateGradeRows);
			});
			update_button_div_dialog.append(

				tableUpdateGrade,

			);
			update_button_div.appendChild(update_button_div_dialog);
		});
	// const updateGradeBtnDiv = document.getElementById('updateGradeBtn');
	// if (!updateGradeBtnDiv) {
	// 	document.body.appendChild(update_button_div);
	// } else {
	// 	updateGradeBtnDiv.style.display = 'block';
	// }
}
// Function to send the updated grade to the backend (PHP)
function updateGrade(Grade) {
	console.log(Grade);
	fetch('../api/api.php?action=updateGrade', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: Grade,
	})
		// .then((response) => {
		// 	try{
		// 		const response = response.json()
		// 		return response
		// 	}catch(error){
		// 		throw Error('cant parse as json' + error)
		// 	}}) // Parse the response as JSON
		// .then((data) => {
		// 	// Check if the response contains a success message
		// 	if (!data.success) {
		// 	// 	alert('Grade updated successfully!');
		// 	// } else {
		// 	// 	// If an error message is returned from the server
		// 		// alert('Failed to update grade: ' + data.error); // Display detailed error message
		// 		throw Error(`${data.error}`)
		// 	}
		// })
		.catch((error) => {
			// Log any errors and alert the user
			console.error('Error updating grade:', error);
			// alert(`Backend error : ${error}`);
		});
}

// Function to determine grade remarks
function getGradeRemarks(grade) {
	if (!grade) return 'N/A';

	grade = grade.toUpperCase().trim(); // Normalize input for comparison

	switch (true) {
		case grade === 'NFE':
			return 'No Final Exam (NFE)';
		case grade === 'NC':
			return 'No Credits (NC)';
		case grade === 'INC':
			return 'Incomplete (INC)';
		case parseFloat(grade) >= 4: // Fail
			return 'Failed';
		case parseFloat(grade) <= 3: // Passed
			return 'Passed';
		default:
			return 'Invalid Grade'; // If the grade doesn't match any case
	}
}