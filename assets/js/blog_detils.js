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

    fetch("assets/localblog/blog.json")
      .then((response) => response.json())
      .then((data) => {
        const blog = data.blogs.find((blog) => blog.id == blogId);
        const blogDetails = document.getElementById("blog-details");
        // const recentBlogs = document.getElementById("recent-blogs");

        let contentHTML = "";
        blog.content.forEach((data) => {
          document.getElementById("title_top").textContent = data.heading;
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
    fetch("assets/localblog/resent.json")
      .then((response) => response.json())
      .then((data) => {
        const blogCardsContainer = document.getElementById("recent-blogs");
        data.reBlog.forEach((blog) => {
          const card = document.createElement("div");
          card.classList.add("blog-card");
          card.innerHTML = `
                    <img src="${blog.image}" alt="${blog.title}">
                    <h4>${blog.title.substring(0, 50)}....</h4>
                    
                `;
          card.addEventListener("click", () => {
            window.location.href = `resent_blog.html?id=${blog.id}`;
          });
          blogCardsContainer.appendChild(card);
        });
      });
  });
})();
import { realdb, ref, get, child } from "./config.js";
(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const blogKey = urlParams.get("key");

  const blogTitle = document.getElementById("blog-title");
  const blogMainImage = document.getElementById("blog-main-image");
  const blogDescription = document.getElementById("blog-description");
  const blogSections = document.getElementById("blog-details");
  const title_top = document.getElementById("title_top");
  const dbRef = ref(realdb);

  get(child(dbRef, `blogs/${blogKey}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const blog = snapshot.val();
      blogTitle.textContent = blog.title;
      title_top.textContent = blog.title;
      blogMainImage.src = blog.mainImage;
      blogDescription.textContent = blog.description;
      let Dhtml = "";
      blog.sections.forEach((section, index) => {
        const sectionDiv = document.createElement("div");
        sectionDiv.classList.add("blog-card");

        Dhtml += `
                <h2>&#x2022; ${section.heading}</h2>
                <img src="${section.image}" alt="${section.heading}">
                <p>${section.description}</p>
            `;
        blogSections.innerHTML = Dhtml;
      });
    } else {
      console.log("No data available");
    }
  });
})();
