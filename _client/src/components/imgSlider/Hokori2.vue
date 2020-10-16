<template>
  <q-carousel-slide
    :name="name"
    class="column no-wrap"
    style="padding-left: 20px; padding-right: 20px"
  >
    <div
      style="transform: translateY(-10px); margin-bottom: -8px"
      class="row justify-center items-center"
    >
      <a
        href="https://hokori.online/hangzhou"
        target="_blank"
        class="text-subtitle2 text-primary text-bold text-center"
        >诗画浙江</a
      >
      <span class="text-gray q-mx-sm">-</span>
      <span class="text-caption text-gray">
        By
        <span>浙江传媒学院学生 </span>
        &
        <a
          href="https://blog.hokori.online"
          target="_blank"
          style="color: inherit"
        >
          Hokori
        </a>
      </span>
    </div>
    <div
      class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
    >
      <q-img
        v-if="!fullscreen"
        class="rounded-borders col-12 full-height"
        src="~assets/hangzhou__hokori.gif"
      />
      <q-img
        v-else
        class="rounded-borders col-12 full-height"
        src="~assets/hangzhou__mobile__hokori.gif"
      ></q-img>
    </div>
  </q-carousel-slide>
</template>
<script>
  export default {
    props: {
      name: Number,
      fullscreen: Boolean
    },
    name: 'sliderHokori2'
  };
</script>
