import { realdb, ref, get, child } from "./config.js";
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
  // scripts.js
  const sliderWrapper = document.querySelector("#slider-wrapper");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  let currentIndex = 0;
  let isTransitioning = false;
  const slideDuration = 2000;
  let autoSlideInterval;
  let slides; // Define slides variable

  function fetchData() {
    return fetch("assets/localblog/blog.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  function createSlides(data) {
    if (!data || !Array.isArray(data.blogs)) {
      throw new Error("Data is not an array");
    }

    data.blogs.forEach((item) => {
      const slide = document.createElement("div");
      slide.className = "slide";
      slide.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title.substring(0, 70)}...</h3>
            <p>${item.description.substring(0, 82)}...</p>
        `;
      slide.addEventListener("click", () => {
        window.location.href = `Blog_Detils.html?id=${item.id}`;
      });
      sliderWrapper.appendChild(slide);
    });

    // Duplicate slides for infinite effect
    data.blogs.forEach((item) => {
      const slide = document.createElement("div");
      slide.className = "slide";
      slide.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title.substring(0, 70)}...</h3>
            <p>${item.description.substring(0, 82)}...</p>
        `;
      slide.addEventListener("click", () => {
        window.location.href = `Blog_Detils.html?id=${item.id}`;
      });
      sliderWrapper.appendChild(slide);
    });

    slides = document.querySelectorAll(".slide"); // Update slides variable after creating slides
  }

  function updateSliderPosition() {
    const visibleSlidesCount = visibleSlides();
    const slideWidth = slides[0].offsetWidth;
    sliderWrapper.style.transform = `translateX(-${
      currentIndex * slideWidth
    }px)`;
  }

  function visibleSlides() {
    const width = window.innerWidth;
    if (width >= 900) return 3;
    if (width >= 600) return 2;
    return 1;
  }

  function showNextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex += 1;
    updateSliderPosition();

    const totalSlides = sliderWrapper.children.length;
    if (currentIndex >= totalSlides - visibleSlides()) {
      setTimeout(() => {
        currentIndex = 0;
        sliderWrapper.style.transition = "none";
        updateSliderPosition();
        setTimeout(() => {
          sliderWrapper.style.transition = "transform 0.5s ease";
          isTransitioning = false;
        }, 50);
      }, 500);
    } else {
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }
  }

  function showPrevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentIndex === 0) {
      const totalSlides = sliderWrapper.children.length;
      currentIndex = totalSlides - visibleSlides();
      sliderWrapper.style.transition = "none";
      updateSliderPosition();
      setTimeout(() => {
        sliderWrapper.style.transition = "transform 0.5s ease";
        currentIndex -= 1;
        updateSliderPosition();
        setTimeout(() => {
          isTransitioning = false;
        }, 500);
      }, 50);
    } else {
      currentIndex -= 1;
      updateSliderPosition();
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(showNextSlide, slideDuration);
  }

  nextButton.addEventListener("click", () => {
    clearInterval(autoSlideInterval);
    showNextSlide();
    startAutoSlide();
  });

  prevButton.addEventListener("click", () => {
    clearInterval(autoSlideInterval);
    showPrevSlide();
    startAutoSlide();
  });

  window.addEventListener("resize", updateSliderPosition);

  fetchData().then((data) => {
    createSlides(data);
    startAutoSlide();
    updateSliderPosition();
  });

  const blogList = document.getElementById("productDiv");

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
          <div class="card-content">
           <a> <h1 onclick="viewBlog('${key}')">${blog.title.substring(
          0,
          70
        )}</h1></a>
            <p onclick="viewBlog('${key}')">${blog.description.substring(
          0,
          150
        )}...</p>
          </div>
        `;
        blogList.appendChild(blogCard);
      }
    }
  });

  window.viewBlog = function (key) {
    window.location.href = `Blog_Detils.html?key=${key}`;
  };
})();
