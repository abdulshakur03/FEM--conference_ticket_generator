// Image Upload starts here
const dragArea = document.querySelector(".uploadAvatar");
const dragAreaHover = document.querySelector(".hover");
const uploadHint = document.querySelector(".upload_hint_text");
const uploadHintImage = document.querySelector(".upload_hint_image");
const avatarUpload = document.querySelector(".upload-icon_container");
const uploadText = document.querySelector(".upload_text");
const click = dragAreaHover.querySelector(".click");
const fileClick = document.querySelector("#avatarUpload");
const ticketFullName = document.querySelector(".ticketFullName");

// let file;
let file = null;
let uploadedImageUrl = null;

click.addEventListener("click", (e) => {
  e.stopPropagation();
  fileClick.click(); // This is the input[type="file"]
  console.log("click area triggered");
});

// Handle file selection after clicking the input
fileClick.addEventListener("change", (e) => {
  file = e.target.files[0];
  console.log("clicked again");

  if (file) {
    imageUpload(); // Call your upload function here
  }
});

dragArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dragAreaHover.classList.add("active");
});
dragArea.addEventListener("dragleave", (e) => {
  dragAreaHover.classList.remove("active");
});
dragArea.addEventListener("drop", (e) => {
  e.stopPropagation();

  e.preventDefault();
  file = e.dataTransfer.files[0];
  imageUpload();
});

///(choose file)
function imageUpload() {
  let fileType = file.type;
  const validFileType = ["image/jpeg", "image/png"];
  const maxSize = 500 * 1024;
  if (file.size > maxSize) {
    uploadHint.textContent = `File too large, please upload a photo under 500KB`;
    uploadHint.style.color = "hsla(7, 71%, 60%)";
    uploadHintImage.style.color = "hsla(7, 71%, 60%)";
    uploadedImageUrl = null; // Clear if file is too large
    return;
  }
  if (validFileType.includes(fileType)) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      uploadedImageUrl = fileURL;
      let imgTag = `<img src='${fileURL}' alt='image' style= "border-radius: 7px">`;
      avatarUpload.innerHTML = imgTag;
      avatarUpload.classList.add("imageDropped");
      dragAreaHover.classList.remove("active");
      modifyImage();
    };

    fileReader.readAsDataURL(file);
  } else {
    uploadHint.textContent = `Invalid file type. Please upload a JPG or PNG.`;
    uploadHint.style.color = "hsla(7, 71%, 60%)";
    uploadedImageUrl = null;
  }
}

/// Modify Image controls
function modifyImage() {
  const modification = document.querySelector(".editParent");
  const uploadText = document.querySelector(".upload_text");
  if (modification) modification.remove(); // prevents duplicate

  const removeImageBtn = document.createElement("div");
  const changeImageBtn = document.createElement("div");
  const imageControlContainer = document.createElement("div");
  imageControlContainer.classList.add("editParent");
  removeImageBtn.classList.add("remove");
  changeImageBtn.classList.add("change");
  removeImageBtn.textContent = "Remove image";
  changeImageBtn.textContent = "Change image";
  imageControlContainer.append(removeImageBtn, changeImageBtn);
  avatarUpload.parentElement.appendChild(imageControlContainer);
  uploadHint.textContent = ` Upload your photo (JPG or PNG, max size: 500KB).`;
  uploadHint.style.color = "white";
}
// Remove or Change Image
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    avatarUpload.innerHTML = ` <img
                  src="https://raw.githubusercontent.com/abdulshakur03/FEM--conference_ticket_generator/5e409c5fa55781c79db08263a3f1c86ac39a6c3a/assets/images/icon-upload.svg"
                  class="upload-icon"
                />`;
    const editContainer = document.querySelector(".editParent");
    if (editContainer) editContainer.remove();
    dragArea.append(uploadText);
    uploadHint.textContent = ` Upload your photo (JPG or PNG, max size: 500KB).`;
    uploadHint.style.color = "white";

    fileClick.value = "";
  }
  if (e.target.classList.contains("change")) {
    console.log("change button triggered");

    fileClick.click(); //Triggers the hidden file input

    fileClick.value = "";
  }
});

//forms
// --- Core Form Elements ---
const form = document.querySelector("#form");
const ticketContainer = document.querySelector(".T-wrapper");
const nameField = form.querySelector('input[name="name"]');
const emailField = form.querySelector('input[name="email"]'); // Renamed 'email' to 'emailField' for clarity
const githubField = form.querySelector('input[name="gitHub"]'); // Renamed 'gitHubField' for clarity

