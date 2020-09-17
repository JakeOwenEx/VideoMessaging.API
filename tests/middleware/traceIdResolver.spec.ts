import {traceIdResolver} from "../../src/middleware/traceIdResolver";

describe("TraceId Resolver", () => {
    describe("GIVEN a acceptance-tests containing an event with headers", () => {
        describe("WHEN no traceId provided", () => {
            let handlerObject: any;
            beforeAll(async () => {
                handlerObject = {
                    event: {
                        headers: {}
                    }
                };
                await traceIdResolver().before(handlerObject);
            })

            test("THEN a trace id is added", () => {
                expect(handlerObject.event.headers).toHaveProperty("traceid")
            });
            test("AND it is a UUID", () => {
                expect(handlerObject.event.headers.traceid).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
            });
        });
    });
});