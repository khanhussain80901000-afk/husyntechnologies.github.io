Footer();
function Footer() {
  const div = document.createElement("div");
  footer.innerHTML = "";
  div.classList.add("container");
  div.innerHTML = `
<div class="row gy-5">
<div class="col-12 col-sm-10 col-md-5 col-lg-5">
  <a href="#">
    <div class="brand-logo">
      <img
        class=""
        src="./images/BrandLogo-light (1).svg"
        alt="beandLogo"
        type="images/svg"
      />
    </div>
  </a>
  <div class="brand-tagline h2 my-3 w-75">
    Bespoke software solutions
  </div>
  <div class="brand-socials my-3 mt-4">
    <a href="#" class="mx-2"> <i class="bi bi-facebook"></i></a>
    <a href="#" class="mx-2"> <i class="bi bi-youtube"></i></a>
    <a href="#" class="mx-2"> <i class="bi bi-instagram"></i></a>
    <a href="#" class="mx-2"> <i class="bi bi-twitter"></i></a>
  </div>
</div>
<div class="col-12 col-md-7 col-lg-7">
  <div class="row gy-5">
    <div class="col-6 col-sm-5 col-lg-3">
      <div class="fw-6">Company</div>
      <div class="row gy-2 mt-2">
        <div><a href="./aboutUs.html">About Us</a></div>
        <div><a href="./service.html">Services</a></div>
        <div><a href="./portfolio.html">Portfolio</a></div>
        <div><a href="./contact.html">Contact</a></div>
      </div>
    </div>
    <div class="col-6 col-sm-5 col-lg-3">
      <div class="fw-6">Connect</div>
      <div class="row gy-2 mt-2">
        <div><a href="mailto:info@husyntechnologies.com">info@husyntechnologies.com</a></div>
        <div><a href="https://wa.me/923001234567" target="_blank">WhatsApp</a></div>
      </div>
    </div>
    
  </div>
</div>
</div>
`;
  footer.appendChild(div);
}
