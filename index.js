document.getElementById("gradeForm").addEventListener("submit", function (event) {
    event.preventDefault();
    calculateGrade();
});

function addField() {
    const inputFields = document.getElementById("inputFields");
    const inputGroups = inputFields.getElementsByClassName("input-group");

    if (inputGroups.length > 0) {
        const lastGroup = inputGroups[inputGroups.length - 1];
        const subject = lastGroup.querySelector("input[name='subject']").value.trim();
        const maxMarks = lastGroup.querySelector("input[name='maxMarks']").value.trim();
        const obtainedMarks = lastGroup.querySelector("input[name='obtainedMarks']").value.trim();

        if (subject === "" || maxMarks === "" || obtainedMarks === "" || maxMarks<=0 || obtainedMarks<0) {
            alert("Please fill out all fields in the current group before adding a new one.");
            return;
        }
    }

    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group";
    inputGroup.innerHTML = `
       <label>Subject:</label>
                    <input type="text" id="subject" name="subject" required>
                    <label>Max Marks:</label>
                    <input id='mm' type="number" name="maxMarks" class="maxMarks" required>
                    <label>Obtained Marks:</label>
                    <input id='om' type="number" name="obtainedMarks" class="obtainedMarks" required>
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
        document.getElementById('result').textContent=`Your percentage is ${percentAge}`
    }
    else{
        document.getElementById('result').textContent=`Your CGPA is ${cgpa}`
    }
    
}
