
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IButton } from 'src/app/interfaces/button.interface';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    icon: string = "delete";
    tasks: Array<Task> = [];
    taskForm: FormGroup = this.formBuilder.group({
        name: ['', Validators.required, Validators.minLength(3)],
        checked: [false],
    });

    buttonSettings: IButton = {
        text: 'Deletar todos',
        variant: 'danger'
    };

    constructor(private taskService: TaskService, private formBuilder:
        FormBuilder, private router: Router) {
        this.taskForm = this.formBuilder.group({
            name: ["", Validators.compose([
                Validators.required,
                Validators.minLength(3)])],
                checked: [false],
        })
    }

    ngOnInit(): void {
        this.getTasks();
    }

    getTasks(): void {
        this.taskService.index().subscribe({
            next: (res) => {
                console.log(res);
                this.tasks = res;
            },
            error: (err) => {
                console.error("[ERROR getTasks]: " + err);
                this.router.navigate(['/error']);
            }
        })
    }

    updateTask(task: Task): void {
        this.taskService.update(task).subscribe({
            next: res => {
                console.log('updateTask: ' + res);
            },
            error: (err) => {
                console.log("[ERROR updateTask: " + err);
            },
        });
    }

    validateInputTask(task: Task): void {
        if (!task.name.length) {
            Swal.fire({
                title: 'Task está vazia, deseja deletar?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#0b5ed7;',
                cancelButtonColor: '#FF002E',
                confirmButtonText: 'sim, deletar!',
                cancelButtonText: 'cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteTask(task.id);
                    Swal.fire('Deletado com sucesso !')
                }
              })
            /* const confirmed = confirm("Task está vazia, deseja deletar ?"); */
            /* if(confirmed) this.deleteTask(task.id); */
        } else {
            this.updateTask(task)
        }
    }
    handleCheckInput(task: Task): void {
        task.checked = !task.checked;
        this.updateTask(task)
    }

    createTask(): void {
        if (this.taskForm.valid) {
            this.taskService.create(this.taskForm.value).subscribe({
                next: (res) => {
                    console.log('createTask: ', res);
                    this.tasks.push(res)
                    /* this.reloadComponent(); */
                },
                error: (err) => console.log("[ERROR]: createTask: " + err),
            })
        }
    }

    deleteTask(id: number): void {
        this.taskService.delete(id).subscribe({
            next: (res)=> {
                console.log("deleteTask: " + res);
                const filtered: Task[] = this.tasks.filter(task => task.id !== id);
                this.tasks = filtered;
            }
        })
    }

    reloadComponent(): void {
        this.router.navigate([this.router.url]);
    }

    handleClickDeleteButton(event: any) {
        console.log('Button emitiu um evento: ', event)
        alert('Deletando todas as tasks....');
    }
}


