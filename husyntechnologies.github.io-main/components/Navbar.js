const navbar = document.getElementById("navbar");

Navbar();
function Navbar() {
  navbar.innerHTML = "";
  navbar.setAttribute("aria-label", "Primary");
  const div = document.createElement("div");
  div.classList.add("container");
  div.classList.add("justify-");
  div.innerHTML = `
    <a class="navbar-brand brand-logo" href="./index.html" aria-label="Husyn Technologies home">
                <img
                  class="img-fluid"
                  src="./images/mylogo.png"
                  alt="Husyn Technologies logo"
                  width="155"
                  height="40"
                />
          </a>
          <button
            class="navbar-toggler rounded-pill"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" data-nav-link="aboutUs.html" href="./aboutUs.html"
                  >About Us</a
                >
              </li>
              <li class="nav-item ms-md-1">
                <a class="nav-link" data-nav-link="service.html" href="./service.html">Services</a>
              </li>
              <li class="nav-item ms-md-1">
                <a class="nav-link" data-nav-link="portfolio.html" href="./portfolio.html">Portfolio</a>
              </li>
              <li class="nav-item mx-md-1">
                <a class="nav-link" data-nav-link="contact.html" href="./contact.html">Contact</a>
              </li>
            </ul>
            
          </div>
    `;
  navbar.appendChild(div);

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  navbar.querySelectorAll("[data-nav-link]").forEach((link) => {
    if (link.dataset.navLink === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}
