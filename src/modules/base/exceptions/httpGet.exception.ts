import { HttpStatus } from '@nestjs/common/enums';
import { FindRelationsNotFoundError, TypeORMError } from 'typeorm';
import ControllerException from './controller.exception';

export default class HttpGetException<T> extends ControllerException {
    constructor(error: Error) {
        super(error);
    }

    handlerRelationsException(): void {
        if (this.error instanceof FindRelationsNotFoundError) {
            this.message = this.error.message;
            this.status = HttpStatus.BAD_REQUEST;
        }
    }

    handlerTypeOrmException(): void {
        if (this.error instanceof TypeORMError) {
            this.message = this.error.message;
            this.status = HttpStatus.BAD_REQUEST;
        }
        this.handlerRelationsException();
    }

    handlerException(): void {
        this.handlerTypeOrmException();
    }
}
