@@ .. @@
 // Hash du mot de passe avant sauvegarde
 userSchema.pre('save', async function(next) {
   if (!this.isModified('password')) return next();
   
   try {
+    console.log('🔐 Hashage du mot de passe pour:', this.email);
     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);
+    console.log('✅ Mot de passe hashé avec succès');
     next();
   } catch (error) {
+    console.error('❌ Erreur lors du hashage du mot de passe:', error);
     next(error);
   }
 });

 // Méthode pour comparer les mots de passe
 userSchema.methods.comparePassword = async function(candidatePassword) {
-  return bcrypt.compare(candidatePassword, this.password);
+  try {
+    console.log('🔍 Comparaison du mot de passe pour:', this.email);
+    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    
+    console.log('🔍 Résultat de la comparaison:', isMatch ? '✅ Succès' : '❌ Échec');
+    return isMatch;
+  } catch (error) {
+    console.error('❌ Erreur lors de la comparaison du mot de passe:', error);
+    return false;
+  }
 };