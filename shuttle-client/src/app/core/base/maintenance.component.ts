import { BaseComponent } from './base.component';
import { MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class MaintenanceComponent extends BaseComponent {
    readonly STAGED_REQUEST_SUCCESS_MESSAGE = 'Staged change successfully created!';
    readonly STAGED_REQUEST_ERROR_MESSAGE = 'Connection Error!';

    constructor(protected messageService: MessageService) {
        super();
    }

    protected displayStagedRequestSuccessMessage(): void {
        this.messageService.add({key: 'adminToast', severity: 'success', detail: this.STAGED_REQUEST_SUCCESS_MESSAGE});
    }

    protected displayStagedRequestErrorMessage(error: string): void {
        this.messageService.add({key: 'adminToast', severity: 'error', detail: this.STAGED_REQUEST_ERROR_MESSAGE, sticky: true});
    }

    protected handleStagedRequestCreation(createStagedRequest$: Observable<{}>, errorHandler?: (error) => any): void {
        createStagedRequest$.pipe(takeUntil(this.destroy$))
            .subscribe(
                () => {
                    this.displayStagedRequestSuccessMessage();
                },
                error => {
                    this.displayStagedRequestErrorMessage(error.message);
                    if (errorHandler) {
                        errorHandler(error);
                    }
                }
            );
    }

}
