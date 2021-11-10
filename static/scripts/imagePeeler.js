class ImagePeeler {
    constructor(box, mask, settings) {
        this.box = box;
        this.mask = this.box.querySelector(mask);
        this.startCapturing = false;
        this.isMousedown = false;
        this.settings = {
            onMousedown: true,
        }

        this.settings = {
            ...this.settings,
            ...settings
        }

        if (this.box === null) {
            console.warn('ImagePeeler manager: Box cannot be null!');
            return;
        }
        if (this.mask === null) {
            console.warn('ImagePeeler manager: Mask cannot null!');
            return;

        }

        this.box.querySelector('img').setAttribute('draggable', 'false');

        // bind events
        this.box.addEventListener("mousedown", this.handleMousedown);
        this.box.addEventListener("mouseup", this.handleMouseup);
        this.box.addEventListener("mouseenter", this.handleMouseenter);
        this.box.addEventListener("mousemove", this.handleMousemove);
        this.box.addEventListener("mouseleave", this.handleMouseleave);
    }

    handleMousedown = () => {
        this.isMousedown = true;
    }

    handleMouseup = () => {
        this.isMousedown = false;
    }

    handleMouseenter = () => {
        this.startCapturing = true;
    }

    handleMousemove = (e) => {
        if (!this.startCapturing || (this.settings.onMousedown && !this.isMousedown)) return;
        e.preventDefault();

        let height = (((e.clientY - this.box.getBoundingClientRect().top) / this.box.getBoundingClientRect().height) * 100).toFixed(2);
        if (height < 0) height = 0;
        else if (height > 100) height = 100;

        this.mask.style.height = height + "%";
    }

    handleMouseleave = () => {
        this.startCapturing = false;
        this.isMousedown = false;
    }
}
