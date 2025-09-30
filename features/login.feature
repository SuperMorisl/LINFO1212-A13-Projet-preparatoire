#language : fr

Fonctionnalité: Se connecter à la plateforme

Les citoyens peuvent se connecter à leur compte sur la plateforme afin d'accéder aux fonctionnalités de celle-ci.

Scénario : Le citoyen se connecte à son compte

Étant donné que les informations du citoyen existent
Et qu'il entre son nom d'utilisateur
Et qu'il entre son mot de passe
Lorsqu'il essaie de se connecter
Alors il est redirigé sur la page d'accueil de son compte
Et il voit un message qui affirme qu'il est bien connecté

Scénario : Le citoyen n'a pas de compte 

Étant donné que les informations du citoyen n'existent pas
Lorsqu'il entre un nom d'utilisateur valide
Et qu'il crée son mot de passe 
Et qu'il entre son nom complet
Et qu'il entre son adresse e-mail
Et qu'il s'enregistre
Alors son compte est créé
Et il est redirigé vers la page d'accueil de son compte
Et il voit un message qui affirme que le compte a bien été créé

Scénario : Le citoyen n'arrive pas à créer de compte - Nom d'utilisateur déjà utilisé

Étant donné que le nom d'utilisateur est déjà relié à un compte existant
Lorsque le citoyen entre ce nom d'utilisateur
Et qu'il essaie de s'enregistrer
Alors un message d'erreur "Nom d'utilisateur existant" s'affiche
Et le compte n'est pas créé

Scénario : Le citoyen n'arrive pas à créer de compte - Adresse e-mail invalide

Étant donné que le citoyen choisit une adresse e-mail incorrecte
Lorsqu'il entre son adresse e-mail
Et qu'il essaie de s'enregistrer
Alors un message d'erreur "Adresse e-mail invalide" s'affiche 
Et le compte n'est pas créé









