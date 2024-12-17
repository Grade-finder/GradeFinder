document.getElementById("gradeForm").addEventListener("submit", function (event) {
    event.preventDefault();
    calculateGrade();
});

function addField() {
    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group";
    inputGroup.innerHTML = `
        <label>Subject:</label>
        <input type="text" name="subject" required>
        <label>Max Marks:</label>
        <input type="number" name="maxMarks" class="maxMarks" required>
        <label>Obtained Marks:</label>
        <input type="number" name="obtainedMarks" class="obtainedMarks" required>
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
}


