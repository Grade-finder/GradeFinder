
document.getElementById("gradeForm").addEventListener("submit", function (event) {
    event.preventDefault();
    calculateGrade();
});

document.getElementById("rst").addEventListener("click", () => {
    const inputGroups = document.getElementsByClassName("input-group"); 
    while (inputGroups.length > 0) {
        inputGroups[0].parentNode.removeChild(inputGroups[0]); 
    }
    document.getElementById('result').textContent = ""; 
    console.log("All fields and results reset to default."); 
});


document.getElementById("add-button").addEventListener("click", () => {
    addField();
    console.log('Added new field');
});

document.getElementById("remove-btn").addEventListener("click", removeField);


function addField() {
    const inputFields = document.getElementById("inputFields");
    const inputGroups = inputFields.getElementsByClassName("input-group");

    if (inputGroups.length > 0) {
        const lastGroup = inputGroups[inputGroups.length - 1];
        const subject = lastGroup.querySelector("input[name='subject']").value.trim();
        const maxMarks = lastGroup.querySelector("input[name='maxMarks']").value.trim();
        const obtainedMarks = lastGroup.querySelector("input[name='obtainedMarks']").value.trim();

        if (subject === "" || maxMarks === "" || obtainedMarks === "" || Number(maxMarks) <= 0 || Number(obtainedMarks) < 0 || Number(obtainedMarks) > Number(maxMarks) || Number(obtainedMarks) > 999 || Number(maxMarks) > 999) {
            alert("Please fill out all fields in the current group with valid values before adding a new one.");
            return;
        }
    }

    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group";
    inputGroup.innerHTML = `
       <label>Subject:</label>
       <input type="text" name="subject" minlength="1" maxlength="30" required>
       <label>Max Marks:</label>
       <input type="number" name="maxMarks" class="maxMarks" min="1" max="999" required>
       <label>Obtained Marks:</label>
       <input type="number" name="obtainedMarks" class="obtainedMarks" min="0" max="999" required>
    `;
    document.getElementById("inputFields").appendChild(inputGroup);
}

function removeField() {
    const inputFields = document.getElementById("inputFields");
    const inputGroups = inputFields.getElementsByClassName("input-group");

    if (inputGroups.length > 1) {
        inputFields.removeChild(inputGroups[inputGroups.length - 1]); 
        console.log("Last field removed");
    } else {
        alert("You must have at least one field.");
    }
}


function calculateGrade() {
    let maxMarks = 0;
    let obtainedMarks = 0;
    let grade;
    let percentAge;
    let cgpa;

    const len = document.getElementsByClassName('input-group');

    for (let i = 0; i < len.length; i++) {
        const mm = Number(len[i].getElementsByClassName('maxMarks')[0].value);
        const om = Number(len[i].getElementsByClassName('obtainedMarks')[0].value);

        if (om > mm) {
            alert('Obtained Marks cannot exceed Max Marks.');
            return;
        }
        if (om < 0 || mm <= 0) {
            alert('Add valid values for marks.');
            return;
        }

        maxMarks += mm;
        obtainedMarks += om;
    }

    percentAge = (obtainedMarks / maxMarks) * 100;
    percentAge = percentAge.toFixed(2);

    if (percentAge >= 90) grade = 'A';
    else if (percentAge >= 80) grade = 'B';
    else if (percentAge >= 70) grade = 'C';
    else if (percentAge >= 60) grade = 'D';
    else if (percentAge >= 33) grade = 'E';
    else grade = 'F';

    cgpa = percentAge / 9.5;
    cgpa = cgpa.toFixed(2);

    const resultContainer = document.getElementById('result');
    alert(resultContainer.textContent = `Your Percentage: ${percentAge}% | Grade: ${grade} | CGPA: ${cgpa}`);
}


const accordionButtons = document.querySelectorAll(".faq-section h3");
accordionButtons.forEach(button => {
    button.addEventListener("click", () => {

        accordionButtons.forEach(btn => {
            if (btn !== button) {
                btn.nextElementSibling.style.display = "none";
            }
        });

        const panel = button.nextElementSibling;
        panel.style.display = panel.style.display === "block" ? "none" : "block";
    });
});

