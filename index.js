const axios = require('axios');
const msal = require('msal');

const clientId = '<your-client-id>';
const clientSecret = '<your-client-secret>';
const tenantId = '<your-tenant-id>';
const resourceServerUrl = 'https://<your-web-app-1-url>/';

const config = {
    auth: {
        clientId,
        authorityHost: `https://login.microsoftonline.com/${tenantId}`,
    },
};

const msalClient = new msal.ConfidentialClientApplication(config);

const getToken = async () => {
    try {
        const tokenResponse = await msalClient.acquireTokenWithClientCredentials({
            scopes: ['https://graph.microsoft.com/user.read'],
        });
        return tokenResponse.accessToken;
    } catch (error) {
        console.error(error);
    }
};

const callResourceServer = async (accessToken) => {
    try {
        const response = await axios.get(resourceServerUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

(async () => {
    const accessToken = await getToken();
    await callResourceServer(accessToken);
})();
