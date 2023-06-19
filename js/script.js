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

fetch("js/event.json")
	.then((response) => response.json())
	.then((data) => {
		const textBoxes = document.querySelectorAll(".text-box");
		const anchors = document.querySelectorAll(".text-box a");

		const eventDetail = document.querySelector("#event-detail");
		const eventDetailButtons = document.querySelectorAll(".button");
		const modalContentText = document.querySelector(".modal-content-text");

		eventDetailButtons.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				const eventData = data.event.find((item) => item.id === btn.id);
				console.log(eventData?.nama);
				if (eventData) {
					const namaElement = document.createElement("h3");
					namaElement.textContent = eventData.nama;

					const tanggalElement = document.createElement("small");
					tanggalElement.textContent = eventData.tanggal;

					const deskripsiElement = document.createElement("p");
					deskripsiElement.textContent = eventData.longDesc;

					// untuk mengosongkan modalContentText
					modalContentText.innerHTML = "";

					// menambahkan h3, small, p element ke modalContentText
					modalContentText.appendChild(namaElement);
					modalContentText.appendChild(tanggalElement);
					modalContentText.appendChild(deskripsiElement);
				}
				eventDetail.style.display = "flex";
				e.preventDefault();
			});
		});

		data.event.forEach((item, index) => {
			const namaElement = document.createElement("h3");
			namaElement.textContent = item.nama;

			const tanggalElement = document.createElement("small");
			tanggalElement.textContent = item.tanggal;

			const deskripsiElement = document.createElement("p");
			deskripsiElement.textContent = item.shortDesc;

			const textBoxIndex = index % textBoxes.length;
			const anchor = anchors[textBoxIndex];

			textBoxes[textBoxIndex].insertBefore(namaElement, anchor);
			textBoxes[textBoxIndex].insertBefore(tanggalElement, anchor);
			textBoxes[textBoxIndex].insertBefore(deskripsiElement, anchor);
		});
	});

// klik tombol close
const eventDetail = document.querySelector("#event-detail");

document.querySelector(".box-modal .close-icon").onclick = (e) => {
	eventDetail.style.display = "none";
	e.preventDefault();
};

// klik diluar box-modal
const modal = document.querySelector("#event-detail");
window.onclick = (e) => {
	if (e.target === modal) {
		modal.style.display = "none";
	}
};
