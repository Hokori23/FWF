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
      <a class="text-subtitle2 text-primary text-bold text-center"
        >刷脸课堂考勤系统（华北五省）</a
      >
      <span class="text-gray q-mx-sm">-</span>
      <span class="text-caption text-gray">
        By
        <a
          href="https://www.isleslie.com/"
          target="_blank"
          style="color: inherit"
        >
          Leslie
        </a>
      </span>
    </div>
    <div
      v-if="$q.screen.gt.md"
      class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
    >
      <q-img
        class="rounded-borders col-3 full-height"
        src="~assets/system__leslie1.jpg"
        contain
      />
      <q-img
        class="rounded-borders col-9 full-height"
        src="~assets/system__leslie3.jpg"
        contain
      />
    </div>
    <div
      v-else
      class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
    >
      <q-img
        class="rounded-borders col-6 full-height"
        src="~assets/system__leslie1.jpg"
      />
      <q-img
        class="rounded-borders col-6 full-height"
        src="~assets/system__leslie2.jpg"
      />
    </div>
  </q-carousel-slide>
</template>
<script>
  export default {
    props: {
      name: Number
    },
    name: 'sliderLeslie'
  };
</script>
