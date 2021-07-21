export interface TasksCreate{
    projectId: number;
    performerId:number;
    name: string;
    description: string;
    state: number;
}