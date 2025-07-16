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

    for (const line of dataLines) {
      const columns = line.split(';').map(col => col.trim());
      
      if (columns.length < 3) continue;
      
      const user = {
        email: columns[1] || 'admin@armor.com',
        password: columns[2] || 'password', // Sera hashé automatiquement
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
    // Créer les utilisateurs un par un pour déclencher le middleware de hashage
    const result = [];
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      result.push(user);
    }
    
    console.log(`✅ ${result.length} utilisateurs importés depuis Book3.csv`);
    return result;