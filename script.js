function calculateRank() {
  const subject = document.getElementById('subject').value.trim();
  const internal = parseFloat(document.getElementById('internal').value);
  const gradeSelect = document.getElementById('gradeSelect');
  const target = parseFloat(gradeSelect.value); // from dropdown

  if (!subject || isNaN(internal)) {
    alert("Please enter the subject and your internal marks!");
    return;
  }

  const totalInternal = 50;
  const totalExternal = 100;
  const totalMarks = totalInternal + totalExternal;

  // Calculate required external marks for selected target grade
  const requiredExternalMarks =
    ((target / 100) * totalMarks - internal) / (totalExternal / 100);
  const requiredExternal = requiredExternalMarks.toFixed(1);

  const resultBox = document.getElementById('result-box');
  const subjectName = document.getElementById('subject-name');
  const result = document.getElementById('result');
  const progressBar = document.getElementById('progress-bar');
  const grade = document.getElementById('grade');

  subjectName.textContent = `📘 ${subject}`;

  let resultMsg = "";
  let gradeMsg = "";
  let gradeColor = "#4e54c8";

  if (requiredExternal > 100) {
    resultMsg = `You need ${requiredExternal} marks in externals to reach ${target}% 😢 (Not possible)`;
    gradeMsg = "Aim for a lower grade.";
    gradeColor = "#e74c3c";
  } else {
    resultMsg = `You need ${requiredExternal} marks in externals to achieve ${gradeSelect.options[gradeSelect.selectedIndex].text} 🎯`;

    // Determine grade label + GP
    if (target >= 90) gradeMsg = "S Grade (GP 10)";
    else if (target >= 85) gradeMsg = "A+ Grade (GP 9)";
    else if (target >= 80) gradeMsg = "A Grade (GP 8.5)";
    else if (target >= 75) gradeMsg = "B+ Grade (GP 8)";
    else if (target >= 70) gradeMsg = "B Grade (GP 7.5)";
    else if (target >= 65) gradeMsg = "C+ Grade (GP 7)";
    else if (target >= 60) gradeMsg = "C Grade (GP 6.5)";
    else if (target >= 55) gradeMsg = "D Grade (GP 6)";
    else if (target >= 50) gradeMsg = "P Grade (GP 5.5)";
    else if (target >= 40) gradeMsg = "LP (Low Pass) – GP 4 ⚠️";
    else gradeMsg = "F (Fail) – GP 0 ❌";
  }

  // Progress bar visuals
  progressBar.style.width = `${Math.min(target, 100)}%`;
  if (target >= 85) gradeColor = "#27ae60";
  else if (target >= 70) gradeColor = "#2980b9";
  else if (target >= 55) gradeColor = "#f1c40f";
  else gradeColor = "#e74c3c";
  progressBar.style.background = gradeColor;

  result.textContent = resultMsg;
  grade.textContent = gradeMsg;
  resultBox.classList.remove('hidden');
}
