import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-error",
    templateUrl: "./error.component.html",
    styleUrls: ["./error.component.scss"],
})
export class ErrorComponent {
    router = inject(Router);

    redirectHome(event: any) {
        this.router.navigate(["/"]);
    }
}
