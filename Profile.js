function editProfile() {
    alert("Edit profile feature coming soon! 😎");
}

// Open modal on image click
const images = document.querySelectorAll('.gallery img');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');

images.forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = "block";
        modalImg.src = img.src;
    });
});

// Close modal
function closeModal() {
    modal.style.display = "none";
}

function toggleEditForm() {
    const form = document.getElementById("editForm");
    form.style.display = form.style.display === "none" || form.style.display === "" ? "flex" : "none";
}

function saveProfile() {
    const name = document.getElementById("name").value;
    const bio = document.getElementById("bio").value;
    const website = document.getElementById("website").value;

    // ✅ Update the top username
    document.getElementById("displayUsername").innerText = `@${name}`;

    // ✅ Update bio section
    document.querySelector(".bio").innerHTML = `
    <p>${bio}</p>
    <p><a href="${website}" target="_blank">${website}</a></p>
  `;

    toggleEditForm();
}

document.getElementById("imageUpload").addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;

            document.querySelector(".gallery").prepend(img);

            // ✅ Update Post Count
            updatePostCount();
        };
        reader.readAsDataURL(file);
    }
});

// 🔁 Function to update post count
function updatePostCount() {
    const totalPosts = document.querySelectorAll(".gallery img").length;
    document.getElementById("postCount").innerText = totalPosts;
}

// Image Click to View Fullscreen
document.querySelector(".gallery").addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        openModal(e.target.src);
    }
});

function openModal(src) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    modal.style.display = "block";
    modalImg.src = src;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}
