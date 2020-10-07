import { Applier } from '@vo';
import { Op } from 'sequelize';

/**
 * 添加用户
 * @param { Applier } user
 */
const Create = (applier: Applier): Promise<Applier> => {
  return applier.save();
};

/**
 * 查询单个用户
 * @param { string } ?email
 * @param { string } ?qq
 */
const Retrieve = (email?: string, qq?: string): Promise<Applier | null> => {
  return Applier.findOne({
    where: {
      [Op.or]: [{ email }, { qq }]
    }
  });
};

/**
 * 通过ID查询
 */
const Retrieve__ByID = (id: number): Promise<Applier | null> => {
  return Applier.findOne({
    where: {
      id
    }
  });
};

/**
 * 遍历用户
 * @param { number } offset
 * @param { number } limit
 * @param { string } sortBy
 * @param { boolean } descending
 */
const Retrieve__Page = (
  offset: number,
  limit: number,
  sortBy: string,
  descending: boolean = false
): Promise<Array<Applier | null>> => {
  return Applier.findAll({
    offset,
    limit,
    order: sortBy ? [[sortBy, descending ? 'ASC' : 'DESC']] : undefined
  });
};

const Retrieve__All = (): Promise<Array<Applier | null>> => {
  return Applier.findAll();
};

/**
 * 查询总数
 */
const Retrieve__Count = (): Promise<number> => {
  return Applier.count();
};

/**
 * 更新用户信息
 * @param { Applier } oldApplier
 * @param { Applier } newApplier
 */
const Update = (oldApplier: Applier, newApplier: Applier): Promise<Applier> => {
  return Object.assign(oldApplier, newApplier).save();
};

/**
 * 删除用户账号
 * @param { number } id
 */
const Delete = (id: number): Promise<number> => {
  return Applier.destroy({
    where: {
      id
    }
  });
};

export default {
  Create,
  Retrieve,
  Retrieve__ByID,
  Retrieve__Page,
  Retrieve__Count,
  Retrieve__All,
  Update,
  Delete
};
