@@ .. @@
     // Récupérer l'utilisateur
     const user = await User.findOne({ email: email.toLowerCase() });

     if (!user) {
+      console.log('❌ Utilisateur non trouvé:', email);
       return res.status(401).json({
         success: false,
         message: 'Identifiants invalides'
       });
     }

+    console.log('👤 Utilisateur trouvé:', user.email);
+    console.log('🔐 Hash du mot de passe en base:', user.password.substring(0, 20) + '...');
+    
     // Vérifier le mot de passe
     const isValidPassword = await user.comparePassword(password);
     if (!isValidPassword) {
+      console.log('❌ Mot de passe invalide pour:', email);
       return res.status(401).json({
         success: false,
         message: 'Identifiants invalides'
       });
     }

+    console.log('✅ Connexion réussie pour:', email);
+    
     // Mettre à jour la dernière connexion
     user.derniereConnexion = new Date();
     await user.save();