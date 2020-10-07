import moment from 'moment';
import juice from 'juice';
import { sad } from '@static';

const isUndef = (v) => {
  return v === undefined || v === null;
};

/**
 * @description 传入一个含有title: string(用于标题), name: string(申请人名字)
 */
export default ({ title = '', name = '' }) => {
  if (isUndef(title) || isUndef(name)) {
    throw new ReferenceError();
  }
  let html = `
  <!DOCTYPE html>
  <html lang="zh">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
    </head>
    <body>
      <table style="width:100%;height:100%">
        <tbody>
          <tr>
            <style>
              * {
                margin: 0;
                padding: 0;
              }
  
              .mail__container {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -ms-flex-direction: column;
                flex-direction: column;
                margin: 2rem auto;
                padding: 2rem 1.5rem 1rem 1.5rem;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                width: 100%;
                max-width: 400px;
                font-size: 14px;
                border-radius: 10px;
                -webkit-box-shadow: 0 1px 10px 2px rgba(0, 0, 0, 0.15);
                box-shadow: 0 1px 10px 2px rgba(0, 0, 0, 0.15);
                overflow: hidden;
                font-family: 'Century Gothic', 'Trebuchet MS', 'Hiragino Sans GB', '微软雅黑',
                  'Microsoft Yahei', Tahoma, Helvetica, Arial, SimSun, sans-serif;
                background-image: radial-gradient(circle at 100% 150%, #f8f8f8 24%, #fff 24%, #fff 28%, #f8f8f8 28%, #f8f8f8 36%, #fff 36%, #fff 40%, transparent 40%, transparent), radial-gradient(circle at 0 150%, #f8f8f8 24%, #fff 24%, #fff 28%, #f8f8f8 28%, #f8f8f8 36%, #fff 36%, #fff 40%, transparent 40%, transparent), radial-gradient(circle at 50% 100%, #fff 10%, #f8f8f8 10%, #f8f8f8 23%, #fff 23%, #fff 30%, #f8f8f8 30%, #f8f8f8 43%, #fff 43%, #fff 50%, #f8f8f8 50%, #f8f8f8 63%, #fff 63%, #fff 71%, transparent 71%, transparent), radial-gradient(circle at 100% 50%, #fff 5%, #f8f8f8 5%, #f8f8f8 15%, #fff 15%, #fff 20%, #f8f8f8 20%, #f8f8f8 29%, #fff 29%, #fff 34%, #f8f8f8 34%, #f8f8f8 44%, #fff 44%, #fff 49%, transparent 49%, transparent), radial-gradient(circle at 0 50%, #fff 5%, #f8f8f8 5%, #f8f8f8 15%, #fff 15%, #fff 20%, #f8f8f8 20%, #f8f8f8 29%, #fff 29%, #fff 34%, #f8f8f8 34%, #f8f8f8 44%, #fff 44%, #fff 49%, transparent 49%, transparent);
              }
  
              .mail__container__title>div,
              .mail__container__body>div {
                margin-bottom: 5px;
              }
  
              .mail__container__title,
              .mail__container__body {
                justify-self: flex-start;
              }
  
              .mail__container__body .qr-code {
                margin: 15px auto;
                width: 130px;
              }
  
              .mail__container__body .qr-code img {
                width: 100%;
              }
  
              .mail__container__title {
                margin-bottom: 25px;
              }
  
              .mail__container__subscribeUrl {
                margin-top: 15px
              }
  
              .mail__container__subscribeUrl>a {
                word-break: break-all;
                white-space: pre-wrap;
              }
  
              .mail__container .text-emphasize {
                color: #115ca7;
                font-weight: bold;
              }
  
              .mail__container .footer {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -ms-flex-direction: column;
                flex-direction: column;
                margin-top: 20px;
              }
  
              .mail__container .footer__tips {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                color: #777777;
              }
  
              .mail__container .footer__tips__right {
                -webkit-box-flex: 1;
                -ms-flex: 1 1 0px;
                flex: 1 1 0
              }
  
              .mail__container .footer__tips__right>a {
                float: right
              }
  
              .mail__container .footer__tips__right>a::before {
                content: none !important;
              }
  
              .mail__container .footer__tips__right img {
                border-radius: 50%;
                width: 70px;
                height: 70px;
              }
  
              .mail__container .footer__time {
                margin-top: 10px;
                -ms-flex-item-align: end;
                align-self: flex-end;
              }
  
              .mail__container a {
                position: relative !important;
                display: inline-block !important;
                padding: 0 0 3px 0;
                overflow: hidden !important;
                text-decoration: none !important;
                vertical-align: top !important;
                outline: 0 !important;
                background-color: transparent !important;
                margin: 0 3px !important;
                color: inherit !important;
                font-weight: inherit !important;
                line-height: normal !important;
                line-height: initial !important;
                font-size: 15px !important;
                color: #115ca7 !important;
                font-weight: bold !important
              }
  
              .mail__container a:before {
                position: absolute !important;
                top: auto !important;
                bottom: 0px !important;
                left: 0 !important;
                width: 100% !important;
                height: 1px !important;
                content: '' !important;
                background-color: inherit !important;
                -webkit-transition: all 0.2s !important;
                transition: all 0.2s !important;
                -webkit-transform: scaleX(0) !important;
                transform: scaleX(0) !important;
                -webkit-backface-visibility: hidden !important;
                backface-visibility: hidden !important;
                background-color: #115ca7 !important;
                color: #115ca7 !important;
              }
  
              .mail__container a:hover:before {
                -webkit-transform: scaleX(1) !important;
                transform: scaleX(1) !important;
              }
            </style>
            <td>
              <div class="mail__container">
                <div class="mail__container__title">
                  你好呀 <span class="text-emphasize">${name}</span> 同学
                </div>
                <div class="mail__container__body">
                  <div>
                    <p>很抱歉你的申请没有被通过QAQ</p><br />
                    <p>但这不代表我们不认可你的能力哦，我们相信每个人都是一匹具有无限潜力的黑马！</p><br />
                    <br />
                    <p>希望下一次见面可以遇到<span class="text-emphasize">更好的你！</span></p>
                  </div>
                </div>
                <div class="footer">
                  <div class="footer__tips">
                    <div class="footer__tips__left">
                      若这不是您订阅的邮件，请勿理会<br />
                      本邮件由 <span class="text-emphasize">FWF工作室</span> 系统自动发送，请勿回复
                    </div>
                    <div class="footer__tips__right">
                      <a><img src="${sad}" /></a>
                    </div>
                  </div>
                  <div class="footer__time">
                    ${moment().format('lll')}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
    `;
  return juice(html);
};
