import { InterviewRecordAction as Action, ApplierAction } from '@action';
import { InterviewRecord } from '@vo';
import { Restful } from '@public';

/**
 * 添加面试记录
 * @param { InterviewRecord } interviewRecord
 */
const Create = async (
  interviewee_id: number,
  interviewRecord: any
): Promise<Restful> => {
  try {
    const existedInterviewee = await ApplierAction.Retrieve__ByID(
      interviewee_id
    );
    if (!existedInterviewee) {
      return new Restful(1, '不存在该候选人');
    }
    interviewRecord = await existedInterviewee.createInterviewRecord(
      interviewRecord
    );
    return new Restful(0, '添加面试记录成功', interviewRecord.toJSON());
  } catch (e) {
    return new Restful(99, `添加面试记录失败, ${e.message}`);
  }
};

/**
 * 查询某候选人的面试记录
 * @param { number } interviewee_id
 */
const Retrieve = async (interviewee_id: number): Promise<Restful> => {
  try {
    const existedInterviewee = await ApplierAction.Retrieve__ByID(
      interviewee_id
    );
    if (!existedInterviewee) {
      return new Restful(1, '不存在该候选人');
    }
    const interviewRecords = await existedInterviewee.getInterviewRecords();
    return new Restful(
      0,
      '查询面试记录成功',
      interviewRecords.map((record) => record.toJSON())
    );
  } catch (e) {
    return new Restful(99, `查询面试记录失败, ${e.message}`);
  }
};

/**
 * 更新面试记录
 * @param { InterviewRecord } newRecord
 */
const Edit = async (newRecord: InterviewRecord): Promise<Restful> => {
  try {
    const existedRecord = await Action.Retrieve(<number>newRecord.id);
    if (!existedRecord) {
      return new Restful(1, '该面试记录不存在');
    }
    newRecord = await Action.Update(existedRecord, newRecord);
    return new Restful(0, '更新面试记录成功', newRecord.toJSON());
  } catch (e) {
    return new Restful(99, `更新面试记录失败, ${e.message}`);
  }
};

/**
 * 删除面试记录
 * @param { number } id
 */
const Delete = async (id: number): Promise<Restful> => {
  try {
    const existedRecord = await Action.Retrieve(id);
    if (!existedRecord) {
      return new Restful(1, '该面试记录不存在');
    }
    const deleteRows = await Action.Delete(id);
    return deleteRows > 0
      ? new Restful(0, '删除面试记录成功')
      : new Restful(2, '删除面试记录失败');
  } catch (e) {
    return new Restful(99, `删除面试记录失败, ${e.message}`);
  }
};

export default {
  Create,
  Retrieve,
  Edit,
  Delete
};
