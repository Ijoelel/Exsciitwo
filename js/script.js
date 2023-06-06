// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
// Ketika hamburger menu di klik
document.querySelector("#ham-menu").onclick = () => {
	navbarNav.classList.toggle("active");
};

const outNav = document.querySelector("#ham-menu");

document.addEventListener("click", function (e) {
	if (!outNav.contains(e.target) && !navbarNav.contains(e.target)) {
		navbarNav.classList.remove("active");
	}
});
