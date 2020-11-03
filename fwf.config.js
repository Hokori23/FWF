const config = {
  // /**
  //  *
  //  * 博客配置
  //  *
  //  */
  // blogConfig: {
  //   // 博客名
  //   blogName: 'BlogName',

  //   // 博客简述
  //   blogBio: 'BlogBio',

  //   // 博主名
  //   bloggerName: 'Blogger',

  //   // 部署时的公共路径
  //   publicPath: 'https://example.com/',

  //   // 插件
  //   plugins: []
  // },

  /**
   *
   * 后端配置
   *
   */
  serverConfig: {
    port: '8003',
    crypto: {
      // 每次分段加密的字符串最大长度（优先度高于cryptCount字段）
      onceCryptLength: 5,
      // 一次加密至多分段几次加密
      cryptCount: 5,
      // 返回值格式
      // 如果提供了 encoding，则返回字符串，否则返回 Buffer
      // 可选值：['hex', 'Base64', ...]
      digest: 'hex',
      // 用于cipher对称加密生成密钥的密码
      password: 'test'
    },
    jwtConfig: {
      // 密钥
      key: 'test',

      // 过期时间(单位:秒)
      expiresTime: 60 * 60 * 24 * 3
      // expiresTime: 1
    },
    // 主机
    host:
      // "https://api.hokori.online" ||
      'http://localhost/',
    // 完整URL为： nginx配置下的转发路径 `${location}`
    // baseURL: "/geekblog" || ""
    baseURL: ''
  },

  /**
   *
   * 数据库配置
   *
   */
  dataBaseConfig: {
    // 数据库名
    database: 'fwf',

    // 数据库账号
    user: 'fwf',

    // 密码
    password: '',

    // options
    options: {
      // 数据库类别
      dialect: 'mysql',

      // 主机，如IP 或 'localhost'
      host: '101.201.239.229',

      // 端口, MySQL默认端口3306
      port: '3306',

      // 字符集
      charset: 'utf8mb4',

      // 连接池
      pool: {
        max: 20,
        min: 1,
        idle: 30000,
        acquire: 60000
      },

      // 时区
      timezone: '+08:00'
    }
  },

  /**
   *
   * 邮箱设置
   *
   */
  mailerConfig: {
    secure: true,
    pool: true,
    maxConnections: 10,
    maxTryCount: 3,
    host: 'smtp.163.com',
    port: 465,
    subject: '你有一封来自FWF工作室的邮件',
    auth: {
      user: 'wefound404_fwf@163.com',
      pass: ''
    },
    from: {
      name: 'FWF工作室',
      address: 'wefound404_fwf@163.com'
    },
    html: null
  }
};
const { serverConfig } = config;

// 同义化配置
if (serverConfig.baseURL === '/') {
  serverConfig.baseURL = '';
}

// 处理以/结尾的URL
const DealWithURL = (url) => {
  if (/^https?:\/\/.*\/$/.test(url)) {
    return url.slice(0, url.length - 1);
  }
  return url;
};
serverConfig.host = DealWithURL(serverConfig.host);
// blogConfig.publicPath = DealWithURL(blogConfig.publicPath);

module.exports = config;
