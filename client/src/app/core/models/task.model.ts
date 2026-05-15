export const TaskStatus = {
  Todo: 'todo',
  Doing: 'doing',
  Done: 'done',
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  createdAt: Date;
}

export const TaskStatusLabel: Record<TaskStatus, string> = {
  [TaskStatus.Todo]: 'To do',
  [TaskStatus.Doing]: 'In progress',
  [TaskStatus.Done]: 'Done',
};

export type NewTask = Pick<Task, 'title' | 'description'>;
