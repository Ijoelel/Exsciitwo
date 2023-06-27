const player = new Plyr("#player");

// Toggle class activ
const navbarNav = document.querySelector(".navbar-nav");
// Ketika hamburger menu di klik
document.querySelector("#ham-menu").onclick = () => {
	navbarNav.classList.toggle("active");
};

// untuk menutup ham-menu
const outNav = document.querySelector("#ham-menu");
const navbarNavElements = document.querySelectorAll(".navbar-nav a");

document.addEventListener("click", function (e) {
	navbarNavElements.forEach((item) => {
		if (item.contains(e.target)) {
			navbarNav.classList.remove("active");
		}
	});
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
		const modalContentImage = document.querySelector(".image-content");

		eventDetailButtons.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				const eventData = data.event.find((item) => item.id === btn.id);
				if (eventData) {
					const namaElement = document.createElement("h3");
					namaElement.textContent = eventData.nama;

					const tanggalElement = document.createElement("small");
					tanggalElement.textContent = eventData.tanggal;

					// untuk mengosongkan modalContent
					modalContentText.innerHTML = "";
					modalContentImage.innerHTML = "";

					let firstImgWidth;

					// menambahkan img
					eventData.url.forEach((link, index) => {
						const contentImage = document.createElement("img");
						contentImage.src = link;
						contentImage.draggable = false;
						modalContentImage.appendChild(contentImage);

						firstImgWidth = contentImage.offsetWidth;
					});

					// menambahkan h3, small, p element ke modalContentText
					modalContentText.appendChild(namaElement);
					modalContentText.appendChild(tanggalElement);

					// carousel infinite effect
					const contentImage =
						document.querySelector(".image-content");
					const arrowBtns = document.querySelectorAll(".btn");

					let isDragging = false,
						startX,
						startScrollLeft;

					// add event listener di tanda panah
					arrowBtns.forEach((btn) => {
						const rightButton = document.getElementById("right");
						const leftButton = document.getElementById("left");
						btn.addEventListener("click", (e) => {
							rightButton.addEventListener("click", () => {
								const scrollAmount = contentImage.clientWidth; // Menggunakan 10% dari lebar container sebagai jarak scroll
								contentImage.scrollBy({
									left: scrollAmount,
									behavior: "smooth",
								});
							});

							leftButton.addEventListener("click", () => {
								const scrollAmount = contentImage.clientWidth;
								contentImage.scrollBy({
									left: -scrollAmount,
									behavior: "smooth",
								});
							});
						});
					});

					const dragStart = (e) => {
						isDragging = true;
						contentImage.classList.add("dragging");
						startX = e.pageX;
						startScrollLeft = contentImage.scrollLeft;
					};

					const dragging = (e) => {
						if (!isDragging) return;
						contentImage.scrollLeft =
							startScrollLeft - (e.pageX - startX);
					};

					const dragStop = () => {
						isDragging = false;
						contentImage.classList.remove("dragging");
					};

					contentImage.addEventListener("mousedown", dragStart);
					contentImage.addEventListener("mousemove", dragging);
					contentImage.addEventListener("mouseup", dragStop);
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

			const textBoxIndex = index % textBoxes.length;
			const anchor = anchors[textBoxIndex];

			textBoxes[textBoxIndex].insertBefore(namaElement, anchor);
			textBoxes[textBoxIndex].insertBefore(tanggalElement, anchor);
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
