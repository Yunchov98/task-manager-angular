export interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: Date;
}

export type NewTask = Pick<Task, 'title' | 'description'>;
