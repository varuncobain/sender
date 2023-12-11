const axios = require('axios');
const msal = require('msal');

const clientId = '637c02f3-df31-4892-bff1-277880a3a411';
const clientSecret = 'dpE8Q~A-~FldQ1sdhQ4noJyx2s_FraaSQHtzXcGa';
const tenantId = 'add67cd2-c8b2-416c-b171-b61b22be92f4';
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
