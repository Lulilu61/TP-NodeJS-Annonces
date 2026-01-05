# 🚀 Projet Backend NodeJS - TP Annonces

Ce projet est une API de gestion d'annonces développée avec **Node.js** et **Express**. L'environnement est entièrement conteneurisé avec **Docker** pour garantir une stabilité maximale entre les différents postes de développement.

## 🛠 Architecture & Environnement
Le projet utilise une architecture moderne basée sur :
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
git clone [https://github.com/Lulilu61/TP-NodeJS-Annonces.git](https://github.com/Lulilu61/TP-NodeJS-Annonces.git)
cd TP-NodeJS-Annonces
