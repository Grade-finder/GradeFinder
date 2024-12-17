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

//java script for faq accordion
        // Get all elements with the class 'questions'
        const accordionButtons = document.querySelectorAll(".questions");

        // Add a click event listener to each button
        accordionButtons.forEach(button => {
            button.addEventListener("click", () => {
                // Toggle the next sibling element (the .panel div)
                const panel = button.nextElementSibling;

                if (panel.style.display === "block") {
                    panel.style.display = "none"; // Hide the panel
                } else {
                    panel.style.display = "block"; // Show the panel
                }
            });
        });