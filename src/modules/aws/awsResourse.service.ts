import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid'; // Se cambia el import para utilizar destructuración
import * as AWS from 'aws-sdk';
import { UserRole } from "../user/enumerations/user.enum";

export interface DataToSaveAWS {
    attach?: object[];
    idUser?: string;
    keyBucket?: string;
    rol?:UserRole;
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
            const url = await this.awsSave({ ...element, idUser: data.idUser, keyBucket: data.keyBucket, rol:data.rol }); 
            return url;
        } catch (error) {
            throw new Error(error);
        }
    }



    async awsSave(data) {
        try {
            const buf = Buffer.from(data[0].file.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            const uniqueId = uuidv4();
            const ext = data[0]?.fileName.substring(data[0].fileName.lastIndexOf('.') + 1);
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
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${data.rol}/${data.idUser}/${data.keyBucket}/${uniqueId}`,
                Body: buf,
                ContentEncoding: 'base64',
                ContentType: fileExtencion,
            };

            try {
                const entityTag = await new AWS.S3({ apiVersion: '2010-12-01', region: 'sa-east-1' }).putObject(configData).promise();
                return entityTag ? uniqueId as string : '';
            } catch (error) {
                throw new Error(`Error saving in aws for ${configData}`)
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}
