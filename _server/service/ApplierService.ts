import { ApplierAction as Action } from '@action';
import { Applier } from '@vo';
import { Restful, isUndef, falseToNull } from '@public';
import { broadcast, send } from '@mailer';

// 邮件模板
import ApplyTemplate from '@mailer/template/Apply';
import ApplySuccessTemplate from '@mailer/template/ApplySuccess';
import InternSuccessTemplate from '@mailer/template/InternSuccess';
import RegularSuccessTemplate from '@mailer/template/RegularSuccess';
import FailedTemplate from '@mailer/template/Failed';
const detailURL = '';

/**
 * 添加申请者
 * @param { Applier } applier
 */
const Create = async (applier: Applier): Promise<Restful> => {
  try {
    falseToNull(applier);
    const existedApplier = await Action.Retrieve(applier.email, applier.qq);
    if (existedApplier) {
      if (applier.email === existedApplier.email) {
        return new Restful(1, '申请邮箱已存在');
      }
      if (applier.qq === existedApplier.qq) {
        return new Restful(2, '申请QQ已存在');
      }
      throw new Error('ApplierService Create Error');
    }
    applier = await Action.Create(applier);
    broadcast(
      { title: 'FWF工作室申请邮件', info: applier.toJSON(), detailURL },
      ApplyTemplate
    );
    return new Restful(0, '申请成功', applier);
  } catch (e) {
    return new Restful(99, `申请失败, ${e.message}`);
  }
};

/**
 * 修改申请者
 * @param { Applier }
 */
const Edit = async (applier: Applier): Promise<Restful> => {
  try {
    const existedApplier = await Action.Retrieve__ByID(applier.id);
    if (isUndef(existedApplier)) {
      return new Restful(1, '账号不存在');
    }

    // 判断状态是否可更改
    const oldPermittedStatus = Number(existedApplier?.isPermitted);
    const newPermittedStatus = Number(applier.isPermitted);

    // 新状态是否合法

    if (newPermittedStatus < -1 || newPermittedStatus > 3) {
      return new Restful(5, '状态不合法，合法值：-1 ~ 3');
    }

    // 无更改
    if (oldPermittedStatus === newPermittedStatus) {
      return new Restful(4, '状态与原来的相同');
    }

    if (oldPermittedStatus === -1) {
      // 已拒
      return new Restful(3, '该申请已拒，不可再次更改');
    }

    if (oldPermittedStatus > 0 && newPermittedStatus < oldPermittedStatus) {
      // 纳新--x-->等待
      // 实习--x-->纳新
      // 通过面试--x-->实习
      return new Restful(2, '状态不可回退');
    }

    const newApplier = await Action.Update(<Applier>existedApplier, applier);

    const content: any = { name: existedApplier?.name };
    const to = {
      to: { name: existedApplier?.name, address: existedApplier?.email }
    };
    // 已拒: -1
    // 等待: 0
    // 纳新: 1
    // 实习: 2
    // 通过面试: 3
    if (newPermittedStatus === 1) {
      content.title = 'FWF工作室纳新申请通过';
      send(content, to, ApplySuccessTemplate);
    } else if (newPermittedStatus === 2) {
      content.title = '恭喜你成为FWF工作室实习成员';
      send(content, to, InternSuccessTemplate);
    } else if (newPermittedStatus === 3) {
      content.title = '恭喜你成为FWF工作室正式成员';
      send(content, to, RegularSuccessTemplate);
    } else if (newPermittedStatus === -1) {
      content.title = 'FWF工作室纳新申请未通过';
      send(content, to, FailedTemplate);
    }

    return new Restful(0, '编辑成功', newApplier.toJSON());
  } catch (e) {
    return new Restful(99, `编辑失败, ${e.message}`);
  }
};

/**
 * 分页遍历
 * @param { number } page
 * @param { number } capacity
 * @param { string } sortBy
 * @param { boolean } descending
 */
const Retrieve__Page = async (
  page: number,
  capacity: number,
  sortBy?: string,
  descending: boolean = false
): Promise<Restful> => {
  try {
    const appliers = await Action.Retrieve__Page(
      (page - 1) * capacity,
      Number(capacity),
      sortBy,
      Boolean(descending)
    );
    const rowsNumber = await Action.Retrieve__Count();
    return new Restful(0, '查询成功', { appliers, rowsNumber });
  } catch (e) {
    return new Restful(99, `查询失败, ${e.message}`);
  }
};

/**
 * 遍历全部
 */
const Retrieve__All = async (): Promise<Restful> => {
  try {
    const users = await Action.Retrieve__All();
    return new Restful(0, '查询成功', users);
  } catch (e) {
    return new Restful(99, `查询失败, ${e.message}`);
  }
};

/**
 * 删除账号
 * @param { number } id
 */
const Delete = async (id: number): Promise<Restful> => {
  try {
    const deleteRows = await Action.Delete(id);
    return deleteRows > 0
      ? new Restful(0, '删除成功')
      : new Restful(1, '删除失败');
  } catch (e) {
    return new Restful(99, `删除失败, ${e.message}`);
  }
};

export default { Create, Edit, Retrieve__Page, Retrieve__All, Delete };
