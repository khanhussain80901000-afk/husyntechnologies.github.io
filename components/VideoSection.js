showReview();
function showReview() {
  if (!videoSection) return;
  videoSection.innerHTML = "";
  const videoSectionEl = document.createElement("div");
  videoSectionEl.classList.add("container");
  videoSectionEl.classList.add("light-bg");
  videoSectionEl.innerHTML = `
    <div class="row align-items-center">
      <div class="col-12 col-md-6 py-5">
        <span class="badge bg-brand-primay text-white mb-3 d-inline-block">Free Website Review</span>
        <h2>Free Website Performance & Security Review</h2>
        <p class="my-4">
          We provide a free website performance and security review for businesses.
        </p>
        <a href="./contact.html" class="btn bg-brand-primay text-white rounded-pill px-4 py-2">
          Get Free Consultation
        </a>
      </div>
      <div class="col-12 col-md-6 overflow-hidden b-6 position-relative">
        <img class="img-fit-cover" src="./images/Freesecaudbnr.png" alt="Free review" />
      </div>
    </div>
    `;
  videoSection.appendChild(videoSectionEl);
}
