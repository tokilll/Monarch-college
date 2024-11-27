<?php
// Set content type to JSON for all responses
header('Content-Type: application/json');

// Start output buffering to prevent unexpected output
ob_start();

// Centralized error handling function
function json_error($message) {
    echo json_encode(['error' => $message]);
    exit();
}

// Load environment variables
$env = parse_ini_file('../.env');

// Database connection
$conn = mysqli_connect(
    $env['DB_HOST'],
    $env['DB_USER'],
    $env['DB_PASS'],
    $env['DB_NAME']
);
if (!$conn) {
    json_error('Failed to connect to the database: ' . mysqli_connect_error());
}

// Grading update function to show grades in tables
function gradingupdate($conn) {
    $postdatares = json_decode(file_get_contents('php://input'), true);
    if (!$postdatares) {
        json_error('Invalid JSON payload.');
    }
    error_log(print_r($postdatares, true)); // Log the payload for debugging

    if (!isset($postdatares['student_id'])) {
        json_error('Student ID is required.');
    }

    $student_id = $conn->real_escape_string($postdatares['student_id']);
    $query = "SELECT s.Sub_code, s.Subs, g.sub_grade, s1.Student_ID, s1.Student_Name
              FROM subjects s 
              INNER JOIN grading_db g ON s.Sub_code = g.Sub_code
              INNER JOIN students s1 ON g.Student_ID = s1.Student_ID
              WHERE s1.Student_ID = '$student_id'";

    $result = $conn->query($query);
    if (!$result) {
        json_error('Query failed: ' . $conn->error);
    }

    $subjects = [];
    $student_name = '';
    while ($row = $result->fetch_assoc()) {
        if (empty($student_name)) {
            $student_name = $row['Student_Name'];
        }
        $subjects[] = [
            'sub_code' => $row['Sub_code'],
            'sub_desc' => $row['Subs'],
            'sub_grade' => $row['sub_grade']
        ];
    }

    if (empty($student_name)) {
        $student_result = $conn->query("SELECT * FROM students WHERE Student_ID = '$student_id'");
        if ($student_result) {
            $student_row = $student_result->fetch_assoc();
            if ($student_row) {
                $student_name = $student_row['Student_Name'];
            } else {
                json_error('No student found with the provided ID.');
            }
        } else {
            json_error('Error executing query: ' . $conn->error);
        }
    }

    echo json_encode([
        'student_name' => $student_name,
        'student_id' => $student_id,
        'subjects' => $subjects
    ]);
    exit();
}


// Grading show function to display grades with remarks
function gradingshow($conn) {
    $query = "SELECT s.Sub_code, s.Subs, s.units, g.sub_grade 
              FROM subjects s 
              INNER JOIN grading_db g ON s.Sub_code = g.Sub_code";
    $result = $conn->query($query);

    if (!$result) {
        json_error('Query failed: ' . $conn->error);
    }

    $subjects = [];
    while ($row = $result->fetch_assoc()) {
        $Grades = $row['sub_grade'];
        $Grades = strtoupper($Grades);
        $Remarks = '';  

        // Determine remarks based on grade
        switch (true) {
            case $Grades === 'NFE':
                $Remarks = 'No Final Exam';
                break;
            case $Grades === 'NC':
                $Remarks = 'No Credits';
                break;
            case $Grades === 'INC':
                $Remarks = 'Incomplete';
                break;
            case $Grades >= 4:
                $Remarks = 'Failed';
                break;
            case $Grades <= 3:
                $Remarks = 'Passed';
                break;
        }

        $subjects[] = [
            'sub_code' => $row['Sub_code'],
            'sub_desc' => $row['Subs'],
            'sub_units' => $row['units'],
            'sub_grade' => $Grades,
            'remarks' => $Remarks
        ];
    }

    echo json_encode($subjects);
    exit();
}

// Grading update function to handle the grade update in the database
function updateGrade($conn) {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        json_error('Invalid request method.');
    }

    $postdatares = json_decode(file_get_contents('php://input'), true);
    if (!$postdatares) {
        json_error('Invalid JSON payload.');
    }

    error_log(print_r($postdatares, true)); // Log the payload for debugging

    if (empty($postdatares['student_id'])) {
        json_error('Student ID is required.');
    }

    $student_id = $conn->real_escape_string($postdatares['student_id']);
    $grades = $postdatares['grades'];

    $query = "UPDATE grading_db SET sub_grade = ? WHERE Sub_code = ? AND Student_ID = ?";
    $stmt = $conn->prepare($query);

    if ($stmt === false) {
        json_error('Prepare failed: ' . $conn->error);
    }

    foreach ($grades as $grade) {
        $sub_code = $conn->real_escape_string($grade['sub_code']);
        $sub_grade = $conn->real_escape_string($grade['sub_grade']);

        $stmt->bind_param('ssi', $sub_grade, $sub_code, $student_id);
        if (!$stmt->execute()) {
            json_error('Failed to update grade: ' . $stmt->error);
        }
    }

    $stmt->close();
    echo json_encode(['success' => true, 'message' => 'Grades updated successfully.']);
    exit();
}


// Determine action based on URI
$action = $_GET['action'] ?? $_POST['action'];

switch ($action) {
    case 'test':
        echo json_encode('You called the test action.');
        break;
    case 'gradingupdate':
        gradingupdate($conn);
        break;
    case 'gradingshow':
        gradingshow($conn);
        break;
    case 'updateGrade':
        updateGrade($conn);
        break;
    default:
        json_error('No valid action provided.');
        break;
}

// Close the database connection at the end
$conn->close();
ob_end_clean();
?>

