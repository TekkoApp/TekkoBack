import { IsNotEmpty, IsOptional} from 'class-validator';

export default class CreateAttachDTO  {

    @IsNotEmpty()
    file: string;

    @IsNotEmpty()
    fileName: string;

    @IsOptional()
    description:string;

}
