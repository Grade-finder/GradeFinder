  
document.getElementById("desiredGradeForm").addEventListener("submit", function (event) {
    event.preventDefault();
    calculateRequiredMarks();
});

function calculateRequiredMarks() {

    const targetGrade = parseFloat(document.getElementById("targetGrade").value);
    const desiredGradeType = document.getElementById("desiredGrade").value;
    const subjectCount = parseInt(document.getElementById("subjectCount").value);

  
    if (isNaN(targetGrade) || targetGrade < 0 || (desiredGradeType === 'percentage' && targetGrade > 100) || subjectCount < 1) {
        alert("Please enter valid inputs.");
        return;
    }

    
    let totalMaxMarks = 0;
    let subjectMarks = [];
    for (let i = 0; i < subjectCount; i++) {
        totalMaxMarks += 100; 
        subjectMarks.push(100); 
    }

    
    let requiredTotalMarks;
    if (desiredGradeType === 'percentage') {
        requiredTotalMarks = (targetGrade / 100) * totalMaxMarks;
    } else if (desiredGradeType === 'cgpa') {
        requiredTotalMarks = (targetGrade * 9.5);  
        if (requiredTotalMarks > totalMaxMarks) {
            alert("CGPA exceeds the total available marks.");
            return;
        }
    }

  
    let requiredMarksPerSubject = (requiredTotalMarks / subjectCount).toFixed(2);

  
    let resultHtml = `<p>To achieve a ${targetGrade} ${desiredGradeType.toUpperCase()}, you need:</p>`;
    resultHtml += `<p><strong>${requiredMarksPerSubject}</strong> marks in each subject (if marks are equally distributed).</p>`;

    document.getElementById("marksRequired").innerHTML = resultHtml;
}
