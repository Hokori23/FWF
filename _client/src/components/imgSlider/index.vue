<template>
  <q-carousel
    v-model="slide"
    transition-prev="slide-right"
    transition-next="slide-left"
    swipeable
    animated
    control-color="primary"
    navigation
    padding
    arrows
    :dark="dark"
    :fullscreen.sync="fullscreen"
    class="shadow-2 rounded-borders"
  >
    <component
      v-for="(currComponent, idx) of sliders"
      :key="idx"
      :is="currComponent"
      :name="idx"
      :fullscreen="fullscreen"
    />

    <template v-slot:control>
      <q-carousel-control position="bottom-right" :offset="[18, 18]">
        <q-btn
          v-if="fullscreen"
          dense
          round
          :class="$q.screen.gt.xs ? 'q-mr-md' : 'q-mr-sm'"
          :icon="dark ? 'fas fa-hat-wizard' : 'brightness_5'"
          :color="$q.dark.isActive ? 'black' : 'white'"
          text-color="primary"
          @click="$emit('darken')"
        >
        </q-btn>
        <q-btn
          v-if="$q.screen.gt.md"
          round
          dense
          :color="$q.dark.isActive ? 'black' : 'white'"
          text-color="primary"
          :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="fullscreen = !fullscreen"
        />
      </q-carousel-control>
    </template>
  </q-carousel>
</template>
<script>
  import Hokori1 from './Hokori1';
  import Hokori2 from './Hokori2';
  import Leslie from './Leslie';
  import Joker from './Joker';
  import Uni1 from './Uni1';
  import Uni2 from './Uni2';
  export default {
    name: 'imgSlider',
    props: {
      dark: Boolean,
      brightness: Number
    },
    data() {
      return {
        slide: 0,
        fullscreen: false,
        sliders: [Hokori1, Hokori2, Leslie, Joker, Uni1, Uni2]
      };
    },
    methods: {
      shuffleArr(arr) {
        for (let i = 0, len = arr.length; i < len; i++) {
          let currentRandom = parseInt(Math.random() * (len - 1));
          let current = arr[i];
          arr[i] = arr[currentRandom];
          arr[currentRandom] = current;
        }
      }
    },
    mounted() {
      this.shuffleArr(this.sliders);
    }
  };
</script>
<style lang="scss" scoped>
</style>
