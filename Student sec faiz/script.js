/* ============================== typing animation ============================ */
// var typed = new Typed(".typing", {
//     strings: ["Student","UI / UX Designer", "Web Developer","Software designer"],
//     typeSpeed: 100,
//     BackSpeed: 60,
//     loop: true
// })
/* ============================== Aside ============================ */
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;
for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {
        removeBackSection();
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                addBackSection(j);
                // allSection[j].classList.add("back-section");
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active")
        showSection(this);
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    })
}
function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }
}
function addBackSection(num) {
    allSection[num].classList.add("back-section");
}
function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active")
}
function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
})
function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}

const profilePic = document.getElementById("profilePic");
const fileInput = document.getElementById("fileInput");
const profileImage = document.getElementById("profileImage");

// When the profile picture area is clicked, trigger the file input
profilePic.addEventListener("click", function() {
    fileInput.click();
});
// document.getElementsByClassName("add-icon")[0].addEventListener("click",function(){
//     fileInput.click();

// })
// When a file is selected, update the profile picture
fileInput.addEventListener("change", function() {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImage.src = e.target.result; // Set the profile image to the uploaded image
        };
        reader.readAsDataURL(file);
    }
});

function previewProfilePicture(event) {
    const profilePreview = document.getElementById('profilePreview');
    const file = event.target.files[0];
    
    if (file) {
        profilePreview.src = URL.createObjectURL(file);
        profilePreview.style.display = 'block';
    } else {
        profilePreview.style.display = 'none';
    }
}


const attendanceData = {
    "January": [
        { date: "2024-01-01", status: "Present" },
        { date: "2024-01-02", status: "Absent" },
        { date: "2024-01-03", status: "Present" },
        // Add other dates as needed
    ],
    "February": [
        { date: "2024-02-01", status: "Present" },
        { date: "2024-02-02", status: "Absent" },
        // Add other dates as needed
    ],
};

function viewReport() {
    const month = document.getElementById("monthSelector").value;
    const tableBody = document.getElementById("attendanceData");
    tableBody.innerHTML = ""; // Clear previous data

    if (attendanceData[month]) {
        attendanceData[month].forEach(record => {
            const row = document.createElement("tr");
            const dateCell = document.createElement("td");
            const statusCell = document.createElement("td");

            dateCell.textContent = record.date;
            statusCell.textContent = record.status;

            row.appendChild(dateCell);
            row.appendChild(statusCell);
            tableBody.appendChild(row);
        });
    }
}

function downloadReport() {
    const month = document.getElementById("monthSelector").value;
    let csvContent = "Date,Status\n";

    if (attendanceData[month]) {
        attendanceData[month].forEach(record => {
            csvContent += `${record.date},${record.status}\n`;
        });
    }

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${month}_Attendance_Report.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Dummy data to represent previous submissions
const submissions = [
    { assignment: "Assignment 1", fileName: "Assignment1_Submission.pdf", date: "2024-01-05" },
    { assignment: "Assignment 2", fileName: "Assignment2_Submission.pdf", date: "2024-02-10" }
];

function loadPreviousSubmissions() {
    const submissionList = document.getElementById("submissionList");
    submissionList.innerHTML = ""; // Clear previous data

    submissions.forEach(submission => {
        const listItem = document.createElement("li");
        listItem.textContent = `${submission.assignment} - ${submission.fileName} (Submitted on: ${submission.date})`;
        submissionList.appendChild(listItem);
    });
}

function uploadAssignment() {
    const assignment = document.getElementById("assignmentSelector").value;
    const fileUpload = document.getElementById("fileUpload").files[0];

    if (assignment && fileUpload) {
        alert(`Uploaded ${fileUpload.name} for ${assignment}`);
        const submissionDate = new Date().toISOString().split("T")[0];
        submissions.push({ assignment, fileName: fileUpload.name, date: submissionDate });
        loadPreviousSubmissions();
    } else {
        alert("Please select an assignment and a file to upload.");
    }
}

// Load previous submissions on page load
window.onload = loadPreviousSubmissions;

