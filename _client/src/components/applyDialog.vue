<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-form @submit="onOKClick">
        <q-card-section>
          <div
            :class="[
              $q.screen.lt.md ? 'text-subtitle1 text-bold' : 'text-h5',
              'q-mb-md',
              'q-px-sm',
              'text-primary'
            ]"
          >
            {{ `${tabKey === 'internship' ? '申请实习' : '申请面试'}` }}
          </div>
          <q-input
            clearable
            v-model="applier.name"
            :outlined="$q.screen.gt.xs"
            :dense="$q.screen.lt.md"
            label="姓名*"
            :class="[$q.screen.lt.md ? 'q-mb-xs' : 'q-mb-md']"
            :rules="[
              (val) => !!val || '姓名不能为空',
              (val) => val.length >= 2 || '姓名最短长度为2字符',
              (val) => val.length <= 10 || '姓名最大长度为10字符'
            ]"
            lazy-rules
          >
            <template v-slot:prepend>
              <q-icon name="person" color="primary" /> </template
          ></q-input>
          <q-select
            v-model="applier.university"
            :options="universitys"
            :outlined="$q.screen.gt.xs"
            :dense="$q.screen.lt.md"
            label="大学或院校*"
            :class="[$q.screen.lt.md ? 'q-mb-xs' : 'q-mb-md']"
            :transition-show="transitionShow"
            :transition-hide="transitionHide"
            :rules="[(val) => !!val || '大学或院校不能为空']"
            lazy-rules
          />
          <q-select
            v-model="applier.school"
            :options="schools"
            :outlined="$q.screen.gt.xs"
            :dense="$q.screen.lt.md"
            :disable="!applier.university"
            label="学院*"
            :class="[$q.screen.lt.md ? 'q-mb-xs' : 'q-mb-md']"
            :transition-show="transitionShow"
            :transition-hide="transitionHide"
            :rules="[(val) => !!val || '学院不能为空']"
            lazy-rules
          />
          <q-select
            v-model="applier.major"
            :options="majors"
            :outlined="$q.screen.gt.xs"
            :dense="$q.screen.lt.md"
            :disable="!applier.school"
            label="专业*"
            :class="[$q.screen.lt.md ? 'q-mb-xs' : 'q-mb-md']"
            :transition-show="transitionShow"
            :transition-hide="transitionHide"
            :rules="[(val) => !!val || '专业不能为空']"
            lazy-rules
          />
          <q-select
            v-model="applier.grade"
            :options="grades"
            :outlined="$q.screen.gt.xs"
            :dense="$q.screen.lt.md"
            label="年级*"
            :class="[$q.screen.lt.md ? 'q-mb-xs' : 'q-mb-md']"
            :transition-show="transitionShow"
            :transition-hide="transitionHide"
            :rules="[(val) => !!val || '年级不能为空']"
            lazy-rules
          />
          <q-select
            v-model="applier.position"
            :options="positions"
            :outlined="$q.screen.gt.xs"
            :dense="$q.screen.lt.md"
            :label="`${
              this.tabKey === 'internship' ? '学习方向' : '面试方向'
            }*`"
            :class="[$q.screen.lt.md ? 'q-mb-xs' : 'q-mb-md']"
            :transition-show="transitionShow"
            :transition-hide="transitionHide"
            :rules="[
              (val) =>
                !!val ||
                `${
                  this.tabKey === 'internship' ? '学习方向' : '面试方向'
                }不能为空`
            ]"
            lazy-rules
          />
          <q-input
            clearable
            v-model="applier.email"
            :outlined="$q.screen.gt.xs"
            :dense="$q.screen.lt.md"
            label="邮箱*"
            :class="[$q.screen.lt.md ? 'q-mb-xs' : 'q-mb-md']"
            :rules="[
              (val) => !!val || '邮箱不能为空',
              (val) =>
                /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(
                  val
                ) || '请输入正确的邮箱格式'
            ]"
            lazy-rules
          >
            <template v-slot:prepend>
              <q-icon name="email" color="primary" /> </template
          ></q-input>
          <q-input
            clearable
            v-model="applier.qq"
            :outlined="$q.screen.gt.xs"
            :dense="$q.screen.lt.md"
            label="QQ*"
            :class="[$q.screen.lt.md ? 'q-mb-xs' : 'q-mb-md']"
            :rules="[
              (val) => !!val || 'QQ不能为空',
              (val) => /\d{5,12}/g.test(val) || '请输入正确的QQ格式'
            ]"
            lazy-rules
          >
            <template v-slot:prepend>
              <q-icon name="chat" color="primary" /> </template
          ></q-input>
          <q-input
            clearable
            v-model="applier.bio"
            :outlined="$q.screen.gt.xs"
            :dense="$q.screen.lt.md"
            label="个人简介"
            :class="[$q.screen.lt.md ? 'q-mb-xs' : 'q-mb-md']"
            :input-style="{ minHeight: $q.screen.lt.md ? '80px' : '150px' }"
            hint="详细介绍下自己，让我们更了解你！"
            autogrow
          >
            <template v-slot:prepend>
              <q-icon name="thumb_up" color="primary" /> </template
          ></q-input>
          <q-input
            clearable
            v-model="applier.site"
            :outlined="$q.screen.gt.xs"
            :dense="$q.screen.lt.md"
            label="个人网站 / 主页"
            hint="http(s)://example.com"
            :class="[$q.screen.lt.md ? 'q-mb-xs' : 'q-mb-md']"
            :rules="[
              (val) =>
                !val
                  ? true
                  : /(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/.test(
                      val
                    ) || '请输入正确网站格式'
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="home" color="primary" /> </template
          ></q-input>
        </q-card-section>

        <!-- 按钮示例 -->
        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="提交申请"
            type="submit"
            class="q-mr-xs"
            :loading="isLoading"
          />
          <q-btn
            color="primary"
            label="取消申请"
            @click="onCancelClick"
            :loading="isLoading"
          />
        </q-card-actions>
      </q-form>
      <q-inner-loading :showing="isLoading">
        <q-spinner color="primary" size="3em" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<script>
  import schools from 'assets/schools';
  export default {
    name: 'applayDialog',
    props: {
      // ...你自定义的属性
      tabKey: {
        type: String,
        required: true
      }
    },
    computed: {
      universitys() {
        return schools.universitys.map((university) => {
          return university.name;
        });
      },
      schools() {
        return schools.universitys
          .filter((university) => {
            return university.name === this.applier.university;
          })[0]
          ?.school_and_majoritys.map((school_and_majority) => {
            return school_and_majority.school;
          });
      },
      majors() {
        return schools.universitys
          .filter((university) => {
            return university.name === this.applier.university;
          })[0]
          ?.school_and_majoritys.filter((school_and_majority) => {
            return school_and_majority.school === this.applier.school;
          })[0]?.majority;
      },
      positions() {
        const positionObj = {
          internship: ['前端', '后端', '还没确定'],
          regular: ['运营', '策划', '运维', '前端', '后端']
        };
        return positionObj[this.tabKey];
      }
    },
    watch: {
      'applier.university': {
        handler() {
          this.applier.school = this.applier.major = '';
        }
      },
      'applier.school': {
        handler() {
          this.applier.major = '';
        }
      }
    },
    data() {
      return {
        isLoading: false,
        applier: {
          name: '',
          university: '',
          school: '',
          major: '',
          grade: '',
          email: '',
          qq: '',
          bio: '',
          site: '',
          position: '',
          isInternship: this.tabKey === 'internship'
        },
        grades: [
          {
            value: 1,
            label: '大一'
          },
          {
            value: 2,
            label: '大二'
          }
        ],
        transitionShow: 'flip-up',
        transitionHide: 'flip-down'
      };
    },

    methods: {
      // 以下方法是必需的
      // (不要改变它的名称 --> "show")
      show() {
        this.$refs.dialog.show();
      },

      // 以下方法是必需的
      // (不要改变它的名称 --> "hide")
      hide() {
        this.$refs.dialog.hide();
      },

      onDialogHide() {
        // QDialog发出“hide”事件时
        // 需要发出
        this.$emit('hide');
      },

      onOKClick() {
        const newApplier = { ...this.applier, grade: this.applier.grade.value };
        // 按OK，在隐藏QDialog之前
        // 发出“ok”事件（带有可选的有效负载）
        // 是必需的
        this.$emit('ok', {
          vm: this,
          applier: newApplier
        });
        // 或带有有效负载：this.$emit('ok', { ... })
      },
      loading(isLoading) {
        this.isLoading = isLoading;
      },
      onCancelClick() {
        // 我们只需要隐藏对话框
        this.hide();
      }
    }
  };
</script>
