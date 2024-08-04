(() => {
  const sidebarOpen = document.getElementById("menu_open");
  const sidebarClose = document.getElementById("close_menu");

  sidebarOpen.addEventListener("click", () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "flex";
  });

  sidebarClose.addEventListener("click", () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
  });

  document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get("id");

    fetch("assets/localblog/resent.json")
      .then((response) => response.json())
      .then((data) => {
        const blog = data.reBlog.find((blog) => blog.id == blogId);
        const blogDetails = document.getElementById("blog-details");
        // const recentBlogs = document.getElementById("recent-blogs");

        let contentHTML = "";
        blog.content.forEach((data) => {
          document.getElementById("Title_top").textContent = data.heading;
          contentHTML += `
                    <h2>${data.heading}</h2>
                    <img src="${data.image}" alt="${data.heading}">
                    ${data.dascrive ? `<p>${data.dascrive}</p> ` : ""}
                    ${data.description ? `<p>${data.description}</p>` : ""}
                `;
        });
        blogDetails.innerHTML = contentHTML;
      });
  });

  document.addEventListener("DOMContentLoaded", () => {
    fetch("assets/localblog/blog.json")
      .then((response) => response.json())
      .then((data) => {
        const blogCardsContainer = document.getElementById("recent-blogs");
        data.blogs.forEach((blog) => {
          const card = document.createElement("div");
          card.classList.add("blog-card");
          card.innerHTML = `
                    <img src="${blog.image}" alt="${blog.title}">
                    <h4>${blog.title.substring(0, 50)}...</h4>
                    
                `;
          card.addEventListener("click", () => {
            window.location.href = `Blog_Detils.html?id=${blog.id}`;
          });
          blogCardsContainer.appendChild(card);
        });
      });
  });
})();
