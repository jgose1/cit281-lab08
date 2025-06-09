document.addEventListener("DOMContentLoaded", () => {
    const listDiv = document.getElementById("photo-list");
    const title = document.getElementById("title");
    const url = document.getElementById("url");
    const thumbnail = document.getElementById("thumbnail");
  
    fetch("/photos")
      .then(res => res.json())
      .then(photos => {
        photos.forEach(photo => {
          const item = document.createElement("p");
          item.textContent = photo.title;
          item.style.cursor = "pointer";
          item.addEventListener("click", () => loadPhoto(photo.id));
          listDiv.appendChild(item);
        });
      })
      .catch(err => console.error("Error loading photo list:", err));
  
    function loadPhoto(id) {
      fetch(`/photos/${id}`)
        .then(res => res.json())
        .then(photo => {
          title.textContent = photo.title;
          url.href = photo.url;
          url.textContent = photo.url;
          thumbnail.src = photo.thumbnailUrl;
        })
        .catch(err => console.error("Error loading photo:", err));
    }
  });