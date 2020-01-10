<template>
  <div v-if="value"
    class="image-preview"
    @mousewheel="onMousewheel">
    <!-- 标题栏 -->
    <div v-show="currentName"
      class="image-preview__title-bar">
      <span class="image-preview__name">{{currentName}}</span>
    </div>
    <!-- 关闭按钮 -->
    <div class="image-preview__close"
      @click="onActionClick('close')">
      <span class="el-icon-close icon-close"></span>
    </div>
    <!-- 图片显示区 -->
    <div class="image-preview__image"
      :class="{'image-preview__image--move':isMoving}"
      :style="{'background-image':`url(${currentUrl})`,
      top:`${y}px`,
      left:`${x}px`,
      transform:`scale(${scale / 100})`}"
      @mousedown="onImageMousedown"></div>
    <!-- 操作栏 -->
    <div class="image-preview__action">
      <div class="el-icon-zoom-in action"
        @click="onActionClick('zoomIn')"></div>
      <div class="action"
        style="width:76px;padding:15px 0;"
        @click="onActionClick('reset')">{{scaleStr}}</div>
      <div class="el-icon-zoom-out action"
        @click="onActionClick('zoomOut')"></div>
      <div class="el-icon-download action"
        @click="onActionClick('download')"></div>
    </div>
    <!-- 上、下一页 -->
    <div v-if="hasPrevious"
      class="image-preview__previous"
      @click="onPreviousClick"></div>
    <div v-if="hasNext"
      class="image-preview__next"
      @click="onNextClick"></div>
  </div>
</template>

<script>
import { download } from "../../utils/file.js";
export default {
  props: {
    value: Boolean,
    // Array(String) 图片地址列表
    list: { type: Array, default: () => [] },
    // 文件名列表
    nameList: { type: Array, default: () => [] },
    // 当前图片地址
    index: Number,
    // 水印信息
    watermark: String
  },

  computed: {
    mImageList() {
      return this.list.map(item => {
        if (
          item &&
          !item.includes(".gif") &&
          item.includes("static.weixiaotong.com.cn") &&
          this.watermark
        ) {
          return item + "@" + this.watermark;
        }
        return item;
      });
    },

    isMultiple() {
      return this.list.length > 1;
    },

    currentUrl() {
      return this.mImageList.length && this.mImageList.length > this.mIndex
        ? this.mImageList[this.mIndex]
        : "";
    },

    currentName() {
      return this.nameList.length && this.nameList.length > this.mIndex
        ? this.nameList[this.mIndex]
        : "";
    },

    scaleStr() {
      return this.scale + "%";
    },

    hasPrevious() {
      return this.mIndex > 0;
    },

    hasNext() {
      return this.mIndex < this.list.length - 1;
    }
  },

  data() {
    return {
      mIndex: 0,
      isMoving: false,
      scale: 100,
      x: 0,
      y: 0,
      moveX: 0,
      moveY: 0
    };
  },

  methods: {
    onPreviousClick() {
      if (this.hasPrevious) {
        this.reset();
        this.mIndex--;
      }
    },

    onNextClick() {
      if (this.hasNext) {
        this.reset();
        this.mIndex++;
      }
    },

    reset() {
      this.scale = 100;
      this.x = 0;
      this.y = 0;
    },

    onImageMousedown(e) {
      if (e.button !== 0) return;
      this.isMoving = true;
      this.moveX = e.clientX;
      this.moveY = e.clientY;
      window.addEventListener("mousemove", this.onImageMousemove, false);
      window.addEventListener("mouseup", this.onImageMouseup, false);
    },

    onImageMousemove(e) {
      this.x -= this.moveX - e.clientX;
      this.y -= this.moveY - e.clientY;
      this.moveX = e.clientX;
      this.moveY = e.clientY;
    },

    onImageMouseup(e) {
      this.isMoving = false;
      window.removeEventListener("mousemove", this.onImageMousemove, false);
      window.removeEventListener("mouseup", this.onImageMouseup, false);
    },

    onActionClick(action) {
      switch (action) {
        case "close":
          this.reset();
          this.$emit("input", false);
          break;
        case "reset":
          this.reset();
          break;
        case "zoomIn":
          if (this.scale < 200) {
            this.scale += 10;
          }
          break;
        case "zoomOut":
          if (this.scale > 50) {
            this.scale -= 10;
          }
          break;
        case "download":
          download(this.currentUrl, this.currentName || "图片.jpg");
          break;
        default:
          break;
      }
    },
    onMousewheel(e) {
      this.onActionClick(e.deltaY < 0 ? "zoomIn" : "zoomOut");
    }
  },

  watch: {
    index: {
      immediate: true,
      handler(val) {
        this.mIndex = val;
      }
    },
    value(val) {
      document.body.style.overflow = val ? "hidden" : "";
    }
  },

  beforeDestroy() {
    window.removeEventListener("mousemove", this.onImageMousemove, false);
    window.removeEventListener("mouseup", this.onImageMouseup, false);
    document.body.style.overflow = "";
  }
};
</script>

<style lang="scss" scoped>
* {
  user-select: none;
}
.image-preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.75);
  pointer-events: all;
  &__title-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 50px;
    width: 100%;
    color: #fff;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.25);
    span {
      line-height: 50px;
      margin-left: 20px;
    }
  }
  &__close {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
    font-size: 24px;
    z-index: 9;
    cursor: pointer;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.4);
    transition-duration: 0.3s;
    &:hover {
      background-color: rgba(255, 255, 255, 0.4);
    }
    .icon-close {
      position: absolute;
      font-weight: 600;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &__image {
    position: absolute;
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: grab;
    transition: transform 0.5s;
    &--move {
      cursor: grabbing;
    }
  }
  &__action {
    position: absolute;
    bottom: 0;
    left: 50%;
    display: flex;
    user-select: none;
    padding: 4px;
    transform: translateX(-50%);
    color: #fff;
    background-color: rgba(0, 0, 0, 0.4);
  }

  &__previous {
    position: absolute;
    top: 50%;
    left: 20px;
    cursor: pointer;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-width: 30px 30px 30px 0;
    border-style: solid;
    border-color: transparent #fff transparent transparent;
    transition-duration: 0.3s;
    opacity: 0.5;
    &:hover {
      opacity: 1;
      border-right-color: #46c37b;
    }
  }
  &__next {
    position: absolute;
    top: 50%;
    right: 20px;
    cursor: pointer;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-width: 30px 0 30px 30px;
    border-style: solid;
    border-color: transparent transparent transparent #fff;
    transition-duration: 0.3s;
    opacity: 0.5;
    &:hover {
      opacity: 1;
      border-left-color: #46c37b;
    }
  }
}

.action {
  cursor: pointer;
  font-size: 24px;
  line-height: 24px;
  padding: 15px;
  text-align: center;
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
}
</style>
