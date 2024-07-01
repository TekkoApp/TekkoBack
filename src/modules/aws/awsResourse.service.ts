import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid'; // Se cambia el import para utilizar destructuración
import * as AWS from 'aws-sdk';

export interface DataToSaveAWS {
    attach?: object[];
    idUser?: string;
    keyBucket?: string;
}

export interface DataToDeleteAWS {
    urlToDelete: any[];
    idShopToDelete: string;
    keyBucketToDelete: string; 
}

export interface DataToDeleteAWSSingle {
    urlToDelete: string;
    idShopToDelete: string;
    keyBucketToDelete: string; 
}

export interface DataToGetAWS {
    urlToGet: any[];
    idShopToGet: string;
    keyBucketToGet: string; 
}

@Injectable()
export default class AWSResourceService {

    constructor() { }

    async awsSaveProfileImage(data: DataToSaveAWS): Promise<string> { 
        try {
            const element = data.attach
            const url = await this.awsSave({ ...element, idCourse: data.idUser, keyBucket: data.keyBucket }); 
            return url;
        } catch (error) {
            throw new Error(error);
        }
    }


    async awsSave(data,) {
        try {
            const buf = Buffer.from(data.file.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            const uniqueId = uuidv4();
            const ext = data.filename.substring(data.filename.lastIndexOf('.') + 1);
            let fileExtencion;
            switch (ext) {
                case 'jpg':
                    fileExtencion = 'image/png'
                    break;
                case 'png':
                    fileExtencion = 'image/png'
                    break;
                case 'pdf':
                    fileExtencion = 'application/pdf'
                    break;
                default:
                    break;
            }
            const configData = {
                Bucket: 'tekko-content/-',
                Key: `${data.idUser}/${uniqueId}`,
                Body: buf,
                ContentEncoding: 'base64',
                ContentType: fileExtencion,
            };

            const entityTag = await new AWS.S3({ apiVersion: '2010-12-01', region: 'sa-east-1' }).putObject(configData).promise();
            return entityTag ? uniqueId as string : '';
        } catch (error) {
            throw new Error(error);
        }
    }
}
