<template functional>
  <div class="detail-box">
    <slot name="page-breadcrumb"></slot>

    <div class="detail-box-card">
      <slot></slot>
    </div>

    <div class="page-footer" v-if="props.footerBtn">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hs-layout-detail',
  props: {
    footerBtn: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.detail-box {
  height: 100%;
  width: 100%;
  min-width: 840px;
  display: flex;
  flex-direction: column;
  &-card {
    flex: 1;
    border-radius: 8px;
    padding: 15px;
    overflow: auto;
  }
  .page-footer {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
