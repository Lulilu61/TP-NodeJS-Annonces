# Projet Backend NodeJS - TP Annonces

Ce projet est une API de gestion d'annonces développée avec **Node.js** et **Express**. L'environnement est entièrement conteneurisé avec **Docker** pour garantir une stabilité maximale entre les différents postes de développement.

## 🛠 Architecture & Environnement
Le projet utilise une architecture basée sur :
* **WSL2 (Ubuntu)** : Pour un environnement d'exécution Linux natif sur Windows.
* **Docker & Docker Compose** : Pour isoler les services (Node, Base de données, etc.).
* **MariaDB** : Système de gestion de base de données.
* **Mailhog** : Serveur SMTP de test pour intercepter les emails.

---

## 🚀 Installation et Lancement (Windows + WSL)

Suivez ces étapes pour lancer le projet sur votre machine :

### 1. Prérequis
* Avoir **Docker Desktop** lancé sur Windows.
* Avoir **WSL2** avec une distribution **Ubuntu** installée.
* Extension **WSL** installée dans VS Code.

### 2. Clonage du projet
Ouvrez votre terminal Ubuntu et exécutez :
```bash
sudo apt install git -y
git clone [https://github.com/Lulilu61/TP-NodeJS-Annonces.git](https://github.com/Lulilu61/TP-NodeJS-Annonces.git)
cd TP-NodeJS-Annonces
docker compose build
```

### 3. Lancement de l'environnement Docker
Depuis le dossier du projet dans Ubuntu :
```bash
# Lancer les containers en arrière-plan
docker compose up -d

# Vérifier que les 4 containers tournent bien
docker ps
```

### 4. Initialisation de NodeJS
Installer les dépendances à l'intérieur du container :
```bash
docker compose run app-annonces-node npm install express
docker compose exec app-annonces-node npm install bcryptjs
docker compose run app-annonces-node npm install nodemailer
docker compose run app-annonces-node npm install jsonwebtoken
docker compose run app-annonces-node npm install jest
docker compose run app-annonces-node npm install supertest
```

🌐 Accès aux services
| Service | URL | Description |
| :--- | :--- | :--- |
| **API NodeJS** | [http://localhost:3000](http://localhost:3000) | Votre serveur backend |
| **Adminer** | [http://localhost:8080](http://localhost:8080) | Gestion de la base de données |
| **Mailhog** | [http://localhost:8025](http://localhost:8025) | Capture des emails |

### 💡Commandes Utiles

**Lancer les containers :** docker compose up -d

**Arrêter le projet :** docker compose stop

**Tout supprimer (nettoyage) :** docker compose down OU docker compose down --remove orphans si WARN found orphan container au lancement des dockers

**Voir les logs :** docker compose logs -f app-annonces-node

**Lancer les migrations :** docker compose run app-annonces-node npx sequelize-cli db:migrate --migrations-path ./src/migrations

**Donner les droits pour les migrations :** sudo chown -R user:user chemin (ici: ./app-annonces/src/migrations)
**Attention !** ne pas le faire à la racine du projet sinon ça fait tout planter !

**Undo toutes les migrations :** docker compose run app-annonces-node npx sequelize-cli db:migrate:undo:all --migrations-path chemin (ici:./src/migrations)

### 🛠 Guide d'utilisation de l'API (Postman)
Ce guide répertorie les points d'entrée (endpoints) de l'application. Pour toutes les requêtes nécessitant un Token, utilisez l'onglet Authorization > Bearer Token dans Postman.

## 🔐 Authentification & Utilisateurs
| Action | Méthode | URL | Token Requis | Body (JSON) |
| :--- | :--- | :--- | :--- | :--- |
| **Inscription** | `POST` | `http://localhost:3000/users/register` | Non | `{"first_name":"", "last_name":"", "username":"", "email":"", "password":"", "role":"annonceur", "phone_number":"", "address":"", "zip_code":"", "city":"", "profile_picture":""}` |
| **Connexion** | `POST` | `http://localhost:3000/auth/login` | Non | `{"username":"", "password":""}` |
| **Déconnexion** | `POST` | `http://localhost:3000/auth/logout` | **Oui** | *(Vide)* |

## 📢 Gestion des Annonces
| Action | Méthode | URL | Token Requis | Body (JSON) |
| :--- | :--- | :--- | :--- | :--- |
| **Créer une annonce** | `POST` | `http://localhost:3000/annonces` | **Oui** | `{"title":"", "description":"", "price":0, "category_id":1, "filepath":""}` |
| **Modifier (Complet)** | `PUT` | `http://localhost:3000/annonces/:id` | **Oui (Auteur)** | `{"title":"", "description":"", "price":0, "category_id":1, "filepath":""}` |
| **Modifier (Partiel)** | `PATCH` | `http://localhost:3000/annonces/:id` | **Oui (Auteur)** | `{"price": 10.5}` |
| **Supprimer** | `DELETE` | `http://localhost:3000/annonces/:id` | **Oui (Auteur)** | *(Vide)* |
| **Modérer (Admin)** | `PATCH` | `http://localhost:3000/annonces/:id/moderate` | **Oui (Admin)** | `{"status":"non-visible", "admin_comment":""}` |

## 🚩 Signalements
| Action | Méthode | URL | Token Requis | Body (JSON) |
| :--- | :--- | :--- | :--- | :--- |
| **Signaler** | `POST` | `http://localhost:3000/reports` | **Oui** | `{"annonce_id": 1, "message": ""}` |
