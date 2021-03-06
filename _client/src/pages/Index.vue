<template>
  <q-page
    :class="[
      { 'q-pa-md': $q.screen.gt.xs },
      !$q.screen.gt.xs ? 'sm-screen' : 'lg-screen',
      'home-container'
    ]"
    :style="`padding-bottom: ${$q.screen.gt.xs ? '48' : '250'}px`"
  >
    <!-- 背景 -->
    <div
      v-if="$q.dark.isActive"
      :style="`
        position: fixed;
        content: '';
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        background-image: url(${
          $q.screen.gt.xs
            ? 'https://upyun.hokori.online/image/halloween1.jpg'
            : 'https://upyun.hokori.online/image/halloween2-mb.jpg'
        });
        background-size: contain;
        background-attachment: fixed;
        background-position: ${$q.screen.gt.xs ? 'center' : 'top'};
        z-index: -99;
        filter: brightness(${brightness * 0.75}%);
    `"
    />
    <div
      v-else
      style="
        position: fixed;
        content: '';
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        z-index: -99;
        filter: brightness(${brightness - 20}%);
      "
    />
    <div class="row justify-center items-center">
      <div
        v-html="
          $markdownIt.render(
            $q.screen.gt.xs ? `### ${intro.title}` : `#### ${intro.title}`
          )
        "
        :class="[$q.dark.isActive ? 'text-white' : 'text-primary']"
      />
      <q-btn
        dense
        round
        :class="$q.screen.gt.xs ? 'q-ml-xl' : 'q-ml-md'"
        :icon="dark ? 'fas fa-hat-wizard' : 'brightness_5'"
        color="primary"
        @click="darken"
      >
        <q-popup-proxy context-menu>
          <q-banner
            dense
            :style="$q.screen.gt.xs ? {} : { width: '80vw' }"
            :class="$q.screen.gt.xs ? 'q-py-xl' : 'q-px-lg'"
          >
            <q-slider
              :vertical="$q.screen.gt.xs"
              :reverse="$q.screen.gt.xs"
              v-model="brightness"
              :min="0"
              :max="100"
            />
          </q-banner>
        </q-popup-proxy>
      </q-btn>
    </div>
    <q-card class="q-mx-xll">
      <q-tabs
        v-model="tab"
        :dense="$q.screen.lt.xs"
        class="text-grey"
        active-color="primary"
        indicator-color="gray"
        align="justify"
        narrow-indicator
      >
        <q-tab
          v-for="tabKey of tabKeys"
          :key="tabKey"
          :name="tabKey"
          :label="tabKeyDictionary(tabKey)"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel
          v-for="tabKey of tabKeys"
          :key="tabKey"
          :name="tabKey"
          :class="[
            { 'q-px-xl': $q.screen.gt.xs },
            $q.screen.gt.xs ? 'q-py-xl' : 'q-py-lg'
          ]"
        >
          <!-- markdown content -->
          <div
            v-if="tabKey !== 'intro'"
            v-html="$markdownIt.render(intro[tabKey])"
          />
          <!-- intro detail -->
          <div v-else>
            <q-banner class="text-primary" :dense="$q.screen.lt.md" rounded>
              <span class="text-h4">Why FWF？</span>
            </q-banner>
            <q-img
              v-if="!$q.dark.isActive"
              src="~assets/00FWFBlue-AlphaBG.png"
              contain
              class="q-mt-md q-mb-lg"
              :style="`height:${$q.screen.gt.md ? '100px' : '70px'};`"
            />
            <q-img
              v-else
              src="~assets/00FWFWhite-AlphaBG.png"
              contain
              class="q-mt-md q-mb-lg"
              :style="`height:${$q.screen.gt.md ? '100px' : '70px'};`"
            />
            <p>
              FWF 是一个专注于Web技术的工作室( 隶属于404俱乐部，非院校社团 )
              ，致力于打造良好的技术交流氛围。
            </p>
            <p>
              在这里，你可以与志同道合的人一起学习技术、开发项目、获得提升。
            </p>
            <br />
            <q-banner class="text-primary" :dense="$q.screen.lt.md" rounded>
              <h5 class="text-h5 q-mb-lg">关于我们</h5>
            </q-banner>

            <ImgSlider
              :dark="dark"
              :brightness.sync="brightness"
              @darken="darken"
            />
            <div
              :class="[
                'text-caption',
                'row',
                'justify-end',
                'text-grey',
                $q.screen.gt.md
                  ? 'q-mx-md q-mt-md q-mb-xl'
                  : 'q-mx-sm q-mt-sm q-mb-lg'
              ]"
            >
              作品顺序随机打乱不分先后
            </div>
            <q-banner class="text-primary" :dense="$q.screen.lt.md" rounded>
              <h5 class="text-h5 q-mb-lg">欢迎加入</h5>
            </q-banner>
            <span class="text-subtitle2 text-weight-bolder q-ml-lg">
              FWF
              是一个初步成立的大学生工作室，我们有着很好的项目点子等着你实现，我们期待你的加入。
            </span>
            <div class="row justify-center q-my-xl">
              <q-img
                v-if="$q.dark.isActive"
                src="~assets/LittleFWhite-Alpha256x.gif"
                :style="`height: ${$q.screen.lt.md ? '80' : '100'}px`"
                contain
              />
              <q-img
                v-else
                src="~assets/LittleFBlue-Alpha256x.gif"
                :style="`height: ${$q.screen.lt.md ? '80' : '100'}px`"
                contain
              />
            </div>
          </div>
          <div
            :class="[
              'row',
              $q.screen.gt.xs && tabKey === 'internship'
                ? 'justify-start'
                : 'justify-center'
            ]"
          >
            <q-btn
              color="primary"
              label="点击申请实习"
              :class="[$q.screen.gt.xs ? 'q-my-md' : 'q-mt-xs']"
              v-if="tabKey === 'internship'"
              @click="applyPopup(tabKey)"
            />
            <q-btn
              color="primary"
              label="点击申请面试"
              :class="[$q.screen.gt.xs ? 'q-my-md' : 'q-mt-xs']"
              v-else-if="tabKey === 'regular'"
              @click="applyPopup(tabKey)"
            />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
  import intro from 'assets/fwf_intro';
  import ApplyDialog from 'components/applyDialog';
  import ImgSlider from 'components/imgSlider/index.vue';
  import { mapActions, mapMutations, mapState } from 'vuex';
  import { colors } from 'quasar';
  export default {
    name: 'Index',
    components: {
      ImgSlider
    },
    watch: {
      brightness(val) {
        this.setBrightness(val);
      }
    },
    computed: {
      tabKeys() {
        const keys = Object.keys(this.intro).filter((key) => {
          return key !== 'title';
        });
        this.tab = keys[0];
        return keys;
      },
      ...mapState({
        dark: 'dark'
      })
    },
    data() {
      return {
        intro,
        tab: '',
        primaryColor: '#1976D2',
        warningColor: '#F2C037',
        brightness: 100
      };
    },
    methods: {
      ...mapActions({ apply: 'applier/apply' }),
      ...mapMutations({ setBrightness: 'setBrightness', setDark: 'setDark' }),
      tabKeyDictionary(key) {
        const dictionary = {
          intro: 'FWF简介',
          internship: '实习成员纳新',
          regular: '正式成员纳新',
          about_us: '关于我们'
        };
        return dictionary[key];
      },
      notify(message, colorIndx = 0) {
        const color = ['positive', 'warning', 'error'];
        this.$q.notify({
          message,
          color: color[colorIndx],
          multiLine: true
        });
      },
      confirmDialog(message, title = null, cb) {
        this.$q
          .dialog({
            title,
            message,
            ok: '确定'
          })
          .onDismiss(() => {
            cb && cb();
          });
      },
      /**
       * @param { string } tabKey
       * @description tabKey : [ 'internship', 'regular' ]
       */
      applyPopup(tabKey) {
        this.$q
          .dialog({
            component: ApplyDialog,
            parent: this,
            tabKey
          })
          .onOk(async ({ vm, applier }) => {
            try {
              vm.loading(true);
              const res = await this.apply(applier);
              const { code, message } = res;
              if (!code) {
                this.confirmDialog(
                  '申请结果将会以邮件形式通知，请耐心等待喔~',
                  '提交成功',
                  vm.hide
                );
              } else if (code == 98) {
                this.confirmDialog(message, '不要急噢', vm.hide);
              } else {
                this.notify(message, 1);
              }
            } catch (e) {
              this.notify(e.message, 2);
            }
            vm.loading(false);
          });
      },
      darken() {
        const dark = !this.dark;
        this.setDark({ vm: this, dark });
        dark
          ? (this.brightness = this.brightness > 80 ? 80 : this.brightness) // 防止过亮
          : // : (this.brightness = this.brightness < 95 ? 95 : this.brightness); // 防止过暗
            (this.brightness = 100);
      }
    }
  };
</script>

<style lang="scss">
  .home-container {
    h1,
    h2,
    h4,
    h5,
    h6 {
      margin-top: 0;
    }
  }
  .sm-screen {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0.5em 0 1em 0;
    }
    h4 {
      margin-top: 1em;
    }
    ul {
      padding-inline-start: 2em;
    }
  }
  .lg-screen {
    .q-mx-xll {
      margin-left: 25%;
      margin-right: 25%;
    }
  }
  hr {
    color: $primary;
    border-bottom-color: $primary;
  }
  .q-dark hr {
    color: $warning;
    border-bottom-color: $warning;
  }
</style>
