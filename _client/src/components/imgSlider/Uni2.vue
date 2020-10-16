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
        href="https://github.com/Unicorn-NightFury/Front-end-aesthetics"
        target="_blank"
        class="text-subtitle2 text-primary text-bold text-center"
        >Extreme</a
      >
      <span class="text-gray q-mx-sm">-</span>
      <span class="text-caption text-gray">
        By
        <a href="https://cocotea.life/" target="_blank" style="color: inherit">
          Uni
        </a>
      </span>
    </div>
    <div
      v-if="$q.screen.gt.md"
      class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
    >
      <q-img
        class="rounded-borders col-4 full-height"
        src="~assets/extreme__uni1.jpg"
        contain
      />
      <q-img
        class="rounded-borders col-4 full-height"
        src="~assets/extreme__uni2.jpg"
        contain
      />
      <q-img
        class="rounded-borders col-4 full-height"
        src="~assets/extreme__uni3.jpg"
        contain
      />
    </div>
    <div
      v-else
      class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
    >
      <q-img
        class="rounded-borders col-6 full-height"
        src="~assets/extreme__uni1.jpg"
      />
      <q-img
        class="rounded-borders col-6 full-height"
        src="~assets/extreme__uni3.jpg"
      />
    </div>
  </q-carousel-slide>
</template>
<script>
  export default {
    props: {
      name: Number
    },
    name: 'sliderUni2'
  };
</script>
