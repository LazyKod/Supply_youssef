// Hash du mot de passe avant sauvegarde
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    console.log('🔐 Hashage du mot de passe pour:', this.email);
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('✅ Mot de passe hashé avec succès');
    next();
  } catch (error) {
    console.error('❌ Erreur lors du hashage du mot de passe:', error);
    next(error);
  }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    console.log('🔍 Comparaison du mot de passe pour:', this.email);
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log('🔍 Résultat de la comparaison:', isMatch ? '✅ Succès' : '❌ Échec');
    return isMatch;
  } catch (error) {
    console.error('❌ Erreur lors de la comparaison du mot de passe:', error);
    return false;
  }
};

// Fonction pour importer les utilisateurs depuis Book3.csv
export const importUsersFromCSV = async () => {
  try {
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
      
      const user = {
        email: columns[1] || 'admin@armor.com',
        password: columns[2] || 'password', // Sera hashé automatiquement par le middleware pre('save')
        nom: columns[1] === 'admin@armor.com' ? 'Administrateur' : 'Utilisateur',
        role: columns[1] === 'admin@armor.com' ? 'admin' : 'user'
      };

      users.push(user);
    }

    // Supprimer les anciens utilisateurs
    await User.deleteMany({});
    
    // Créer les utilisateurs un par un pour déclencher le middleware de hashage
    const result = [];
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      result.push(user);
    }
    
    console.log(`✅ ${result.length} utilisateurs importés depuis Book3.csv`);
    return result;

  } catch (error) {
    console.error('❌ Erreur lors de l\'importation des utilisateurs:', error);
    return await createDefaultUsers();
  }
};

// Fonction de fallback pour créer des utilisateurs par défaut
const createDefaultUsers = async () => {
  const defaultUsers = [
    {
      email: 'admin@armor.com',
      password: 'password', // Sera hashé automatiquement par le middleware pre('save')
      nom: 'Administrateur',
      role: 'admin'
    },
    {
      email: 'user@armor.com',
      password: 'password', // Sera hashé automatiquement par le middleware pre('save')
      nom: 'Utilisateur',
      role: 'user'
    }
  ];

  // Supprimer les anciens utilisateurs
  await User.deleteMany({});
  
  // Créer les utilisateurs un par un pour déclencher le middleware de hashage
  const result = [];
  for (const userData of defaultUsers) {
    const user = new User(userData);
    await user.save();
    result.push(user);
  }
  
  console.log(`✅ ${result.length} utilisateurs par défaut créés`);
  return result;
};