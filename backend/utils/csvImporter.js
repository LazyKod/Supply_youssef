@@ .. @@
 // Fonction de fallback pour créer des utilisateurs par défaut
 const createDefaultUsers = async () => {
+  console.log('🔄 Suppression et recréation des utilisateurs avec mots de passe hashés...');
+  
   const defaultUsers = [
     {
       email: 'admin@armor.com',
       password: 'password',
       nom: 'Administrateur',
       role: 'admin'
     },
     {
       email: 'user@armor.com',
       password: 'password',
       nom: 'Utilisateur',
       role: 'user'
     }
   ];

+  // Supprimer TOUS les utilisateurs existants
   await User.deleteMany({});
+  console.log('🗑️ Anciens utilisateurs supprimés');
+  
   const result = [];
+  
+  // Créer chaque utilisateur individuellement pour déclencher le middleware
   for (const userData of defaultUsers) {
+    console.log(`👤 Création de l'utilisateur: ${userData.email}`);
     const user = new User(userData);
-    await user.save(); // Déclenche le middleware de hashage
+    
+    // Forcer le marquage du mot de passe comme modifié
+    user.markModified('password');
+    
+    await user.save(); // Déclenche le middleware de hashage
+    console.log(`✅ Utilisateur créé avec mot de passe hashé: ${userData.email}`);
     result.push(user);
   }

-  console.log(`✅ ${result.length} utilisateurs par défaut créés`);
+  console.log(`✅ ${result.length} utilisateurs par défaut créés avec mots de passe hashés`);
   return result;
 };