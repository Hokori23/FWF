import axios from 'axios';
console.log(`当前环境 - ${process.env.DEV ? 'devlopment' : 'production'}`);
const API = axios.create({
  baseURL: process.env.DEV ? '/applier' : 'https://fwf.hokori.online/applier'
});
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
    API.post('/apply', payload)
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
    API.post('/edit', payload)
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
    API.get('/retrieve', {
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
    API.post('/delete', payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
export { apply, edit, retrieve, remove };
