import EXPRESS from 'express';

import { InterviewRecordService as Service } from '@service';
import { InterviewRecord } from '@vo';
import { Restful, checkIntegrity, isUndef } from '@public';

const ROUTER = EXPRESS.Router();

/**
 * 添加面试记录
 * @path /create
 * @param { InterviewRecord } interviewRecord
 */
ROUTER.post('/create', async (req, res, next) => {
  const interviewRecord = InterviewRecord.build(req.body);
  if (
    !checkIntegrity(interviewRecord, [
      'interviewer',
      'interviewee_id',
      'type',
      'comment',
      'rate',
      'isPassed'
    ])
  ) {
    res.status(200).json(new Restful(1, '参数错误'));
    return next();
  }

  try {
    res
      .status(200)
      .json(
        await Service.Create(interviewRecord.interviewee_id, interviewRecord)
      );
  } catch (e) {
    // 进行邮件提醒
    res.status(500).end();
  }
  next();
});

/**
 * 编辑面试记录
 * @path /edit
 * @param { InterviewRecord } interviewRecord
 */
ROUTER.post('/edit', async (req, res, next) => {
  const interviewRecord: any = InterviewRecord.build(req.body).toJSON();
  if (
    !checkIntegrity(interviewRecord, [
      'id',
      'interviewer',
      'interviewee_id',
      'type',
      'comment',
      'rate',
      'isPassed'
    ])
  ) {
    res.status(200).json(new Restful(1, '参数错误'));
    return next();
  }

  try {
    res.status(200).json(await Service.Edit(interviewRecord));
  } catch (e) {
    // 进行邮件提醒
    res.status(500).end();
  }
  next();
});

/**
 * 查询某候选人的面试记录
 * @path /retrieve
 */
ROUTER.get('/retrieve', async (req, res, next) => {
  try {
    const { id } = req.query;
    if (isUndef(id)) {
      res.status(200).json(new Restful(1, '参数错误'));
      return next();
    }
    res.status(200).json(await Service.Retrieve(id));
  } catch (e) {
    // 进行邮件提醒
    res.status(500).end();
  }
  next();
});

/**
 * 删除面试记录
 * @path /delete
 * @param { number } id
 */
ROUTER.post('/delete', async (req, res, next) => {
  const { id } = req.body;
  try {
    res.status(200).json(await Service.Delete(id));
  } catch (e) {
    // 进行邮件提醒
    res.status(500).end();
  }
  next();
});

export default ROUTER;
