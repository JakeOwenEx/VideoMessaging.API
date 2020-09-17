import AWS from 'aws-sdk-mock';
import {handler} from "../../src/sendVideo";

describe("Request Fails Validation", () => {
    beforeAll(() => {
        AWS.mock('SNS', 'publish', {MessageId: "any-message"});
    })
    describe("GIVEN a user calls the /findgarments endpoint", () => {
        describe("WHEN the user's request does not contain a body", () => {
            test("THEN acceptance-tests returns 400 status code", async () => {
                var event = {
                    headers: {}
                };
                var result = await handler(event);
                expect(result.statusCode).toEqual(400);
            });
        });
    });
});