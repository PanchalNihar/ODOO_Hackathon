function searchFunction() {
    var input, filter, containers, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    containers = document.getElementsByClassName("subject-container");
    for (i = 0; i < containers.length; i++) {
        txtValue = containers[i].getElementsByTagName("h2")[0].textContent || containers[i].getElementsByTagName("h2")[0].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            containers[i].style.display = "";
        } else {
            containers[i].style.display = "none";
        }
    }
}
nf = {}
function submitFile(event) {
    const container = event.target.closest('.subject-container');
    const fileInput = container.querySelector('.file-upload-input');
    const subject = fileInput.getAttribute('data-subject');
    const file = fileInput.files[0];

    if (file) {
        uploadFile(file, subject);
    } else {
        alert('Please select a file.');
    }
}

function uploadFile(file, subject) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('subject', subject);
    nf.append({sub: subject ,  filename: function (req, file,cb) {
        cb(null,file.originalname);
    }   })
    // Simulating file upload with a delay (replace with actual backend logic)
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(result => {
        console.log(result);
        alert(`File "${file.name}" uploaded successfully for "${subject}".`);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was a problem uploading the file.');
    });
}
module.exports = nf