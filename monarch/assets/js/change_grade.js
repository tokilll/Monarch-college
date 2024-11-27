// Helper function to create buttons
function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
}

// Main function to display the input form and table
function displayInputs() {
    const student = {
        student_id: document.getElementById('student_id').value.trim(),
        student_name: document.getElementById('student_name').value.trim(),
    };

    if (!student.student_id) {
        alert('Student ID is required');
        return;
    }

    // Create Container Elements
    const addGradeContainer = document.createElement('div');
    addGradeContainer.className = 'addGradeContainer';

    const addGradeDialog = document.createElement('div');
    addGradeDialog.className = 'addGradeBtnDialog';

    const studentInfo = document.createElement('div');
    studentInfo.className = 'studentInfo';
    studentInfo.innerHTML = `
        <p><strong>Student Name:</strong> ${student.student_name}</p>
        <p><strong>Student ID:</strong> ${student.student_id}</p>
    `;

    const addGradeTable = document.createElement('table');
    addGradeTable.className = 'addGradeTable';

    // Add Table Headers
    const headers = ['Subject', 'Grade'];
    const headerRow = document.createElement('tr');
    headers.forEach((header) => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    addGradeTable.appendChild(headerRow);

    // Fetch Student Data and Populate Table
    fetch('../api/api.php?action=gradingupdate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
    })
        .then((response) => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then((data) => populateTableWithData(data, addGradeTable))
        .catch((error) => {
            console.error('Error fetching data:', error);
            alert('Failed to fetch student data. Please try again later.');
        });

    // Add Buttons
    const updateBtn = createButton('Update', () => updateStudentData(student));
    const cancelBtn = createButton('Cancel', () => {
        document.body.removeChild(addGradeContainer);
    });

    // Append All Elements
    addGradeContainer.append(addGradeDialog, studentInfo, addGradeTable, updateBtn, cancelBtn);
    document.body.appendChild(addGradeContainer);
}

// Function to populate table rows with data
function populateTableWithData(data, table) {
    const { subjects } = data;

    // Populate subjects in the table
    subjects.forEach((subject) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${subject.sub_desc}</td>
            <td>
                <input type="text" value="${subject.sub_grade}" data-sub-code="${subject.sub_code}" />
            </td>
        `;
        table.appendChild(row);
    });
}

// Function to collect grades from the table and update the database
async function updateStudentData(student) {
    if (!student.student_id) {
        alert('Student ID is required');
        return;
    }

    try {
        const grades = collectGrades();
        const response = await fetch('../api/api.php?action=updateGrade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ student_id: student.student_id, grades }),
        });

        const data = await response.json();
        if (data.success) {
            alert('Grades successfully updated in the database.');
        } else {
            alert('Failed to update grades. Please try again.');
        }
    } catch (error) {
        console.error('Failed to update student data:', error);
        alert('Error updating grades. Please check your connection.');
    }
}

// Helper function to collect grades from input fields
function collectGrades() {
    const inputs = document.querySelectorAll('input[data-sub-code]');
    const grades = [];
    inputs.forEach((input) => {
        grades.push({
            sub_code: input.dataset.subCode,
            sub_grade: input.value.trim(),
        });
    });
    return grades;
}


  
  


























// let subjectsListP = '';
// let subjectsListInputValue = '';

// fetch('../api/api.php?gradingupdate', {
// 	method: 'GET',
// 	headers: {
// 		'Content-Type': 'application/json',
// 	},
// })
// 	.then((response) => {
// 		if (!response.ok) {
// 			throw new Error('Response wasn’t ok' + response.statusText);
// 		}
// 		return response.json();
// 	})
// 	.then((data) => {
// 		data.forEach((element) => {
// 			subjectsListP += `<p id="subjectInput_${studentId}_1">${element['sub_code']}, ${element['sub_desc']}</p>\n`;
// 			subjectsListInputValue += `<input type="text" placeholder="${element['sub_grade']}" name="${element['sub_code']}">\n`;
// 		});
// 	})
// 	.catch((error) => {
// 		console.error(error);
// 	});

// const displayDiv = document.getElementById('display');
// const studentDiv = document.createElement('div');
// studentDiv.innerHTML = `
//     <table>
//         <thead>
//             <tr>
//                 <th>Name</th>
//                 <th>Student ID</th>
//                 <th>Subjects</th>
//                 <th>Grades</th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//                 <td>${name}</td>
//                 <td>${studentId}</td>
//                 <td>
//                     <div id="subjects_${studentId}">
//                         ${subjectsListP}
//                     </div>
//                 </td>
//                 <td>
//                     <div id="grades_${studentId}">
//                         <input type="text" placeholder="Grade">
//                         <input type="text" placeholder="Grade">
//                         <input type="text" placeholder="Grade">
//                         <input type="text" placeholder="Grade">
//                         <input type="text" placeholder="Grade">
//                         <input type="text" placeholder="Grade">
//                         <input type="text" placeholder="Grade">
//                         <input type="text" placeholder="Grade">
//                     </div>
//                 </td>
//             </tr>
//         </tbody>
//     </table>
//     <button id="addGradeButton_${studentId}">Add Grade</button>
//     <button id="saveButton_${studentId}">Save</button>
// `;

// displayDiv.appendChild(studentDiv);

// const addGradeButton = document.getElementById(
// 	`addGradeButton_${studentId}`,
// );
// addGradeButton.addEventListener('click', () => {
// 	const subjectsDiv = document.getElementById(`subjects_${studentId}`);
// 	const gradesDiv = document.getElementById(`grades_${studentId}`);

// 	// Add a new subject input and corresponding grade input
// 	const newSubjectInput = document.createElement('input');
// 	newSubjectInput.type = 'text';
// 	newSubjectInput.placeholder = 'Add Subject';
// 	subjectsDiv.appendChild(newSubjectInput);

// 	const newGradeInput = document.createElement('input');
// 	newGradeInput.type = 'text';
// 	newGradeInput.placeholder = 'Grade for new subject';
// 	gradesDiv.appendChild(newGradeInput);

// 	newSubjectInput.addEventListener('keydown', (event) => {
// 		if (event.key === 'Enter') {
// 			const subject = newSubjectInput.value;
// 			newSubjectInput.value = '';
// 			subjectsDiv.innerHTML += `<p>${subject}</p>`;
// 			const gradeInput = document.createElement('input');
// 			gradeInput.type = 'text';
// 			gradeInput.placeholder = `Grade for ${subject}`;
// 			gradesDiv.appendChild(gradeInput);
// 		}
// 	});
// });

// const saveButton = document.getElementById(`saveButton_${studentId}`);
// saveButton.addEventListener('click', () => {
// 	const subjects = document.querySelectorAll(`#subjects_${studentId} p`);
// 	const grades = document.querySelectorAll(`#grades_${studentId} input`);

// 	const studentData = {
// 		name,
// 		studentId,
// 		subjects: Array.from(subjects).map(
// 			(subject) => subject.textContent,
// 		),
// 		grades: Array.from(grades).map((grade) => grade.value),
// 	};

// 	// Store the student data or send it to the server
// 	studentsData.push(studentData);
// 	console.log(studentsData); // Log the data to the console for demonstration

// 	// Clear the form and reset the student's data
// 	document.getElementById('name').value = '';
// 	document.getElementById('student_id').value = '';
// 	studentDiv.innerHTML = ''; // Clear the student's information
// });