const errorName = form.querySelector(".errorName");
const errorEmail = form.querySelector(".errorEmail");
const errorGithub = form.querySelector(".errorGithub");
const newTicket = ticketContainer.querySelector(".new-ticket");

// --- Validation Helper Functions (Keep these as they are) ---
function showError(message, errorElement) {
  const icon = document.createElement("img");
  icon.setAttribute("src", "./assets/images/icon-info.svg");
  errorElement.innerHTML = ""; // Clear previous messages
  errorElement.appendChild(icon);
  errorElement.appendChild(document.createTextNode(message));
  errorElement.classList.add("error");
}

function noError(errorElement) {
  errorElement.textContent = "";
  errorElement.classList.remove("error");
}

// --- Specific Validation Functions ---
const validateName = () => {
  // Renamed to validateName for consistency
  const minNum = 8;
  if (nameField.value.trim() === "" || nameField.value.trim().length < minNum) {
    // Added .trim() to remove whitespace
    showError("Please enter your full name (min 8 characters)", errorName);
    nameField.classList.add("fields");
    return false; // Indicate validation failed
  } else {
    noError(errorName);
    nameField.classList.remove("fields");
    return true; // Indicate validation passed
  }
};

const validateEmail = () => {
  // Renamed to validateEmail for consistency
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailValue = emailField.value.trim(); // Use emailField and .trim()
  if (emailRegex.test(emailValue)) {
    noError(errorEmail);
    emailField.classList.remove("fields");
    return true;
  } else {
    showError("Please enter a valid email address", errorEmail);
    emailField.classList.add("fields");
    return false;
  }
};

const validateGithub = () => {
  // Renamed to validateGithub and made active
  const gitHubRegex = /^(?!-)(?!.*--)[a-zA-Z0-9-]{1,39}(?<!-)$/;
  const gitHubFieldValue = githubField.value.trim(); // Use githubField and .trim()

  if (gitHubFieldValue === "" || !gitHubRegex.test(gitHubFieldValue)) {
    // Also check if empty
    showError("Please enter a valid GitHub username", errorGithub);
    githubField.classList.add("fields");
    return false;
  } else {
    noError(errorGithub);
    githubField.classList.remove("fields");
    return true;
  }
};

// --- Form Submission Handler ---
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop the page from reloading

  // Run all validations and store their results
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isGithubValid = validateGithub();

  // ONLY proceed if ALL validations pass
  if (isNameValid && isEmailValid && isGithubValid) {
    // Collect all valid data
    const userData = {
      name: nameField.value.trim(),
      email: emailField.value.trim(),
      github: githubField.value.trim(),
      avatar: uploadedImageUrl,
    };

    // Save to Local Storage
    localStorage.setItem("person", JSON.stringify(userData));

    // --- TEMPORARY: Confirm data is saved and log it ---
    console.log("Form submitted successfully! Data saved to Local Storage:");
    console.log(userData);
    displayTicket(userData);
  } else {
    console.log("Form has validation errors. Not submitting.");
  }
});

const displayTicket = (data) => {
  form.style.display = "none";
  ticketContainer.style.display = "block";

  const ticketNameSpan = ticketContainer.querySelector(".name");
  const ticketEmailSpan = ticketContainer.querySelector(".ticketEmailAddress");
  const ticketGitHub = ticketContainer.querySelector(".ticket-gitHub");
  const ticketNameBottom = ticketContainer.querySelector(".ticket-name-bottom");
  const ticketImage = ticketContainer.querySelector(".ticket-image");

  if (ticketNameSpan) {
    ticketNameSpan.textContent = data.name;
    ticketNameBottom.textContent = data.name;
  }
  if (ticketEmailSpan) {
    ticketEmailSpan.textContent = data.email;
  }

  if (ticketGitHub) {
    const gitHubIcon = document.createElement("img");
    gitHubIcon.setAttribute("src", "./assets/images/icon-github.svg");
    gitHubIcon.style.width = "15px";
    ticketGitHub.innerHTML = ""; // Clear previous messages
    ticketGitHub.appendChild(gitHubIcon);
    ticketGitHub.appendChild(document.createTextNode(data.github));
  }
  if (ticketImage) {
    if (data.avatar) {
      ticketImage.src = data.avatar;
    } else {
      ticketImage.src = "./assets/images/user-default-image.png";
    }
  }
};

newTicket.addEventListener("click", (e) => {
  e.preventDefault();
  form.style.display = "block";
  ticketContainer.style.display = "none";
  nameField.value = "";
  emailField.value = "";
  githubField.value = "";

  noError(errorName);
  noError(errorEmail);
  noError(errorGithub);

  nameField.classList.remove("fields");
  emailField.classList.remove("fields");
  githubField.classList.remove("fields");
});
