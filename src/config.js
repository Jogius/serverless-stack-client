export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        REGION: "us-east-1",
        BUCKET: "notes-app-uploads-jogius"
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://rjuqo2h8a2.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_lxZY8QRkt",
        APP_CLIENT_ID: "7tgqnmvurchvrnf2s5b7e46hic",
        IDENTITY_POOL_ID: "us-east-1:ea379e1a-746b-4299-8191-09db06af3a1e"
    }
};