import { Module } from "@nestjs/common";
import AWSResourceService from "./awsResourse.service";


@Module({
    providers: [
        AWSResourceService
    ],
    exports: [AWSResourceService],
})
export default class AWSResourceModule {}
