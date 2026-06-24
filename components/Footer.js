Footer();
function Footer() {
  const div = document.createElement("div");
  footer.innerHTML = "";
  div.classList.add("container");
  const year = new Date().getFullYear();
  div.innerHTML = `
<div class="row gy-5">
<div class="col-12 col-sm-10 col-md-5 col-lg-5">
  <a href="./index.html" aria-label="Husyn Technologies home">
    <div class="brand-logo">
      <img src="./images/mylogo.png" alt="Husyn Technologies logo" width="170" height="44" loading="lazy" />
    </div>
  </a>
  <div class="brand-tagline h2 my-3 w-75">
    Husyn Technologies Limited
  </div>
  <p class="mb-0" style="max-width:26rem;">
    Web Development, AI Integration & Cybersecurity solutions for growing businesses worldwide.
  </p>
  <div class="brand-socials my-3 mt-4">
  

    <a href="https://www.facebook.com/people/Husyn-Technologies/61590893536047/"
      target="_blank"
      rel="noopener noreferrer"
      class="mx-1"
      aria-label="Husyn Technologies on Facebook">
      <i class="bi bi-facebook" aria-hidden="true"></i>
    </a>

    <a href="https://www.instagram.com/husyntechnologies/"
      target="_blank"
      rel="noopener noreferrer"
      class="mx-1"
      aria-label="Husyn Technologies on Instagram">
      <i class="bi bi-instagram" aria-hidden="true"></i>
    </a>

    <a href="https://www.linkedin.com/company/husyn-technologies/"
      target="_blank"
      rel="noopener noreferrer"
      class="mx-1"
      aria-label="Husyn Technologies on LinkedIn">
      <i class="bi bi-linkedin" aria-hidden="true"></i>
    </a>

  </div>
</div>
<div class="col-12 col-md-7 col-lg-7">
  <div class="row gy-5">
    <div class="col-6 col-sm-4 col-lg-4">
      <div class="fw-6">Company</div>
      <div class="row gy-2 mt-2">
        <div><a href="./aboutUs.html">About Us</a></div>
        <div><a href="./service.html">Services</a></div>
        <div><a href="./portfolio.html">Portfolio</a></div>
        <div><a href="./careers.html">Careers</a></div>
        <div><a href="./contact.html">Contact</a></div>
      </div>
    </div>
    <div class="col-6 col-sm-4 col-lg-4">
      <div class="fw-6">Connect</div>
      <div class="row gy-2 mt-2">
        <div><a href="mailto:info@husyntechnologies.com">info@husyntechnologies.com</a></div>
        <div><a href="https://wa.me/923480931908" target="_blank" rel="noopener">WhatsApp: +92 348 0931908</a></div>
      </div>
    </div>
    <div class="col-12 col-sm-4 col-lg-4">
      <div class="fw-6">Location</div>
      <div class="row gy-2 mt-2">
        <div>Dubai, United Arab Emirates</div>
        <div class="opacity-75">Serving clients worldwide</div>
      </div>
    </div>
  </div>
</div>
</div>
<div class="footer-bottom-bar">
  <div>&copy; ${year} Husyn Technologies. All rights reserved.</div>
  <div><a href="./contact.html">Get a Free Consultation</a></div>
</div>
`;
  footer.appendChild(div);
}
