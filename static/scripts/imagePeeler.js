class ImagePeeler {
    constructor(box, mask) {
        this.box = document.querySelector(box);
        this.mask = document.querySelector(mask);
        this.startCapturing = false;

        // bind events
        this.box.addEventListener("mouseenter", this.handleMouseenter);
        this.box.addEventListener("mousemove", this.handleMousemove);
        this.box.addEventListener("mouseleave", this.handleMouseleave);
    }

    handleMouseenter = () => {
        this.startCapturing = true;
    }

    handleMousemove = (e) => {
        if (!this.startCapturing) return;
        e.preventDefault();

        let height = (((e.clientY - (window.pageYOffset + this.box.getBoundingClientRect().top)) / this.box.getBoundingClientRect().height) * 100).toFixed(2);
        if (height < 0) height = 0;
        else if (height > 100) height = 100;

        this.mask.style.height = height + "%";
    }

    handleMouseleave = () => {
        this.startCapturing = false;
    }
}