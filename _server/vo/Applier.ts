import { DataTypes, Model } from 'sequelize';
import DB from '@database';

interface ApplyAttributes {
  id: number;
  name: string;
  university: string;
  school: string;
  major: string;
  grade: number;
  email: string;
  qq: string;
  bio: string | null;
  site: string | null;
  position: string;
  isInternship: boolean;
  isPermitted: number;
  createdAt: Date;
  updatedAt: Date;
}

class Applier extends Model implements ApplyAttributes {
  public id!: number;
  public name!: string;
  public university!: string;
  public school!: string;
  public major!: string;
  public grade!: number;
  public email!: string;
  public qq!: string;
  public bio!: string | null;
  public site!: string | null;
  public position!: string;
  public isInternship!: boolean;
  public isPermitted!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Applier.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: '自增字段（主键）'
    },
    name: {
      type: DataTypes.STRING(20),
      // unique: 'name',
      allowNull: false,
      validate: {
        notNull: {
          msg: '姓名不能为空'
        },
        notEmpty: {
          msg: '姓名不能为空'
        },
        len: {
          args: [2, 10],
          msg: '姓名长度应为2至10字符'
        }
      },
      comment: '姓名'
    },
    university: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: '大学或院校不能为空'
        },
        notEmpty: {
          msg: '大学或院校不能为空'
        }
      }
    },
    school: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: '学院不能为空'
        },
        notEmpty: {
          msg: '学院不能为空'
        }
      }
    },
    major: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: '专业不能为空'
        },
        notEmpty: {
          msg: '专业不能为空'
        }
      }
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: '年级不能为空'
        },
        notEmpty: {
          msg: '年级不能为空'
        }
      }
    },
    email: {
      type: DataTypes.STRING(150),
      unique: 'email',
      allowNull: false,
      validate: {
        isEmail: {
          msg: '请输入邮箱格式'
        },
        notNull: {
          msg: '邮箱不能为空'
        },
        notEmpty: {
          msg: '邮箱不能为空'
        }
      },
      comment: 'email'
    },
    qq: {
      type: DataTypes.STRING(20),
      unique: 'qq',
      allowNull: false,
      validate: {
        notNull: {
          msg: 'QQ不能为空'
        },
        notEmpty: {
          msg: 'QQ不能为空'
        },
        len: {
          args: [5, 20],
          msg: 'QQ长度应为5至20字符'
        },
        isAlphanumeric: {
          msg: '只允许字母和数字'
        }
      },
      comment: '用户账号'
    },
    bio: {
      type: DataTypes.TEXT(),
      comment: '自我介绍'
    },
    site: {
      type: DataTypes.STRING(255),
      // validate: {
      //   isUrl: true
      // },
      comment: '个人网站'
    },
    position: {
      type: DataTypes.STRING(50),
      comment: '学习方向'
    },
    isInternship: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: '0: 实习, 1: 面试'
    },
    isPermitted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '-1: 已拒, 0: 等待, 1: 实习, 2: 通过面试'
    }
  },
  {
    sequelize: DB
  }
);

export default Applier;
