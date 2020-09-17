import {config} from "../config/config";
import {createVideoOrder} from "./createVideoOrder";
import {SendVideoRequest} from "../types/SendVideoRequest";

export function constructParams(body: SendVideoRequest, videoOrder: string[], traceId: string){
    const completeVideoOrder = createVideoOrder(body, videoOrder);
    const message = {
        traceId: traceId,
        campaignId: body.campaignId,
        clientId: body.clientId,
        userId: body.userId,
        videoOrder: completeVideoOrder
    }

    return {
        Message: JSON.stringify(message),
        TopicArn: config.aws.topic_arn
    };
}