<template>
  <picture class="img-spinner" ref="componentContainer">
    <template v-if="imagesPreloaded">
      <img
        tabindex="1"
        draggable="false"
        :src="spinner.currentPath"
        @keydown="handleKeydown"
        @mouseup="handleMouseUp"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
        @touchmove="handleTouchMove"
      />
      <input
        type="range"
        tabindex="1"
        min="1"
        :max="spinner.size"
        :value="spinner.current"
        class="img-spinner-act"
        :class="sliderClass"
        @input="handleSlider"
        v-if="slider"
      />
    </template>
    <slot v-else>
      Loading images...
    </slot>
  </picture>
</template>

<script>
function preloadImages(srcs) {
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function() {
        resolve(img);
      };
      img.onerror = img.onabort = function() {
        reject(src);
      };
      if(typeof(src)=='string'){
        img.src = src;
      }else{
        img.src = src.default;
      }
    });
  }
  const promises = [];
  for (let i = 0; i < srcs.length; i++) {
    promises.push(loadImage(srcs[i]));
  }
  return Promise.all(promises);
}

export default {
  name: "VueProductSpinner",

  props: {
    images: {
      type: Array,
      required: true
    },
    infinite: {
      type: Boolean,
      required: false,
      default: () => true
    },
    speed: {
      type: Number,
      required: false,
      default: () => 3
    },
    touchDrag: {
      type: Boolean,
      required: false,
      default: () => true
    },
    mouseWheel: {
      type: Boolean,
      required: false,
      default: () => true
    },
    mouseDrag: {
      type: Boolean,
      required: false,
      default: () => true
    },
    slider: {
      type: Boolean,
      required: false,
      default: () => false
    },
    sliderClass: {
      type: String,
      required: false,
      default: () => ""
    }
  },

  data() {
    return {
      imagesPreloaded: false,
      speedController: 0,
      spinner: {
        current: 0,
        size: 0,
        currentPath: null
      },
      mouse: {
        isMoving: false
      },
      touch: {
        isMoving: false,
        initialX: 0
      }
    };
  },

  beforeMount() {
    console.log('img',this.images)
    preloadImages(this.images).then(() => (this.imagesPreloaded = true));
  },

  mounted() {
    this.$refs.componentContainer.addEventListener(
      "wheel",
      this.handleWheel,
      false
    );
  },

  destroyed() {
    this.$refs.componentContainer.removeEventListener(
      "wheel",
      this.handleWheel
    );
  },

  created() {
    this.spinner.size = this.images.length;
    this.spinner.currentPath = this.images[0];
  },

  methods: {
    handleKeydown(event) {
      if (event.keyCode === 39) {
        event.preventDefault();
        this.handleMovement(1);
      }
      if (event.keyCode === 37) {
        event.preventDefault();
        this.handleMovement(-1);
      }
    },

    handleSlider(event) {
      this.spinner.current = parseInt(event.target.value);
      this.spinner.currentPath = this.images[event.target.value - 1];
    },

    handleMouseDown() {
      this.mouse.isMoving = true;
    },

    handleMouseUp() {
      this.mouse.isMoving = false;
    },

    handleMouseMove(event) {
      if (this.mouse.isMoving && this.mouseDrag) {
        this.handleMovement(event.movementX);
      }
    },

    handleTouchStart(event) {
      event.preventDefault();
      this.touch.isMoving = true;
      this.touch.initialX = event.touches[0].pageX;
    },

    handleTouchEnd() {
      this.touch.isMoving = false;
    },

    handleTouchMove(event) {
      if (this.touchDrag) {
        const delta = -(this.touch.initialX - event.touches[0].pageX);
        this.handleMovement(delta);
      }
    },

    handleWheel(event) {
      event.preventDefault();
      if (this.mouseWheel) {
        this.handleMovement(event.deltaY);
      }
    },

    handleMovement(delta) {
      this.speedController++;
      if (this.speedController < this.speed) {
        console.log("ad");
        return;
      }

      if (this.speedController > this.speed) {
        this.speedController = 0;
      }

      if (delta >= 0) {
        /**
         * User is moving forward
         */
        if (
          this.spinner.current >= 0 &&
          this.spinner.current < this.spinner.size
        ) {
          this.spinner.current++;
          this.spinner.currentPath = this.images[this.spinner.current - 1];
        } else {
          if (this.infinite) {
            this.spinner.current = 1;
            this.spinner.currentPath = this.images[this.spinner.current - 1];
          }
        }
      } else {
        /**
         * User is moving backward
         */
        if (this.spinner.current >= 0 && this.spinner.current - 1 > 0) {
          this.spinner.current--;
          this.spinner.currentPath = this.images[this.spinner.current - 1];
        } else {
          if (this.infinite) {
            this.spinner.current = this.spinner.size;
            this.spinner.currentPath = this.images[this.spinner.current - 1];
          }
        }
      }
    }
  }
};
</script>
<style scoped type="text/css" lang="scss">
  .img-spinner{
    img{
      width: 100%;
    }
  }
</style>