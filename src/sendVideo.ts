import { APIGatewayEvent } from "aws-lambda";
import middy from "@middy/core";
import AWS from "aws-sdk";
import httpErrorHandler from "@middy/http-error-handler";
import validator from "@middy/validator";
import {traceIdResolver} from "./middleware/traceIdResolver";
import {constructParams} from "./utils/constructSNSParams";
import {inputSchema} from "./utils/middyInputSchema";
import cors from '@middy/http-cors';
import got from 'got';
import {SendVideoRequest} from "./types/SendVideoRequest";
AWS.config.update({region: 'eu-west-1'});

const sendVideo = async (event: APIGatewayEvent): Promise<any> => {
    console.log("request.started");

    const body :SendVideoRequest = JSON.parse(<string> event.body);

    const videoOrderResponse = await got.get(`https://ouawcc9ygb.execute-api.eu-west-1.amazonaws.com/dev/${body.campaignId}/videoOrder`)
    const videoOrderBody = JSON.parse(videoOrderResponse.body)
    // @ts-ignore
    const params = constructParams(body, videoOrderBody.videoOrder);
    const publishMessage = await new AWS.SNS().publish(params).promise();
    console.log(`request.completed with id ${publishMessage.MessageId}`);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            messageId: publishMessage.MessageId
        }),
    };
}

export const handler = middy(sendVideo)
    .use(httpErrorHandler())
    .use(validator({inputSchema}))
    .use(traceIdResolver())
    .use(cors());