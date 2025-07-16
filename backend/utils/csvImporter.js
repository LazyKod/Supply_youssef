import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import Order from '../models/Order.js';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fonction pour parser une date au format DD/MM/YYYY
const parseDate = (dateStr) => {
  if (!dateStr || dateStr.trim() === '') return null;
  
  const parts = dateStr.split('/');
  if (parts.length !== 3) return null;
  
  // Format DD/MM/YYYY vers YYYY-MM-DD
  const day = parts[0].padStart(2, '0');
  const month = parts[1].padStart(2, '0');
  const year = parts[2];
  
  return new Date(`${year}-${month}-${day}`);
};

// Fonction pour importer les commandes depuis Book2.csv
export const importOrdersFromCSV = async () => {
  try {
    // Vérifier d'abord si des commandes existent déjà
    //const existingOrdersCount = await Order.countDocuments();
    
    //if (existingOrdersCount > 0) {
      //console.log(`✅ ${existingOrdersCount} commandes déjà présentes dans la base de données`);
      //return await Order.find().limit(10); // Retourner un échantillon pour les logs
    //}
      await Order.deleteMany({});
      console.log('🗑️ Anciennes commandes supprimées');

    const csvPath = path.join(__dirname, '../../data/Book2.csv');
    
    if (!fs.existsSync(csvPath)) {
      console.log('⚠️  Fichier Book2.csv non trouvé, création d\'exemples...');
      return await createSampleOrders();
    }

    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      console.log('⚠️  Fichier CSV vide, création d\'exemples...');
      return await createSampleOrders();
    }

    // Ignorer la première ligne (en-têtes)
    const dataLines = lines.slice(1);
    const orders = [];

    for (const line of dataLines) {
      const columns = line.split(';').map(col => col.trim());
      
      if (columns.length < 18) {
        console.log(`⛔ Ligne ignorée (colonnes insuffisantes):`, columns);
        continue;
        } 

      // Parser les confirmations
      const confirmations = [];
      for (let i = 0; i < 10; i++) {
        const quantiteIndex = 12 + (i * 2);
        const dateIndex = 13 + (i * 2);
        
        const quantite = parseInt(columns[quantiteIndex]) || 0;
        const dateStr = columns[dateIndex];
        
        if (quantite > 0 && dateStr) {
          const date = parseDate(dateStr);
          if (date) {
            confirmations.push({ quantite, date });
          }
        }
      }

      const order = {
        technologie: columns[0] || 'TON111',
        familleProduit: columns[1] || 'APS BulkNiv2',
        groupeCouverture: columns[2] || 'PF',
        quantiteCommandee: parseInt(columns[3]) || 1,
        quantiteExpediee: parseInt(columns[4]) || 0,
        quantiteALivrer: parseInt(columns[5]) || 0,
        quantiteEnPreparation: parseInt(columns[6]) || 0,
        clientLivreId: columns[7] || '32290',
        clientLivreFinal: columns[8] || 'ARMOR PRINT SOLUTIONS S.A.S.',
        dateCreation: parseDate(columns[9]) || new Date(),
        typeCommande: columns[10] || 'ZIG',
        dateLivraison: parseDate(columns[11]) || new Date(),
        confirmations: confirmations,
        unite: columns[17] || 'PCE'
      };

      orders.push(order);
    }

    // Insérer les nouvelles commandes (sans supprimer les existantes)
    const result = await Order.insertMany(orders);
    
    console.log(`✅ ${result.length} commandes importées depuis Book2.csv`);
    return result;

  } catch (error) {
    console.error('❌ Erreur lors de l\'importation des commandes:', error);
    // En cas d'erreur, ne pas créer d'exemples si des données existent déjà
    const existingOrdersCount = await Order.countDocuments();
    if (existingOrdersCount === 0) {
      return await createSampleOrders();
    }
    return [];
  }
};

