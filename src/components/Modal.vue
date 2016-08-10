<template>
  <div class="underlay" v-if="isVisible" transition="modal" @click="onUnderlayClick">
    <div class="modal {{ modalClass }}">
      <a @click="isVisible = false" class="modal__close-btn">
        <i class="fa fa-times" aria-hidden="true"></i>
      </a>

      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    isVisible: {
      required: true,
      twoWay: true
    },
    modalClass: {
      type: String,
      default: ''
    }
  },

  created () {
    // TODO: add event listener only when modal isopened
    window.addEventListener('keyup', this.onKeyUp);
  },

  beforeDestroy () {
    window.removeEventListener('keyup', this.onKeyUp);
  },

  methods: {
    close() {
      this.isVisible = false;
    },

    onKeyUp(e) {
      if (e.which === 27) {
        this.close();
      }
    },

    onUnderlayClick(e) {
      if (e.target.classList.contains('underlay')) {
        this.close();
      }
    }
  }
}
</script>


<style>
.underlay {
  position: fixed;
  left: -14vw;
  right: -40vw;
  top: -40vh;
  bottom: -40vh;
  z-index: 999;
  background: rgba(102, 51, 153, 0.8);
  display:flex;
  align-items: center;
  justify-content: center;
}
.modal {
  position: relative;
  padding: 2em;
  background: #fff;
  border-radius: 4px;
  max-width: 90vw;
  min-width: 50vw;
  border: 1px solid rgba(0,0,0,0.1);
  box-shadow: 0 10px 20px 0 rgba(0,0,0,0.15);
}
@media screen and (max-width: 700px) {
  .modal {
    width: 95vw;
  }
}
@media screen and (max-width: 400px) {
  .modal {
    width: 98vw;
    padding: 1em;
  }
}
.modal__close-btn {
  position: absolute;
  right: 10px;
  top: 10px;
}
.modal-transition {
  will-change: transform, opacity;
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease;
}
.modal-enter, .modal-leave {
  transform: scale(0.7);
  opacity: 0;
}
</style>
