# 🚀 Guide d'intégration MongoDB avec vos données CSV

## 📋 Vue d'ensemble

Ce guide vous explique comment connecter votre base de données MongoDB avec les données de vos fichiers CSV (Book2 et Book3).

## 🎯 Étape 1 : Préparation des fichiers CSV

### 📊 Book2.csv (Commandes)
Placez votre fichier `Book2.csv` dans le dossier `data/` avec la structure suivante :
```
Technologie;Famille de produit;Groupe couverture;Quantité commandée;...
TON111;APS BulkNiv2;PF;4;0;4;0;32290;ARMOR PRINT SOLUTIONS S.A.S.;...
```

### 👥 Book3.csv (Utilisateurs)
Placez votre fichier `Book3.csv` dans le dossier `data/` avec la structure :
```
ID;Email;Password
1;admin@armor.com;password
```

## 🔧 Étape 2 : Configuration MongoDB

### Option A : MongoDB Local
1. **Installez MongoDB Community Server** : https://www.mongodb.com/try/download/community
2. **Démarrez MongoDB** :
   ```bash
   # Windows
   mongod --dbpath "C:\data\db"
   
   # macOS/Linux
   mongod --dbpath /usr/local/var/mongodb
   ```

### Option B : MongoDB Atlas (Cloud)
1. **Créez un compte** sur https://www.mongodb.com/atlas
2. **Créez un cluster gratuit** (M0)
3. **Récupérez votre URI de connexion**

## ⚙️ Étape 3 : Configuration de l'application

1. **Créez le fichier `.env`** à la racine :
   ```env
   # MongoDB Local
   MONGODB_URI=mongodb://localhost:27017/armor_orders
   
   # OU MongoDB Atlas
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/armor_orders
   
   JWT_SECRET=votre_secret_super_securise
   NODE_ENV=development
   PORT=5000
   ```

2. **Placez vos fichiers CSV** :
   ```
   data/
   ├── Book2.csv  (vos commandes)
   └── Book3.csv  (vos utilisateurs)
   ```

## 🚀 Étape 4 : Démarrage

1. **Installez les dépendances** :
   ```bash
   npm install
   ```

2. **Démarrez l'application** :
   ```bash
   npm run dev
   ```

3. **Vérifiez les logs** :
   ```
   ✅ MongoDB connecté: localhost:27017
   📊 Base de données: armor_orders
   📊 Importation des données depuis les fichiers CSV...
   ✅ 1 utilisateurs importés depuis Book3.csv
   ✅ 9 commandes importées depuis Book2.csv
   ✅ Base de données initialisée avec succès
   ```

## 📊 Structure des données

### 🏗️ Modèle Order (Commandes)
```javascript
{
  technologie: "TON111",
  familleProduit: "APS BulkNiv2",
  groupeCouverture: "PF", // OF ou PF
  quantiteCommandee: 4,
  quantiteExpediee: 0,
  quantiteALivrer: 4,
  clientLivreFinal: "ARMOR PRINT SOLUTIONS S.A.S.",
  confirmations: [
    { quantite: 2, date: "2024-05-07" },
    { quantite: 2, date: "2024-06-25" }
  ],
  // ... autres champs
}
```

### 👤 Modèle User (Utilisateurs)
```javascript
{
  email: "admin@armor.com",
  password: "hash_automatique",
  nom: "Administrateur",
  role: "admin"
}
```

## 🔄 Importation automatique

L'application importe automatiquement vos données CSV au démarrage :

1. **Lecture des fichiers CSV** dans `data/`
2. **Parsing intelligent** des dates (DD/MM/YYYY)
3. **Gestion des confirmations multiples** (jusqu'à 10 par commande)
4. **Création des index** pour les performances
5. **Validation des données** selon les schémas

## 🎯 Fonctionnalités avancées

### 📈 Confirmations multiples
- Support de 10 confirmations par commande
- Calcul automatique des quantités restantes
- Historique complet des confirmations

### 🔍 Recherche optimisée
- Index sur les champs critiques
- Recherche par client, technologie, dates
- Pagination automatique

### 🛡️ Sécurité
- Hashage automatique des mots de passe
- Validation des données d'entrée
- Gestion des erreurs robuste

## 🔧 Dépannage

### ❌ Erreur de connexion MongoDB
```bash
# Vérifiez que MongoDB est démarré
ps aux | grep mongod

# Ou redémarrez MongoDB
sudo systemctl start mongod
```

### 📁 Fichiers CSV non trouvés
- Vérifiez que `Book2.csv` et `Book3.csv` sont dans `data/`
- Respectez exactement la structure des colonnes
- Utilisez le séparateur `;` (point-virgule)

### 🔑 Problème d'authentification
- Vérifiez votre `JWT_SECRET` dans `.env`
- Utilisez `admin@armor.com` / `password` par défaut

## 📞 Support

En cas de problème :
1. Vérifiez les logs de la console
2. Consultez `http://localhost:5000/api/health`
3. Vérifiez la structure de vos fichiers CSV

## 🎉 Résultat

Une fois configuré, vous aurez :
- ✅ Base de données MongoDB opérationnelle
- ✅ Données CSV importées automatiquement
- ✅ Interface web fonctionnelle
- ✅ Système de confirmations multiples
- ✅ Recherche et filtrage avancés