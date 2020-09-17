import {APIGatewayEvent} from "aws-lambda/trigger/api-gateway-proxy";
import {constructParams} from "../../src/utils/constructSNSParams";
import {config} from "../../src/config/config";

describe("Constructing Params", () => {
    describe("GIVEN an AWS ApiGateEvent", () => {
        describe("WHEN construct params requested", () => {
            let event: APIGatewayEvent;
            let params : any;
            const videoS3Key: string =  "any-video-id";
            const emails: string[] =  ["any-email"];
            beforeAll(() => {
                // @ts-ignore
                event = {
                    headers: {
                        traceid: "any-trace-id"
                    },
                    // @ts-ignore
                    body: JSON.stringify( {
                        videoS3Key: videoS3Key,
                        emails: emails
                    })
                };
                params = constructParams(event);
            })

            test("THEN it returns json message as string", () => {
                // @ts-ignore
                const videoUrl: string = `${config.aws.s3VideoUrl}/${videoS3Key}`
                var expectedMessage = {
                    traceId: event.headers.traceid,
                    unprocessedVideoUrl: videoUrl,
                    // @ts-ignore
                    emails: emails
                }

                expect(params.Message).toEqual(JSON.stringify(expectedMessage));
            });
            test("AND it returns the topic arn", () => {
                expect(params.TopicArn).toEqual(config.aws.topic_arn);
            });
        });
    });
});