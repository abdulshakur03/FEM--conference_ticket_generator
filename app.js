// Image Upload starts here
const dragArea = document.querySelector(".uploadAvatar");
const dragAreaHover = document.querySelector(".hover");
const uploadHint = document.querySelector(".upload_hint_text");
const uploadHintImage = document.querySelector(".upload_hint_image");
const avatarUpload = document.querySelector(".upload-icon_container");
const uploadText = document.querySelector(".upload_text");
const click = dragAreaHover.querySelector(".click");
const fileClick = document.querySelector("#avatarUpload");

let file;

click.addEventListener("click", (e) => {
  e.stopPropagation();
  fileClick.click(); // Triggers the hidden file input
});

// Handle file selection after clicking the input
fileClick.addEventListener("change", (e) => {
  file = e.target.files[0];
  console.log(file);

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
    return;
  }
  if (validFileType.includes(fileType)) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;
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
  }
}

/// Modify Image controls
function modifyImage() {
  const modification = document.querySelector(".editParent");
  const uploadText = document.querySelector(".upload_text");
  if (modification) modification.remove(); // preveents duplicate

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
  }
  if (e.target.classList.contains("change")) {
    fileClick.click(); //Triggers the hidden file input
  }
});
