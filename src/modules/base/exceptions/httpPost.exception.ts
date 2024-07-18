import { ValidationError } from 'class-validator';
import ControllerException from './controller.exception';
import { HttpStatus } from '@nestjs/common';
import WrongSelectedAddress from './../../location/exceptions/wrongSelectedAddress.exception';

export default class HttpPostException<T> extends ControllerException {
    constructor(error: Error | ValidationError[]) {
        super(error);
    }

    handlerException(): void {
        if(this.error instanceof WrongSelectedAddress){
            this.status = HttpStatus.BAD_REQUEST
        }
    }
}
