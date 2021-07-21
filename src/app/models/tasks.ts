import { TasksState } from "./task-state";
import { User } from "./user";

export interface Tasks{
    id: number;
    projectId: number;
    performerId:number;
    performer: User;
    name: string;
    description: string;
    state: TasksState;
    createdAt: Date;
    finishedAt?: Date;
}