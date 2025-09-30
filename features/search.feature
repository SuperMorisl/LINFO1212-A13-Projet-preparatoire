# language: fr

Fonctionnalité: Rechercher des incidents

Les citoyens, connectés ou non, peuvent rechercher un/des potentiel(s) incident(s) mentionné(s) à une adresse particulière.

Scénario: Un ou plusieurs incidents ont eu lieu à l’adresse fournie

Etant donné l'utilisateur fournit une adresse
Et cette adresse est mentionnée au moins une fois sur l'application web
Lorsque l'utilisateur veut rechercher des incidents avec cette même adresse
Alors tous les incidents ayant eu lieu à cette adresse sont affichés

Scénario: Aucun incident n'a eu lieu à l'adresse fournie

Etant donné l'utilisateur fournit une adresse
Et cette adresse n'a pas été mentionnée sur l'application web
Lorsque l'utilisateur veut rechercher des incidents avec cette même adresse
Alors un message explique à l'utilisateur qu'il n'y a aucun incident connu à l'adresse au moment de la recherche

Scénario: L'utilisateur ne fournit rien

Etant donné l'utilisateur n'a rien fourni
Lorsque l'utilisateur veut rechercher des incidents sans fournir d'adresse
Alors tous les incidents sont présentés à l'utilisateur