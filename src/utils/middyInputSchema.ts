export const inputSchema =  {
    required: ['body'],
    properties: {
        body: {
            required: ['campaignId', 'videoName', 'email']
        }
    }
}