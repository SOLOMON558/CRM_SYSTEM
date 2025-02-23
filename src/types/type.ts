export interface TodoRequest { 
	title?: string;
 	isDone?: boolean;  // изменение статуса задачи происходит через этот флаг
 } 

export interface Todo { 
	id: number;
	title: string;
	created: string; // ISO date string 
	isDone: boolean; 
}

export interface TodoInfo { 
	all: number
	completed: number
	inWork: number
}

export interface MetaResponse<T, N> {
	data: T[]
	info?: N
	meta: {
		totalAmount: number
	}
}

export type StatusType = "all"|"completed"|"inWork";

export interface DataObject {
    isDone: boolean,
    title: string
}
export interface AddTaskTypes {
	getAndUpdateTasks:()=> Promise<void>
  }
export interface TabsListTypes {
	getAndUpdateTasks: (status:StatusType)=> Promise<void>;
	status:StatusType;
	countTasks:TodoInfo;
}
export interface TodoListTypes extends AddTaskTypes {
	allTodo: Todo[]
}
export interface TodoItemTypes extends AddTaskTypes {
	item: Todo;
}