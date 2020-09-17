import {config} from "../config/config";
import {SendVideoRequest} from "../types/SendVideoRequest";

export function createVideoOrder(body: SendVideoRequest, videoOrder: string[]): string[] {
    let completeVideoOrder: string[] = [];
    completeVideoOrder.push(`${config.aws.s3VideoUrl}/${body.userId}/${body.campaignId}/${body.clientId}/video/unprocessed.mp4`)
    const enrichedVideoOrder = videoOrder.map((video) => `https://video-messaging-library-videos.s3.eu-west-2.amazonaws.com/${video}.mp4`)
    completeVideoOrder.push(...enrichedVideoOrder)
    return completeVideoOrder;
}