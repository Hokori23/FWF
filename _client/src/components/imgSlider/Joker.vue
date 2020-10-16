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
        >优乐电商仿站</a
      >
      <span class="text-gray q-mx-sm">-</span>
      <span class="text-caption text-gray">
        By
        <a
          href="https://tonyxb.github.io/"
          target="_blank"
          style="color: inherit"
        >
          Joker
        </a>
      </span>
    </div>
    <div
      class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
    >
      <q-img
        class="rounded-borders col-12 full-height"
        src="~assets/shop__joker.jpg"
        :contain="$q.screen.gt.md"
      />
    </div>
  </q-carousel-slide>
</template>
<script>
  export default {
    props: {
      name: Number
    },
    name: 'sliderJoker'
  };
</script>
