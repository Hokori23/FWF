import { DataTypes, Model } from 'sequelize';
import DB from '@database';

interface InterviewRecordAttributes {
  id: number | null;
  interviewer: string; // 面试官名字
  // interviewee: string; // 候选人名字
  interviewee_id: number; // 候选人ID
  type: number; // 面试类型：[0: 纳新面试, 1: 实习面试, 2: 正式面试]
  comment: string; // 面试官评价
  rate: number; // 面试官评分：[0 ~ 10]
  isPassed: boolean; // 是否通过本次面试
  createdAt: Date;
  updatedAt: Date;
}

class InterviewRecord extends Model implements InterviewRecordAttributes {
  public id!: number | null;
  public interviewer!: string;
  // public interviewee!: string;
  public interviewee_id!: number;
  public type!: number;
  public comment!: string;
  public rate!: number;
  public isPassed!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

InterviewRecord.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: '自增字段（主键）'
    },
    interviewer: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notNull: {
          msg: '面试官名字不能为空'
        },
        notEmpty: {
          msg: '面试官名字不能为空'
        },
        len: {
          args: [2, 20],
          msg: '面试官名字长度应为2至20字符'
        }
      },
      comment: '面试官名字'
    },
    // interviewee: {
    //   type: DataTypes.STRING(20),
    //   allowNull: false,
    //   validate: {
    //     notNull: {
    //       msg: '候选人名字不能为空'
    //     },
    //     notEmpty: {
    //       msg: '候选人名字不能为空'
    //     },
    //     len: {
    //       args: [2, 10],
    //       msg: '候选人名字长度应为2至10字符'
    //     }
    //   },
    //   comment: '候选人名字'
    // },
    type: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: {
          msg: '面试类型不能为空'
        },
        notEmpty: {
          msg: '面试类型不能为空'
        },
        min: 0,
        max: 2
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: '面试官评论不能为空'
        },
        notEmpty: {
          msg: '面试官评论不能为空'
        }
      }
    },
    rate: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: {
          msg: '评分不能为空'
        },
        notEmpty: {
          msg: '评分不能为空'
        },
        min: 0,
        max: 10
      }
    },
    isPassed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: '面试结果不能为空'
        },
        notEmpty: {
          msg: '面试结果不能为空'
        }
      },
      comment: '是否通过本次面试'
    }
  },
  {
    sequelize: DB
  }
);

export default InterviewRecord;