// Fonction pour importer les utilisateurs depuis Book3.csv
export const importUsersFromCSV = async () => {
  try {
    // Vérifier d'abord si des utilisateurs existent déjà
    const existingUsersCount = await User.countDocuments();
    
    if (existingUsersCount > 0) {
      console.log(`✅ ${existingUsersCount} utilisateurs déjà présents dans la base de données`);
      return await User.find().limit(10); // Retourner un échantillon pour les logs
    }

    const csvPath = path.join(__dirname, '../../data/Book3.csv');
    
    if (!fs.existsSync(csvPath)) {
      console.log('⚠️  Fichier Book3.csv non trouvé, création d\'utilisateurs par défaut...');
      return await createDefaultUsers();
    }

    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      console.log('⚠️  Fichier CSV vide, création d\'utilisateurs par défaut...');
      return await createDefaultUsers();
    }

    // Ignorer la première ligne (en-têtes)
    const dataLines = lines.slice(1);
    const users = [];

    for (const line of dataLines) {
      const columns = line.split(';').map(col => col.trim());
      
      if (columns.length < 3) continue;
      
      // Hasher le mot de passe avant de l'enregistrer
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(columns[2] || 'password', salt);
      
      const user = {
        email: columns[1] || 'admin@armor.com',
        password: hashedPassword,
        nom: columns[1] === 'admin@armor.com' ? 'Administrateur' : 'Utilisateur',
        role: columns[1] === 'admin@armor.com' ? 'admin' : 'user'
      };

      users.push(user);
    }

    // Insérer les nouveaux utilisateurs (sans supprimer les existants)
    // Utiliser insertMany avec l'option pour éviter la validation du middleware
    const result = await User.insertMany(users, { validateBeforeSave: false });
    
    console.log(`✅ ${result.length} utilisateurs importés depuis Book3.csv`);
    return result;

  } catch (error) {
    console.error('❌ Erreur lors de l\'importation des utilisateurs:', error);
    // En cas d'erreur, ne créer des utilisateurs par défaut que s'il n'y en a pas
    const existingUsersCount = await User.countDocuments();
    if (existingUsersCount === 0) {
      return await createDefaultUsers();
    }
    return [];
  }
};

// Fonction de fallback pour créer des commandes d'exemple
const createSampleOrders = async () => {
  // Vérifier qu'il n'y a vraiment aucune commande avant de créer des exemples
  const existingOrdersCount = await Order.countDocuments();
  if (existingOrdersCount > 0) {
    console.log(`⚠️  ${existingOrdersCount} commandes existent déjà, pas de création d'exemples`);
    return [];
  }

  const sampleOrders = [
    {
      technologie: 'TON111',
      familleProduit: 'APS BulkNiv2',
      groupeCouverture: 'PF',
      quantiteCommandee: 4,
      quantiteExpediee: 0,
      quantiteALivrer: 4,
      quantiteEnPreparation: 0,
      clientLivreId: '32290',
      clientLivreFinal: 'ARMOR PRINT SOLUTIONS S.A.S.',
      dateCreation: new Date('2024-02-05'),
      typeCommande: 'ZIG',
      dateLivraison: new Date('2024-02-27'),
      confirmations: [
        { quantite: 4, date: new Date('2024-05-07') }
      ],
      unite: 'PCE'
    },
    {
      technologie: 'TON121',
      familleProduit: 'APS BulkNiv2',
      groupeCouverture: 'PF',
      quantiteCommandee: 4,
      quantiteExpediee: 1,
      quantiteALivrer: 3,
      quantiteEnPreparation: 0,
      clientLivreId: '32290',
      clientLivreFinal: 'ARMOR PRINT SOLUTIONS S.A.S.',
      dateCreation: new Date('2024-02-05'),
      typeCommande: 'ZIG',
      dateLivraison: new Date('2024-02-27'),
      confirmations: [
        { quantite: 1, date: new Date('2024-02-20') },
        { quantite: 3, date: new Date('2024-05-07') }
      ],
      unite: 'PCE'
    }
  ];

  const result = await Order.insertMany(sampleOrders);
  console.log(`✅ ${result.length} commandes d'exemple créées`);
  return result;
};

// Fonction de fallback pour créer des utilisateurs par défaut
const createDefaultUsers = async () => {
  // Vérifier qu'il n'y a vraiment aucun utilisateur avant de créer des défauts
  const existingUsersCount = await User.countDocuments();
  if (existingUsersCount > 0) {
    console.log(`⚠️  ${existingUsersCount} utilisateurs existent déjà, pas de création par défaut`);
    return [];
  }

  try {
    // Hasher les mots de passe par défaut
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password', salt);
    
    const defaultUsers = [
      {
        email: 'admin@armor.com',
        password: hashedPassword,
        nom: 'Administrateur',
        role: 'admin'
      },
      {
        email: 'user@armor.com',
        password: hashedPassword,
        nom: 'Utilisateur',
        role: 'user'
      }
    ];

    // Utiliser insertMany avec l'option pour éviter la validation du middleware
    const result = await User.insertMany(defaultUsers, { validateBeforeSave: false });
    console.log(`✅ ${result.length} utilisateurs par défaut créés`);
    return result;
  } catch (error) {
    console.error('❌ Erreur lors de la création des utilisateurs par défaut:', error);
    throw error;
  }
};