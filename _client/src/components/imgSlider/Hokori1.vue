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
        href="https://assignment.hokori.online/login"
        target="_blank"
        class="text-subtitle2 text-primary text-bold text-center"
        >公共作业板</a
      >
      <span class="text-gray q-mx-sm">-</span>
      <span class="text-caption text-gray">
        By
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
        :class="[
          'rounded-borders',
          'full-height',
          $q.screen.gt.md ? 'col-3' : 'col-6'
        ]"
        :contain="$q.screen.gt.md"
        src="~assets/assignment-login__hokori.gif"
      />
      <q-img
        :class="[
          'rounded-borders',
          'full-height',
          $q.screen.gt.md ? 'col-9' : 'col-6'
        ]"
        src="~assets/assignment-index__hokori.jpg"
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
    name: 'sliderHokori1'
  };
</script>
