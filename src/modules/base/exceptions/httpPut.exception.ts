import { HttpStatus } from '@nestjs/common/enums';
import { ValidationError } from 'class-validator';
import { UpdateValuesMissingError } from 'typeorm';
import ControllerException from './controller.exception';

export default class HttpPutException<T> extends ControllerException {
    constructor(error: Error | ValidationError[]) {
        super(error);
    }

    handlerUpdateValuesMissingError() {
        if (this.error instanceof UpdateValuesMissingError) {
            this.status = HttpStatus.BAD_REQUEST;
            this.message = 'Missing Values';
        }
    }

    handlerException(): void {
        this.handlerUpdateValuesMissingError();
    }
}
