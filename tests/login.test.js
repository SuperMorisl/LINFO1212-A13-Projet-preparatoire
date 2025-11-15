const request = require("supertest")
const { app, startServer } = require("../app.js")


describe("Checking the routes", () => {

    beforeAll(async () => {
    incidentsCollection = await startServer(true); // Initialise la DB SANS lancer le serveur, voir la fonction startServer dans app.js (test = true)
    });

    test("GET / doit rendre la page d'accueil", async () => {
        const httpRequest = await request(app).get("/");
        expect(httpRequest.statusCode).toBe(200);
    });

    test("GET /login doit rendre la page de connexion", async () => {
        const httpRequest = await request(app).get("/login");
        expect(httpRequest.statusCode).toBe(200);
    });

    test("POST /login avec bon mot de passe redirige vers la page d'acceuil", async () => {
        const httpRequest = await request(app)
            .post("/login")
            .type("form") // Pour simuler un envoie de données par les form du HTML
            .send({ username: "moimeme", password: "motdepasse123456" });

        expect(httpRequest.statusCode).toBe(302); // redirection car le mot de passe est valide
        expect(httpRequest.headers.location).toBe("/"); // redirigé vers la page d'acceuil
    });

    test("POST /login avec mauvais mot de passe renvoie erreur", async () => {
        const httpRequest = await request(app)
            .post("/login")
            .type("form") // Pour simuler un envoie de données par les form du HTML
            .send({ username: "moimeme", password: "pass123" });

        expect(httpRequest.statusCode).toBe(200);
        expect(httpRequest.text).toContain("Mot de passe incorrect");
    });

    test("GET /report sans session redirige vers la page de connexion", async () => {
        const httpRequest = await request(app).get("/report");
        expect(httpRequest.statusCode).toBe(302); // Redirection vers login car on est pas connecté
        expect(httpRequest.headers.location).toBe("/login");
    });

    test("GET et POST /report en étant connecté sans erreur", async () => {
        const agent = request.agent(app); // Permet de conserver les cookies pour le test
        const informations = [
            "moimeme", 
            "An incident happened yesterday.",  
            "123 Maple Street, Apt 45, Springfield, IL 62704"
        ];

        // L'utilisateur se connecte
        await agent
            .post("/login")
            .type("form")
            .send({ username: informations[0], password: "motdepasse123456" });

        const httpRequest = await agent.get("/report");
        expect(httpRequest.statusCode).toBe(200);

        // L'utilisateur entre un incident
        const httpRequest2 = await agent
            .post("/report")
            .type("form")
            .send({description: informations[1], adresse: informations[2]});
        
        expect(httpRequest2.statusCode).toBe(302); // Redirection vers la page d'acceuil
        expect(httpRequest2.headers.location).toBe("/");

        const httpRequest3 = await agent.get('/'); // On verifie que les infos sont à jour sur la page d'acceuil
        for (const info of informations) {
            expect(httpRequest3.text).toContain(info);
        }
    });

    // Nettoyage après tous les tests
    afterAll(async () => {
        await incidentsCollection.deleteMany({ Username: "moimeme" }); // supprime tous les reports de test
    });
});
