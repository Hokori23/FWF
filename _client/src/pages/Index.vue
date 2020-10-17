<template>
  <!-- <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg" />
  </q-page> -->
  <q-page
    :class="[
      { 'q-ma-md': $q.screen.gt.xs },
      !$q.screen.gt.xs ? 'sm-screen' : 'lg-screen',
      'home-container'
    ]"
  >
    <div
      v-html="
        $markdownIt.render(
          $q.screen.gt.xs ? `### ${intro.title}` : `#### ${intro.title}`
        )
      "
      class="text-center text-primary"
    />
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
              src="~assets/00FWFBlue-WhiteBG480x.png"
              contain
              class="q-mt-md q-mb-lg"
              :style="`height:${$q.screen.gt.md ? '100px' : '70px'};`"
            />
            <p>
              FWF 是一个专注于Web技术的工作室( 隶属于404工作室，非院校社团 )
              ，致力于打造良好的技术交流氛围。
            </p>
            <p>
              在这里，你可以与志同道合的人一起学习技术、开发项目、获得提升。
            </p>
            <br />
            <q-banner class="text-primary" :dense="$q.screen.lt.md" rounded>
              <h5 class="text-h5 q-mb-lg">关于我们</h5>
            </q-banner>

            <ImgSlider />
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
            <p class="text-h6"></p>
            <q-banner
              class="bg-primary text-white"
              :dense="$q.screen.lt.md"
              rounded
              style="position: relative"
            >
              <span class="text-subtitle2">
                FWF
                是一个初步成立的大学生工作室，我们有着很好的项目点子等着你实现，我们期待你的加入。
              </span>
            </q-banner>
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
  import { mapActions } from 'vuex';
  export default {
    name: 'Index',
    components: {
      ImgSlider
    },
    computed: {
      tabKeys() {
        const keys = Object.keys(this.intro).filter((key) => {
          return key !== 'title';
        });
        this.tab = keys[0];
        return keys;
      }
    },
    data() {
      return {
        intro,
        tab: ''
      };
    },
    methods: {
      ...mapActions({ apply: 'api/apply' }),
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
</style>
