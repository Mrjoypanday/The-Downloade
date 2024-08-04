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
