@@ .. @@
 // Fonction d'initialisation de la base de données
 const initializeDatabase = async () => {
   try {
     // Connecter à MongoDB
     await connectDB();
     
+    // FORCER la recréation des utilisateurs à chaque démarrage pour corriger le problème de hashage
+    console.log('🔄 Initialisation forcée des utilisateurs...');
+    
     // Importer les données depuis les fichiers CSV
     console.log('📊 Importation des données depuis les fichiers CSV...');
-    await importUsersFromCSV();
+    await importUsersFromCSV(); // Cela va recréer les utilisateurs avec hashage
     await importOrdersFromCSV();
     
     console.log('✅ Base de données initialisée avec succès');
   } catch (error) {
     console.error('❌ Erreur lors de l\'initialisation de la base de données:', error);
   }
 };