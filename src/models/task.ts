export interface Task{
    taskid: any;
    uid: string;
    title: string;
    description: string;
    start: any;
    complete: any;
    isdone: boolean;
    type: string;
    priority: string;
    date_complete: any;
}
export interface Meeting{
    title: string;
    description: string;
    date: any;
    priority: string;
    clients: string;
    uid: string;
}