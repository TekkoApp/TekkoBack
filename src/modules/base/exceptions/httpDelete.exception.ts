import { ValidationError } from 'class-validator';
import { QueryFailedError } from 'typeorm';
import { HttpStatus } from '@nestjs/common/enums';
import ControllerException from './controller.exception';

export default class HttpDeleteException<T> extends ControllerException {
    constructor(error: Error | ValidationError[]) {
        super(error);
    }

    handlerQueryFailedError() {
        if (this.error instanceof QueryFailedError) {
            this.status = HttpStatus.BAD_REQUEST;
            this.message = this.error.message;
        }
    }

    handlerException(): void {
        this.handlerQueryFailedError();
    }
}
