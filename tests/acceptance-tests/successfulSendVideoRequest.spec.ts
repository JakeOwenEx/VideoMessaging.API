
import AWS from 'aws-sdk-mock';
import {handler} from "../../src/sendVideo";

describe("Successful Handler Tests", () => {
    const messageId = "any-message";
    beforeAll(() => {
        AWS.mock('SNS', 'publish', {MessageId: messageId});
    })

    describe("GIVEN a user calls the /sendVideo endpoint", () => {
        describe("WHEN the user makes a valid request with a trace id", () => {
            let result: any;
            let traceId: string ;
            beforeAll( async () => {
                traceId = "someTraceId";
                const event = {
                    headers: {
                        traceid: traceId
                    },
                    body: JSON.stringify({
                        campaignId: "1234567"
                    })
                };

                result = await handler(event);
            });

            test("THEN acceptance-tests returns 200 status code", async () => {
                expect(result.statusCode).toEqual(200);
            });

            test("AND response contains messageId from SNS", async () => {
                const body = JSON.parse(result.body);
                expect(body.messageId).toEqual( messageId);
            });
        });
    });
});
