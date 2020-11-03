import Applier from './Applier';
import InterviewRecord from './InterviewRecord';

export { Applier, InterviewRecord };

Applier.hasMany(InterviewRecord, {
  foreignKey: 'interviewee_id',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});
