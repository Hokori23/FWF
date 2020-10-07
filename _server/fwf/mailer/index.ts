// Dependencies
import moment from 'moment';
moment.locale('zh-cn');
const NODE_MAILER = require('nodemailer');

// 通用设置
const MAILER_OPTIONS = {
  secure: true,
  pool: true,
  maxConnections: 10,
  maxTryCount: 3,
  host: 'smtp.qq.com',
  port: 465,
  subject: 'FWF工作室申请邮件',
  auth: {
    user: 'hokori23@qq.com',
    pass: 'ltlyghxmqvipcagi'
  },
  from: {
    name: 'FWF工作室',
    address: 'hokori23@qq.com'
  },
  html: null
};

// 接收邮件的邮箱列表
const ACCEPTERS = [
  {
    to: {
      name: '无情小尘埃_Hokori',
      address: 'hokori23@qq.com'
    }
  },
  {
    to: {
      name: 'Joker',
      address: 'tony_xb@qq.com'
    }
  },
  {
    to: {
      name: '荍荍i',
      address: '675061026@qq.com'
    }
  }
];

/**
 *
 * @param { Object } content 模板内容
 * @description 广播邮件
 */
const broadcast = (content, template) => {
  const promiseArr = ACCEPTERS.map((v) => {
    // 添加to属性
    const OPTIONS = Object.assign(MAILER_OPTIONS, v);
    // 添加HTML文本内容
    OPTIONS.html = template(content);
    const transporter = NODE_MAILER.createTransport(OPTIONS);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await transporter.sendMail(OPTIONS);
        resolve(res);
      } catch (e) {
        send(content, v.to, template)
          .then((res) => {
            resolve(res);
          })
          .catch((e) => {
            reject(e);
          });
      }
    });
  });
  return Promise.all(promiseArr);
};

/**
 * @param { Object } content 模板内容
 * @param { Object } to 接收人
 * @param { Number } count 错误次数
 * @description 广播邮件
 */
const send = (content, to, template, count = 1, e?: any) => {
  return new Promise(async (resolve, reject) => {
    if (count > MAILER_OPTIONS.maxTryCount) {
      console.log(`
邮件发送失败，时间：${moment().format('llll')}
            `);
      reject(e);
      return;
    }
    console.log(
      `${to.to.name} <${to.to.address}>: 第 ${count} 次尝试重发邮件...`
    );
    // 添加to属性
    const OPTIONS = Object.assign(MAILER_OPTIONS, to);
    // 添加HTML文本内容
    OPTIONS.html = template(content);
    const transporter = NODE_MAILER.createTransport(OPTIONS);
    try {
      const res = await transporter.sendMail(OPTIONS);
      resolve(res);
    } catch (e) {
      count++;
      send(content, to, template, count, e)
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    }
  });
};

export { broadcast, send };
export default {
  broadcast,
  send
};
