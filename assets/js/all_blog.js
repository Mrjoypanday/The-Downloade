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
  fetch("assets/localblog/blog.json")
    .then((response) => response.json())
    .then((data) => {
      const blogCardsContainer = document.getElementById("productDiv");
      data.blogs.forEach((blog) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
                    <img src="${blog.image}" alt="${blog.title}">
                    <a><h2>${blog.title.substring(0, 70)}</h2></a>
                    <p>${blog.description.substring(0, 82)}</p>
                `;
        card.addEventListener("click", () => {
          window.location.href = `Blog_Detils.html?id=${blog.id}`;
        });
        blogCardsContainer.appendChild(card);
      });
    });
});
document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/localblog/resent.json")
    .then((respon) => respon.json())
    .then((data) => {
      const B_conten = document.getElementById("resent_blog");
      data.reBlog.forEach((blogs) => {
        const resent = document.createElement("div");
        resent.classList.add("resent");
        resent.innerHTML = `
       <img src="${blogs.image}" alt="${blogs.title}">
                    <a><h2>${blogs.title.substring(0, 70)}</h2></a>
                    <p>${blogs.description.substring(0, 82)}</p>
      `;
        resent.addEventListener("click", () => {
          window.location.href = `Blog_Detils.html?id=${blogs.id}`;
        });
        B_conten.appendChild(resent);
      });
    });
});
import { realdb, ref, get, child } from "./config.js";
const blogList = document.getElementById("favorite");

const dbRef = ref(realdb);

get(child(dbRef, "blogs")).then((snapshot) => {
  if (snapshot.exists()) {
    const blogs = snapshot.val();
    for (let key in blogs) {
      const blog = blogs[key];
      const blogCard = document.createElement("div");
      blogCard.classList.add("card");

      blogCard.innerHTML = `
          <img class='thumb' onclick="viewBlog('${key}')"  src="${
        blog.mainImage
      }" alt="${blog.title}">
         
           <a> <h2 onclick="viewBlog('${key}')">${blog.title.substring(
        0,
        70
      )}</h2></a>
            <p onclick="viewBlog('${key}')">${blog.description.substring(
        0,
        82
      )}...</p>
          
        `;
      blogList.appendChild(blogCard);
    }
  }
});

window.viewBlog = function (key) {
  window.location.href = `Blog_Detils.html?key=${key}`;
};
