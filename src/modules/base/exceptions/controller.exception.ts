import { HttpStatus, HttpException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import AlreadyExistsException from './alreadyExistEntity.exception';
import AuthorizationException from './authorization.exception';

export default abstract class ControllerException extends Error {
    protected error: Error | ValidationError[];
    protected status: HttpStatus;
    protected json: Record<string, any>;

    constructor (error: Error | ValidationError[], message?: string) {
        super(error instanceof Error ? error.message : message);
        this.error = error;
        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
        this.getException();
    }

    abstract handlerException(): void;

    private validationException (): void {
        if (this.error instanceof Array && this.error.every(item => item instanceof ValidationError)) {
            this.status = HttpStatus.BAD_REQUEST;
            this.json = this.error.map(validationError => ({
                property: validationError.property,
                errors: Object.values(validationError.constraints || validationError.children),
            }));
        }
    }



    private handlerSyntaxError (): void {
        if (this.error instanceof SyntaxError) {
            this.status = HttpStatus.BAD_REQUEST;
            this.message = this.error.message;
        }
    }

    private validateAuthorityAccess (): void {
        if (this.error instanceof AuthorizationException) {
            this.status = HttpStatus.FORBIDDEN;
            this.message = this.error.message;
        }
    }

    private validateAlreadyExist (): void {
        if (this.error instanceof AlreadyExistsException) {
            this.status = HttpStatus.BAD_REQUEST;
            this.message = this.error.message;
        }
    }

    private getException (): void {
        this.handlerSyntaxError();
        this.validationException();
        this.handlerException();
        this.validateAuthorityAccess();
        this.validateAlreadyExist();
    }

    toHttpResponse (): HttpException {
        return new HttpException(this.json || this.message, this.status);
    }
}
