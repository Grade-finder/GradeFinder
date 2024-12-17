// Add event listener to the new form
document.getElementById("desiredGradeForm").addEventListener("submit", function (event) {
    event.preventDefault();
    calculateRequiredMarks();
});

function calculateRequiredMarks() {
    // Get the target grade (percentage or CGPA)
    const targetGrade = parseFloat(document.getElementById("targetGrade").value);
    const desiredGradeType = document.getElementById("desiredGrade").value;
    const subjectCount = parseInt(document.getElementById("subjectCount").value);

    // Validate the inputs
    if (isNaN(targetGrade) || targetGrade < 0 || (desiredGradeType === 'percentage' && targetGrade > 100) || subjectCount < 1) {
        alert("Please enter valid inputs.");
        return;
    }

    // Calculate the total max marks across all subjects (assuming max marks per subject is 100)
    let totalMaxMarks = 0;
    let subjectMarks = [];
    for (let i = 0; i < subjectCount; i++) {
        totalMaxMarks += 100;  // Assuming each subject is out of 100 marks
        subjectMarks.push(100); // Store the maximum marks for each subject
    }

    // Calculate the required total marks based on the desired grade type
    let requiredTotalMarks;
    if (desiredGradeType === 'percentage') {
        requiredTotalMarks = (targetGrade / 100) * totalMaxMarks;
    } else if (desiredGradeType === 'cgpa') {
        requiredTotalMarks = (targetGrade * 9.5);  // Assuming CGPA is out of 10
        if (requiredTotalMarks > totalMaxMarks) {
            alert("CGPA exceeds the total available marks.");
            return;
        }
    }

    // Calculate the required marks per subject (assuming equal distribution for simplicity)
    let requiredMarksPerSubject = (requiredTotalMarks / subjectCount).toFixed(2);

    // Display the result
    let resultHtml = `<p>To achieve a ${targetGrade} ${desiredGradeType.toUpperCase()}, you need:</p>`;
    resultHtml += `<p><strong>${requiredMarksPerSubject}</strong> marks in each subject (if marks are equally distributed).</p>`;

    document.getElementById("marksRequired").innerHTML = resultHtml;
}
