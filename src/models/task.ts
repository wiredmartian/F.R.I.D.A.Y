export interface Task{
    uid: string;
    title: string;
    description: string;
    start: any;
    complete: any;
    isdone: boolean;
    type: string;
}
export interface Meeting{
    title: string;
    description: string;
    date: any;
    priority: string;
    clients: string;
    uid: string;
}