import EXPRESS from 'express';
import moment from 'moment';

import { ApplierService as Service } from '@service';
import { Applier } from '@vo';
import { Restful, checkIntegrity, isUndef } from '@public';

const ROUTER = EXPRESS.Router();

/**
 * @path /apply
 * @param { Applier } applier
 */
ROUTER.post('/apply', async (req, res, next) => {


  const applier = Applier.build(req.body);
  if (
    !checkIntegrity(applier, [
      'name',
      'university',
      'school',
      'major',
      'grade',
      'position',
      'isInternship',
      'email',
      'qq'
    ])
  ) {
    res.status(200).json(new Restful(1, '参数错误'));
    return next();
  }

  try {
    res.status(200).json(await Service.Create(applier));
  } catch (e) {
    // 进行邮件提醒
    res.status(500).end();
  }
  next();
});

/**
 * 编辑
 * @path /edit
 * @param { Applier } applier
 */
ROUTER.post('/edit', async (req, res, next) => {
  const applier: any = Applier.build(req.body).toJSON();
  if (
    !checkIntegrity(applier, [
      'name',
      'university',
      'school',
      'major',
      'grade',
      'position',
      'isInternship',
      'isPermitted',
      'email',
      'qq'
    ])
  ) {
    res.status(200).json(new Restful(1, '参数错误'));
    return next();
  }

  try {
    res.status(200).json(await Service.Edit(applier));
  } catch (e) {
    // 进行邮件提醒
    res.status(500).end();
  }
  next();
});

/**
 * 遍历用户
 * @path /retrieve
 */
ROUTER.get('/retrieve', async (req, res, next) => {
  try {
    res.status(200).json(await Service.Retrieve__All());
  } catch (e) {
    // 进行邮件提醒
    res.status(500).end();
  }
  next();
});

/**
 * 遍历用户
 * @path /retrieve-all
 */
ROUTER.get('/retrieve-all', async (req, res, next) => {
  try {
    const { page, rowsPerPage, sortBy, descending } = req.query;
    if (isUndef(page) || isUndef(rowsPerPage)) {
      res.status(200).json(new Restful(1, '参数错误'));
      return next();
    }
    res
      .status(200)
      .json(
        await Service.Retrieve__Page(page, rowsPerPage, sortBy, descending)
      );
  } catch (e) {
    // 进行邮件提醒
    res.status(500).end();
  }
  next();
});

/**
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
