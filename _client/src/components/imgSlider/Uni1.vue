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
        >甜豆</a
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
        v-show="!fullscreen"
        class="rounded-borders col-6 full-height"
        src="~assets/tiandou__uni1.jpg"
      />
      <q-img
        :class="[
          'rounded-borders',
          'full-height',
          fullscreen ? 'col-12' : 'col-6'
        ]"
        :contain="fullscreen"
        src="~assets/tiandou__uni2.jpg"
      />
    </div>
    <div
      v-else
      class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
    >
      <q-img
        class="rounded-borders col-12 full-height"
        src="~assets/tiandou__uni1.jpg"
      />
    </div>
  </q-carousel-slide>
</template>
<script>
  export default {
    props: {
      name: Number,
      fullscreen: Boolean
    },
    name: 'sliderUni1'
  };
</script>
