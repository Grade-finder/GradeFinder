
document.getElementById("gradeForm").addEventListener("submit", function (event) {
    event.preventDefault();
    calculateGrade();
    saveToLocalStorage();
});

// reset button
document.getElementById("rst").addEventListener("click", () => {
    const inputGroups = document.getElementsByClassName("input-group");
    while (inputGroups.length > 0) {
        inputGroups[0].parentNode.removeChild(inputGroups[0]);
    }
    document.getElementById('result').textContent = "";
    localStorage.removeItem("gradeFormData");
    console.log("All fields and results reset to default.");
});

// adding a field
document.getElementById("add-button").addEventListener("click", () => {
    addField();
    saveToLocalStorage();
    console.log('Added new field');
});

//removing a field
document.getElementById("remove-btn").addEventListener("click", () => {
    removeField();
    saveToLocalStorage();
});

// Save form data to local storage
function saveToLocalStorage() {
    const inputGroups = document.getElementsByClassName("input-group");
    const data = [];
    for (let group of inputGroups) {
        const subject = group.querySelector("input[name='subject']").value;
        const maxMarks = group.querySelector("input[name='maxMarks']").value;
        const obtainedMarks = group.querySelector("input[name='obtainedMarks']").value;

        data.push({ subject, maxMarks, obtainedMarks });
    }
    localStorage.setItem("gradeFormData", JSON.stringify(data));
    console.log("Data saved to local storage");
}

// Load form data from local storage
window.addEventListener("load", () => {
    const savedData = JSON.parse(localStorage.getItem("gradeFormData"));
    if (savedData && Array.isArray(savedData)) {
        const validData = savedData.filter(data =>
            data.subject && data.maxMarks && data.obtainedMarks
        );

        for (const { subject, maxMarks, obtainedMarks } of validData) {
            addField({ subject, maxMarks, obtainedMarks });
        }

        if (validData.length === 0) {
            console.log("No valid data found. No fields added.");
        } else {
            console.log("Data loaded from local storage");
        }
    } else {
        addField(); 
        console.log("No saved data found. Added one default field.");
    }
});


//addField
function addField(preFilledData = null) {
    
    if (preFilledData && (!preFilledData.subject || !preFilledData.maxMarks || !preFilledData.obtainedMarks)) {
        return;
    }

    const maxMarks=document.getElementsByClassName('maxMarks');
    const obtainedMarks=document.getElementsByClassName('obtainedMarks');

    const inputFields = document.getElementById("inputFields");
    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group";
    inputGroup.innerHTML = `
        <label>Subject:</label>
        <input type="text" name="subject" minlength="1" maxlength="30" required value="${preFilledData?.subject || ""}">
        <label>Max Marks:</label>
        <input type="number" name="maxMarks" class="maxMarks" min="1" max="999" required value="${preFilledData?.maxMarks || ""}">
        <label>Obtained Marks:</label>
        <input type="number" name="obtainedMarks" class="obtainedMarks" min="0" max="999" required value="${preFilledData?.obtainedMarks || ""}">
    `;
    inputFields.appendChild(inputGroup);
}


// removeField 
function removeField() {
    const inputFields = document.getElementById("inputFields");
    const inputGroups = inputFields.getElementsByClassName("input-group");
    if (inputGroups.length > 1) {
        inputFields.removeChild(inputGroups[inputGroups.length - 1]);
        saveToLocalStorage();
        console.log("Last field removed");
    } else {
        alert("You must have at least one field.");
    }
}

// calculateGrade function
function calculateGrade() {
    let maxMarks = 0;
    let obtainedMarks = 0;
    let grade;
    let percentAge;
    let cgpa;
    let maxMarksData=[];
    let obtainedMarksData=[];
    let subject=[];

    const len = document.getElementsByClassName('input-group');

    for (let i = 0; i < len.length; i++) {
        const subjects = len[i].querySelector("input[name='subject']").value || `Subject ${i + 1}`;
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

        subject.push(subjects);
        maxMarksData.push(mm);
        obtainedMarksData.push(om);
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
    generateChart(subject, maxMarksData, obtainedMarksData);
}

function generateChart(subjects, maxMarksData, obtainedMarksData) {
    const ctx = document.getElementById('marksChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: subjects,
            datasets: [
                {
                    label: 'Max Marks',
                    data: maxMarksData,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Obtained Marks',
                    data: obtainedMarksData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
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
