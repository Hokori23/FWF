import { InterviewRecord } from '@vo';

/**
 * 添加面试记录
 * @param { InterviewRecord } interviewRecord
 */
const Create = (interviewRecord: InterviewRecord): Promise<InterviewRecord> => {
  return interviewRecord.save();
};

/**
 * 查询面试记录
 * @param { number } id
 */
const Retrieve = (id: number): Promise<InterviewRecord | null> => {
  return InterviewRecord.findOne({
    where: {
      id
    }
  });
};

/**
 * 更新面试记录
 * @param { InterviewRecord } oldRecord
 * @param { InterviewRecord } newRecord
 */
const Update = (
  oldRecord: InterviewRecord,
  newRecord: InterviewRecord
): Promise<InterviewRecord> => {
  return Object.assign(oldRecord, newRecord).save();
};

/**
 * 删除面试记录
 * @param { number } id
 */
const Delete = (id: number): Promise<number> => {
  return InterviewRecord.destroy({
    where: {
      id
    }
  });
};

export default {
  Create,
  Retrieve,
  Update,
  Delete
};
