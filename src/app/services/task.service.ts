import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Pagination } from '../interfaces/pagination;interface';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
    private BASE_URL: string = environment.API_BASE_URL;

  constructor(private http: HttpClient) {}

  index(pagination?: Pagination): Observable<Task[]> {
    let params = new HttpParams();

    pagination?.page && params.set('_page', pagination.page);
    pagination?.limit && params.set('_limit', pagination.limit);
    pagination?.order && params.set('_order', pagination.order);

    return this.http.get<Task[]>(`${this.BASE_URL}/tasks`, {params});
  }

  update(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.BASE_URL}/tasks/${task.id}`, task);
}

create(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.BASE_URL}/tasks`, task);
}

delete(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.BASE_URL}/tasks/${id}`);
}
}
