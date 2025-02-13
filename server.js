require("dotenv").config();

const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const cors = require("cors"); 
const app = express();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const client = new OAuth2Client(CLIENT_ID);

// Allows requests from the frontend
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());

// Test
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Redirect users to Google Sign-In
app.get("/auth/google", (req, res) => {
    const googleAuthURL = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`;
    res.redirect(googleAuthURL);
});

// Handle OAuth callback from Google
app.get("/auth/google/callback", async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).send("Missing authorization code");
    }

    try {
        const response = await axios.post("https://oauth2.googleapis.com/token", {
            code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            grant_type: "authorization_code",
        });

        const { id_token, access_token } = response.data;

        // Verify the ID token
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        console.log("Authenticated user:", payload);

        // Redirect to frontend's "hello-world" page
        const frontendUrl = process.env.BASE_URL;
        res.redirect(`${frontendUrl}/hello-world`);

    } catch (error) {
        console.error("Error during authentication:", error);
        res.status(500).send("Authentication failed");
    }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));