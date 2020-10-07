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
          <div v-html="$markdownIt.render(intro[tabKey])" />
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
              v-if="tabKey === 'regular'"
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
  import { mapActions } from 'vuex';
  export default {
    name: 'PageIndex',
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
          regular: '正式成员纳新'
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
                this.$q
                  .dialog({
                    title: '提交成功',
                    message: '申请结果将会以邮件形式通知，请耐心等待喔~'
                  })
                  .onDismiss(() => {
                    vm.hide();
                  });
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
