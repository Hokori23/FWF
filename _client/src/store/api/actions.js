import axios from 'axios';
console.log(`开发环境 - ${process.env.DEV ? 'devlopment' : 'production'}`);
if (process.env.DEV) {
  axios.defaults.baseURL = '/api';
} else {
  axios.defaults.baseURL = 'https://fwf.hokori.online/api';
}
/**
 * @path /apply
 * @param { Applier } applier
    !checkIntegrity(applier, [
      'name',
      'university',
      'school',
      'major',
      'grade',
      'email',
      'qq',
      'isInternship'
    ])
 */
const apply = ({ commit, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/apply', payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

/**
 * 编辑
 * @path /edit
 * @param { Applier } applier
 */
const edit = ({ commit, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/edit', payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

/**
 * 遍历用户
 * @path /retrieve
 * @param page
 * @param capacity
 * @param ?isASC
 */
const retrieve = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios
      .get('/retrieve', {
        params
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

/**
 * @path /delete
 * @param { number } id
 */
const remove = ({ commit, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/delete', payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
export { apply, edit, retrieve, remove };
