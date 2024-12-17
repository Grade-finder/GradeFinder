document.getElementById("gradeForm").addEventListener("submit", function (event) {
    event.preventDefault();
    calculateGrade();
});

document.getElementById("rst").addEventListener("click",()=>{
    const inputGroups = document.getElementsByClassName("input-group"); 
    while (inputGroups.length > 0) {
        inputGroups[0].parentNode.removeChild(inputGroups[0]); 
    }
    document.getElementById('result').textContent = ""; 
    console.log("All fields and results reset to default."); 
});

function addField() {
    const inputFields = document.getElementById("inputFields");
    const inputGroups = inputFields.getElementsByClassName("input-group");

    if (inputGroups.length > 0) {
        const lastGroup = inputGroups[inputGroups.length - 1];
        const subject = lastGroup.querySelector("input[name='subject']").value.trim();
        const maxMarks = lastGroup.querySelector("input[name='maxMarks']").value.trim();
        const obtainedMarks = lastGroup.querySelector("input[name='obtainedMarks']").value.trim();

        if (subject === "" || maxMarks === "" || obtainedMarks === "" || Number(maxMarks)<=0 || Number(obtainedMarks)<0 || Number(obtainedMarks)>Number(maxMarks) || Number(obtainedMarks)>999 ||Number(maxMarks)>999) {
            alert("Please fill out all fields in the current group before adding a new one.");
            return;
        }
    }

    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group";
    inputGroup.innerHTML = `
       <label>Subject:</label>
                    <input type="text" id="subject" name="subject" minlength="1" maxlength="30" required>
                    <label>Max Marks:</label>
                    <input id='mm' type="number" name="maxMarks" class="maxMarks" min="1" max="999" required>
                    <label>Obtained Marks:</label>
                    <input id='om' type="number" name="obtainedMarks" class="obtainedMarks" min="0" max="999" required>
                    <button type="button" class="remove-btn" onclick="removeField(this)">Remove</button>
    `;
    document.getElementById("inputFields").appendChild(inputGroup);
    console.log("New field added");
}

button.addEventListener('click',()=>{
    addField();
    console.log('added new field');
    
})

function removeField(button) {
    button.parentElement.remove();
    console.log("Field removed");
}

function calculateGrade() {
    var maxMarks=0;
    var obtainedMarks=0;
    var grade;
    var percentAge;
    var cgpa;

    const len=document.getElementsByClassName('input-group');
    console.log(len);

    for (let i = 0; i < len.length; i++) {
        const mm = Number(len[i].getElementsByClassName('maxMarks')[0].value);
        const om = Number(len[i].getElementsByClassName('obtainedMarks')[0].value);
        console.log(`om: ${om}, mm: ${mm}`)
        if(om>mm){
            alert('Add valid Max Marks value')
            return;
        }
        if(om<0 || mm<=0){
            alert('Add valid values of marks')
            return;
        }

        maxMarks += mm;
        obtainedMarks += om;
        console.log(`ObtSum: ${obtainedMarks}, MaxSum: ${maxMarks}`)
    }
    
    percentAge=(obtainedMarks/maxMarks) * 100;
    percentAge=percentAge.toFixed(2);
    console.log(percentAge)

    if (percentAge>=90)grade='A'
    else if(percentAge>=80)grade='B';
    else if(percentAge>=70)grade='C';
    else if(percentAge>=60)grade='D';
    else if(percentAge>=33)grade='E';
    else grade='F';
    console.log(grade);

    cgpa=percentAge/9.5
    cgpa=cgpa.toFixed(2);
    console.log(cgpa)
    
    var val=document.getElementById('gradeMechanism').value;
    console.log(val)

    if(val==='percentage'){
        alert(document.getElementById('result').textContent=`Your percentage is ${percentAge}`)
    }
    else{
        alert(document.getElementById('result').textContent=`Your CGPA is ${cgpa}`)
    }
    
}




// Adding event listener to the new form
document.getElementById("desiredGradeForm").addEventListener("submit", function (event) {
    event.preventDefault();
    calculateRequiredMarks();
});

function calculateRequiredMarks() {
    // Getting the target grade (percentage or CGPA)
    const targetGrade = parseFloat(document.getElementById("targetGrade").value);
    const desiredGradeType = document.getElementById("desiredGrade").value;
    const subjectCount = parseInt(document.getElementById("subjectCount").value);

    // Validating the inputs
    if (isNaN(targetGrade) || targetGrade < 0 || (desiredGradeType === 'percentage' && targetGrade > 100) || subjectCount < 1) {
        alert("Please enter valid inputs.");
        return;
    }

    // Calculating the total max marks across all subjects (assuming max marks per subject is 100)
    let totalMaxMarks = 0;
    let subjectMarks = [];
    for (let i = 0; i < subjectCount; i++) {
        totalMaxMarks += 100;  // Assuming each subject is out of 100 marks
        subjectMarks.push(100); // Store the maximum marks for each subject
    }

    // Calculating the required total marks based on the desired grade type
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

