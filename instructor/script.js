const subjectsByCurriculum = {
    curriculum1: [
        'Computer Programming 1',
        'Introduction to Computing',
        'Social and Professional Issues in Computing',
        'Literacy/Civic Welfare/Military Science 1',
        'Physical Education 1',
        'The Contemporary World',
        'Understanding the Self'
    ],
    curriculum2: [
        'Networking 3', 
        'Professional Elective 2',
        'Numerical Analysis for ITE',
        'Art Appreciation', 
        'Science, Technology, and Society', 
        'GE Elective 2',
        'Effective Communication with Personality Development'
    ],
    oldCurriculum: ['FILIPINO', 'MATH', 'SOCIAL STUDIES', 'SCIENCE', 'HEALTH']
};

function updateSubjects(selectedCurriculum) {
    const subjectsDiv = document.getElementById('subjects_display');

    // Clear previous subjects
    subjectsDiv.innerHTML = '';

    if (selectedCurriculum) {
        const subjects = subjectsByCurriculum[selectedCurriculum];
        subjects.forEach(subject => {
            const subjectElement = document.createElement('p');
            subjectElement.textContent = subject;
            subjectsDiv.appendChild(subjectElement);
        });
    }
}

function displayInputs() {
    const name = document.getElementById('name').value;
    const studentId = document.getElementById('student_id').value;
    const curriculumSelect = document.getElementById('curriculum');
    const selectedCurriculum = curriculumSelect.value; // Get the value of the selected curriculum

    const displayDiv = document.getElementById('display');
    
    // Create a table if it doesn't exist
    let table = displayDiv.querySelector('table');
    if (!table) {
        table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Student ID</th>
                    <th>Subject</th>
                    <th>Grade</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody id="studentTableBody"></tbody>
        `;
        displayDiv.appendChild(table);
    }

    const subjects = subjectsByCurriculum[selectedCurriculum]; // Get the array of subjects

    // Create a new row for the student's name and ID
    const studentRow = document.createElement('tr');
    studentRow.innerHTML = `
        <td>${name}</td>
        <td>${studentId}</td>
        <td colspan="3"></td> <!-- Empty cells for subjects, grades, and remarks -->
    `;
    document.getElementById('studentTableBody').appendChild(studentRow);

    // Create a new row for each subject
    subjects.forEach(subject => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td></td> <!-- Empty cell for name -->
            <td></td> <!-- Empty cell for student ID -->
            <td>${subject}</td>
            <td><input type="text" placeholder="Enter Grade" oninput="updateRemarks(this)" /></td>
            <td class="remarks"></td> <!-- Cell for remarks -->
        `;
        // Append the new row to the table body
        document.getElementById('studentTableBody').appendChild(row);
    });

    // Clear the form
    document.getElementById('name').value = '';
    document.getElementById('student_id').value = '';
    curriculumSelect.selectedIndex = 0; // Reset the curriculum selection

    // Create and add the Save button
    const saveButton = document.createElement('input');
    saveButton.type = 'button';
    saveButton.value = 'Save';
    saveButton.className = 'saveButton'; // Apply the saveButton class for styling
    saveButton.onclick = handleSave; // Set the onclick to the separate function

    // Clear any existing save button before adding a new one
    const existingButton = displayDiv.querySelector('.saveButton');
    if (existingButton) {
        existingButton.remove();
    }

    // Append the Save button to the display div
    displayDiv.appendChild(saveButton);
}

// Function to handle the Save button click
function handleSave() {
    alert("The data has been saved");
}

function updateRemarks(gradeInput) {
    const row = gradeInput.closest('tr'); // Find the closest row
    const grade = gradeInput.value.trim();
    const remarksCell = row.querySelector('.remarks'); // Find the remarks cell

    // Determine remarks based on the grade
    let remarks = '';
    if (grade) {
        const lowerCaseGrade = grade.toLowerCase(); // Convert grade to lowercase for consistent comparison

        if (lowerCaseGrade === 'inc') { // Check if grade is "inc"
            remarks = 'Incomplete';
        } else if (lowerCaseGrade === 'nfe') { // Check if grade is "nfe"
            remarks = 'No Final Exam';
        } else if (lowerCaseGrade === 'nc') { // Check if grade is "nc"
            remarks = 'No Credit';
        } else {
            const numericGrade = parseFloat(grade); // Convert grade to a number
            if (!isNaN(numericGrade)) { // Ensure it's a valid number
                if (numericGrade <= 3) {
                    remarks = 'Passed';
                } else {
                    remarks = 'Failed'; // You can adjust this logic as needed
                }
            }
        }
    }

    // Set the remarks cell text
    remarksCell.textContent = remarks;
}

function login() {
    // Prevent form submission
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Define valid credentials
    const validCredentials = [
        { username: "admin", password: "Css@12345" },
        { username: "00036028", password: "Css@12345" }, // User with specific redirection
        { username: "user2", password: "Password2" }  // Add another user
    ];

    // Check if the entered credentials match any valid credentials
    const isValidUser   = validCredentials.some(credential => 
        credential.username === username && credential.password === password
    );

    if (isValidUser ) {
        if (username === "00036028") {
            // Redirect to grade.html for this specific user
            window.location.href = 'grade.html';
        } else {
            // Redirect to the Add Student page for other users
            window.location.href = 'h.html'; // Change to the actual add student page
        }
    } else {
        alert("Invalid username or password. Please try again.");
    }
}

function logout() {
    window.location.href = 'login.html';

}