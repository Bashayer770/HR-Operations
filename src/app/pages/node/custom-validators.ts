import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NodeService } from '../../services/node.service';

export function uniqueIdValidator(nodeService: NodeService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return of(null);
    }

    return nodeService.checkIfIdExists(control.value).pipe(
      map(exists => (exists ? { idExists: true } : null)),
      catchError(() => of(null)) // Fail silently if API fails
    );
  };
}
