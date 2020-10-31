<template>
  <q-layout
    view="lHh Lpr lFf"
    :style="`filter: brightness(${brightness}%); min-height: 100vh; overflow: ${
      show ? '' : 'hidden'
    }`"
  >
    <transition-group
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      appear
      mode="out-in"
    >
      <canvas
        id="canvas"
        :key="'canvas'"
        v-if="!show && section === 'counting'"
        style="position: absolute"
      />
      <q-page-container
        :key="'404wefound'"
        v-if="!show && section === 'interlude'"
        class="bg-black row justify-center items-center non-selectable"
        style="height: 100vh"
      >
        <h1 class="text-primary text-bold">We Are 404</h1>
      </q-page-container>
      <q-page-container :key="1" class="non-selectable">
        <q-page
          v-if="!show && section === 'final'"
          class="column justify-center items-center"
        >
          <div>
            <q-img
              v-if="!$q.dark.isActive"
              src="~assets/00FWFBlue-AlphaBG.png"
              contain
              :style="`width:${$q.screen.gt.md ? '480px' : '80vw'};`"
            />
            <q-img
              v-else
              src="~assets/00FWFOrange-AlphaBG.png"
              contain
              :style="`width:${$q.screen.gt.md ? '480px' : '80vw'};`"
            />
          </div>
          <div
            :class="[
              'text-primary q-mb-md',
              $q.screen.gt.md ? 'text-h3' : 'text-h4'
            ]"
          >
            FWF 工作室
          </div>
          <div
            :class="[
              'text-primary subtitle--hover',
              $q.screen.gt.md ? 'subtitle1' : 'subtitle2'
            ]"
            @click="showOn"
          >
            <span class="q-px-md animation_fade2">&gt;</span>
            <span class="q-px-md animation_fade1">CLICK TO ENTER</span>
            <span class="q-px-md animation_fade2">&lt;</span>
          </div>

          <q-btn
            dense
            round
            :class="$q.screen.gt.xs ? 'q-ml-xl' : 'q-ml-md'"
            :icon="$q.dark.isActive ? 'fas fa-hat-wizard' : 'brightness_5'"
            color="primary"
            style="position: absolute; right: 20px; top: 20px"
            @click.stop="darken"
          />
        </q-page>
      </q-page-container>
      <q-page-container v-if="show" :key="2">
        <router-view />
      </q-page-container>
    </transition-group>
  </q-layout>
</template>

<script>
  import Clock from 'assets/js/Clock';
  import { mapState, mapMutations } from 'vuex';
  import { colors } from 'quasar';
  export default {
    name: 'MainLayout',
    watch: {
      section(val) {
        if (val === 'interlude') {
          setTimeout(() => {
            this.section = 'final';
            this.setBrightness(85);
          }, 5000);
        }
      }
    },
    data() {
      return {
        show: this.$route.path === '/' ? false : true,
        primaryColor: '#1976D2',
        warningColor: '#F2C037',
        mouseHover: false,
        section: 'counting',
        timer: 1,
        startTime: '2020-10-31 19:20:00'
      };
    },
    computed: mapState({
      brightness: 'brightness',
      dark: 'dark'
    }),
    methods: {
      ...mapMutations({ setBrightness: 'setBrightness', setDark: 'setDark' }),
      showOn() {
        this.show = true;
      },
      darken() {
        const dark = !this.dark;
        this.setDark({ vm: this, dark });
        dark ? this.setBrightness(80) : this.setBrightness(100);
      }
    },
    mounted() {
      this.darken();
      const endDate = new Date(this.startTime).getTime();
      const nowDate = new Date().getTime();
      if (endDate > nowDate) {
        Clock.init('canvas', this);
        this.setBrightness(100);
        this.darken();
      } else {
        this.timer = null;
        this.section = 'final';
      }
      // this.timer = null;
    }
  };
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
  .animation_fade1 {
    animation: fadeInAndOut 3s ease-in-out infinite;
  }
  .animation_fade2 {
    animation: fadeInAndOut 2s ease-in-out 0.5s infinite;
  }

  @keyframes fadeInAndOut {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .subtitle--hover {
    transition: transform 0.2s ease-in-out, filter 0.2s ease-in,
      background-color 0.2s ease-in;
    border-radius: 2px;
    cursor: pointer;
    animation: flow 2s ease-in-out infinite;
    &:hover {
      position: relative;
      animation: twinkle 0.25s ease-in-out forwards,
        twinkle 1s ease-in-out 0.25s infinite;
      background-color: rgba(255, 255, 255, 0);
      filter: brightness(1);
      transform: scale(1.1);
      overflow: hidden;
      .animation_fade1,
      .animation_fade2 {
        animation: unset;
      }
      &::after {
        position: absolute;
        content: '';
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        transform: rotate(45deg) translate(-50%, 450%);
        background-color: rgba(255, 255, 255, 0.3);
        border: 4px solid rgba(255, 255, 255, 0.2);
        animation: twinkle__move 1s ease-in-out 0.25s infinite;
      }
    }
    &:active {
      animation: unset !important;
      transform: scale(0.9);
    }
  }
  .body--light .subtitle--hover {
    &:hover {
      background-color: rgba(25, 118, 210, 0);
      animation: twinkle__light 0.25s ease-in-out forwards,
        twinkle__light 1s ease-in-out 0.25s infinite;
    }
    &::after {
      background-color: rgba(25, 118, 210, 0.3);
      border: 4px solid rgba(25, 118, 210, 0.2);
    }
  }

  @keyframes twinkle {
    0% {
      filter: brightness(1);
      background-color: rgba(255, 255, 255, 0);
    }
    25% {
      filter: brightness(1.2);
      background-color: rgba(255, 255, 255, 0.5);
    }
    100% {
      filter: brightness(1);
      background-color: rgba(255, 255, 255, 0);
    }
  }
  @keyframes twinkle__light {
    0% {
      filter: brightness(1);
      background-color: rgba(25, 118, 210, 0);
    }
    25% {
      filter: brightness(1.2);
      background-color: rgba(25, 118, 210, 0.5);
    }
    100% {
      filter: brightness(1);
      background-color: rgba(25, 118, 210, 0);
    }
  }
  @keyframes flow {
    0% {
      transform: scale(1.1) translateY(0px);
    }
    12.5% {
      transform: scale(1.1) translateY(-2px);
    }
    62.5% {
      transform: scale(1.1) translateY(2px);
    }
    100% {
      transform: scale(1.1) translateY(0px);
    }
  }
  @keyframes twinkle__move {
    0% {
      transform: rotate(45deg) translate(-50%, 450%);
    }
    100% {
      transform: rotate(45deg) translate(50%, -450%);
    }
  }
</style>
