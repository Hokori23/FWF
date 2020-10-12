<template>
  <div
    :class="[$q.screen.lt.md ? 'q-pa-md' : 'q-py-md']"
    :style="!$q.screen.lt.md ? { paddingLeft: '10%', paddingRight: '10%' } : {}"
  >
    <q-table
      :data="data"
      :pagination.sync="pagination"
      :columns="columns"
      row-key="id"
      color="primary"
      :loading="isLoading"
      :grid="$q.screen.lt.md"
      :hide-header="$q.screen.lt.md"
      :dense="$q.screen.lt.md"
      :table-style="{ minHeight: '80vh' }"
      :visible-columns="visibleColumns"
    >
      <template v-slot:top="props">
        <div
          :class="[
            $q.screen.gt.xs ? 'q-table__title col-2' : 'text-subtitle2 col-4'
          ]"
        >
          申请列表
        </div>

        <q-space />

        <div class="col" v-if="$q.screen.gt.xs">
          <q-toggle
            dense
            v-for="column of columns"
            :key="column.name"
            :val="column.name"
            :label="dictionary(column.name)"
            v-model="visibleColumns"
          />
        </div>
        <q-select
          v-else
          v-model="visibleColumns"
          multiple
          borderless
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          :style="{ minWidth: $q.screen.gt.md ? '150px' : '100px' }"
        />

        <q-btn
          flat
          round
          dense
          icon="refresh"
          @click="getApplication()"
          class="q-ml-md"
        />
        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            v-for="(key, index) in dictionaryKeys"
            :key="key"
            :props="props"
          >
            {{ columns[index].format(props.row[key]) }}
            <q-popup-edit
              v-model="props.row[key]"
              v-if="key === 'isPermitted'"
              buttons
              label-set="保存"
              label-cancel="取消"
              @save="editApplication(props.row, `${props.row.id}-${key}`)"
              :ref="`${props.row.id}-${key}`"
            >
              <template v-slot:title>
                <div class="text-subtitle1">
                  已拒: -1<br />
                  等待: 0<br />
                  实习: 1<br />
                  通过面试: 2
                </div>
              </template>
              <q-input v-model="props.row[key]" dense autofocus />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
  import moment from 'moment';
  moment.locale('zh-cn');
  import { mapActions } from 'vuex';
  const dictionary = {
    id: 'ID',
    name: '姓名',
    university: '大学或院校',
    school: '学院',
    major: '专业',
    grade: '年级',
    email: 'E-mail',
    qq: 'QQ',
    bio: '简介',
    site: '个人网站',
    position: '岗位',
    isInternship: '是否实习',
    isPermitted: '状态',
    createdAt: '申请时间',
    updatedAt: '最后修改时间'
  };
  export default {
    name: 'Admin',
    methods: {
      ...mapActions({
        retrieve: 'api/retrieve',
        edit: 'api/edit',
        remove: 'api/remove'
      }),
      notify(message, colorIndx = 0) {
        const color = ['positive', 'warning', 'error'];
        this.$q.notify({
          message,
          color: color[colorIndx],
          multiLine: true
        });
      },
      async getApplication() {
        try {
          this.isLoading = true;
          const res = await this.retrieve();
          const { code, message, data } = res;
          this.notify(message, Number(!!code));
          this.data = data;
        } catch (e) {
          this.notify(e.message, 2);
        }
        this.isLoading = false;
      },
      async editApplication(newApply, ref) {
        try {
          this.isLoading = true;
          console.log(newApply);
          const res = await this.edit(newApply);
          const { code, message, data } = res;
          this.notify(message, Number(!!code));
          code && this.$refs[ref][0].cancel();
        } catch (e) {
          this.notify(e.message, 2);
        }
        this.isLoading = false;
      },
      dictionary(key) {
        return dictionary[key];
      }
    },
    computed: {
      columns() {
        if (!this.data.length) {
          return [];
        }
        return Object.keys(this.data[0]).map((key, index) => {
          return key === 'id'
            ? {
                name: key,
                label: dictionary[key],
                require: true,
                align: 'left',
                field: key,
                format: (val) => `${val}`,
                sortable: true
              }
            : {
                name: key,
                label: dictionary[key],
                field: key,
                format: (val) => {
                  const formatter = {
                    createdAt: (val) => moment(val).format('llll'),
                    updatedAt: (val) => moment(val).format('llll'),
                    isPermitted: (val) => {
                      const status = {
                        '-1': '已拒',
                        0: '等待',
                        1: '实习',
                        2: '通过'
                      };
                      return status[val];
                    },
                    isInternship: (val) => (val === 0 ? '实习' : '面试'),
                    grade: (val) => {
                      const grade = {
                        1: '大一',
                        2: '大二'
                      };
                      return grade[val];
                    }
                  };
                  return formatter[key] ? formatter[key](val) : val ? val : '---';
                },
                sortable: key === 'createdAt' || key === 'updatedAt',
                sort: (a, b) => {
                  const a_time = new Date(a).getTime();
                  const b_time = new Date(b).getTime();
                  return a_time - b_time;
                }
              };
        });
      },
      dictionaryKeys() {
        return Object.keys(dictionary);
      }
    },
    data() {
      return {
        data: [],
        visibleColumns: [],
        pagination: {
          sortBy: 'createdAt',
          descending: true,
          page: 1,
          rowsPerPage: 20
        },
        isLoading: false
      };
    },
    mounted() {
      this.visibleColumns = Object.keys(dictionary);
      this.getApplication();
    }
  };
</script>
<style scoped>
</style>
