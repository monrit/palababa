const slider = () => {
    const carousel = document.querySelector(".carousel");
    const images = document.querySelectorAll(".subphoto img");

    let isMosueDown = false;
    let prevPageX = 0;
    let prevScrollLeft = 0;
    let positionDiff = 0;
    let isDragging = false;

    const values = {
        0: 0,
        320: 1,
        640: 2,
        960: 3
    };

    const clearSelected = (add = false, right = false) => {
        for (let i = 0; i < images.length; i++) {
            if (add) {
                if (images[i].classList.contains("selected")) {
                    if (right) {
                        images[i - 1]?.classList.add("selected");
                        images[i].classList.remove("selected");
                        break;
                    } else {
                        images[i + 1]?.classList.add("selected");
                        images[i].classList.remove("selected");
                        break;
                    }
                }
            } else {
                images[i].classList.remove("selected");
            }
        }
    };

    images.forEach((image, index) => {
        image.addEventListener("click", () => {
            carousel.scrollLeft = 320 * index;
            clearSelected();
            image.classList.add("selected");
        });
    });

    const autoSlide = () => {
        if (carousel.scrollLeft > prevScrollLeft) {
            if (carousel.scrollLeft <= 320) {
                if (carousel.scrollLeft >= 100) {
                    carousel.scrollLeft = 320;
                    clearSelected(true);
                } else {
                    carousel.scrollLeft = 0;
                }
            } else if (carousel.scrollLeft <= 640) {
                if (carousel.scrollLeft >= 420) {
                    carousel.scrollLeft = 640;
                    clearSelected(true);
                } else {
                    carousel.scrollLeft = 320;
                }
            } else if (carousel.scrollLeft <= 960) {
                if (carousel.scrollLeft >= 740) {
                    carousel.scrollLeft = 960;
                    clearSelected(true);
                } else {
                    carousel.scrollLeft = 640;
                }
            }
        } else {
            if (carousel.scrollLeft <= 320) {
                if (carousel.scrollLeft >= 220) {
                    carousel.scrollLeft = 320;
                } else {
                    carousel.scrollLeft = 0;
                    clearSelected(true, true);
                }
            } else if (carousel.scrollLeft <= 640) {
                if (carousel.scrollLeft >= 540) {
                    carousel.scrollLeft = 640;
                } else {
                    carousel.scrollLeft = 320;
                    clearSelected(true, true);
                }
            } else if (carousel.scrollLeft <= 960) {
                if (carousel.scrollLeft >= 860) {
                    carousel.scrollLeft = 960;
                } else {
                    carousel.scrollLeft = 640;
                    clearSelected(true, true);
                }
            }
        }
    };

    const onMouseDown = e => {
        if (!e.target.parentNode.classList.contains("slide")) {
            return;
        }

        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = carousel.scrollLeft;
        isMosueDown = true;
    };

    const onMouseUp = e => {
        isMosueDown = false;

        if (!isDragging) {
            return;
        }
        carousel.classList.remove("dragging");
        isDragging = false;
        autoSlide();
    };

    const onMouseMove = e => {
        if (!isMosueDown) {
            return;
        } else if (e.pageX) {
            e.preventDefault();
        }

        carousel.classList.add("dragging");
        isDragging = true;
        try {
            positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
            carousel.scrollLeft = prevScrollLeft - positionDiff;
        } catch (err) {
            return;
        }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("touchstart", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchend", onMouseUp);
};

export default slider;
