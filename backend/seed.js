require('dotenv').config();
const mongoose = require('mongoose');

const Classeroom = require('./src/models/classeroom.model');
const Subject    = require('./src/models/subject.model');
const Student    = require('./src/models/student.model');
const Absence    = require('./src/models/absence.model');

// ─── Données fictives ────────────────────────────────────────────────────────

const classesData = [
  { name: '3ème A',    level: '3ème',      headTeacher: 'M. Dupuis' },
  { name: '3ème B',    level: '3ème',      headTeacher: 'Mme Leclerc' },
  { name: '2nde A',    level: '2nde',      headTeacher: 'M. Fontaine' },
  { name: '2nde B',    level: '2nde',      headTeacher: 'Mme Garnier' },
  { name: '1ère S',    level: '1ère',      headTeacher: 'M. Renard' },
  { name: 'Terminale', level: 'Terminale', headTeacher: 'Mme Bouchard' },
];

const subjectsData = [
  { name: 'Maths',    coef: '4' },
  { name: 'Français', coef: '4' },
  { name: 'Histoire', coef: '3' },
  { name: 'SVT',      coef: '2' },
  { name: 'Anglais',  coef: '3' },
  { name: 'Physique', coef: '3' },
];

const firstNames = [
  'Alice', 'Bob', 'Clara', 'David', 'Emma', 'Félix', 'Grace', 'Hugo',
  'Inès', 'Julien', 'Karim', 'Léa', 'Mohamed', 'Nina', 'Oscar', 'Pauline',
  'Quentin', 'Rose', 'Samuel', 'Théo', 'Ugo', 'Valentine', 'William', 'Yasmine',
];

const lastNames = [
  'Martin', 'Dupont', 'Bernard', 'Thomas', 'Petit', 'Robert',
  'Leroy', 'Moreau', 'Simon', 'Laurent', 'Lefebvre', 'Michel',
  'Garcia', 'David', 'Bertrand', 'Roux', 'Vincent', 'Fournier',
];

const reasons = ['maladie', 'non_justifiee', 'rdv', 'autre'];

// ─── Utilitaires ─────────────────────────────────────────────────────────────

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randDate() {
  // Dates réparties sur Jan–Oct 2024
  const month = Math.floor(Math.random() * 10);
  const day   = Math.floor(Math.random() * 28) + 1;
  return new Date(2024, month, day);
}

function randJustification(reason) {
  if (reason === 'non_justifiee') return false;
  if (reason === 'maladie')       return Math.random() > 0.3;  // 70% justifié
  if (reason === 'rdv')           return Math.random() > 0.2;  // 80% justifié
  return Math.random() > 0.5;
}

// ─── Seed principal ──────────────────────────────────────────────────────────

async function seed() {
  const uri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE_NAME}`;

  try {
    await mongoose.connect(uri);
    console.log('Connecté à MongoDB\n');

    // 1. Nettoyage
    await Promise.all([
      Classeroom.deleteMany({}),
      Subject.deleteMany({}),
      Student.deleteMany({}),
      Absence.deleteMany({}),
    ]);
    console.log('Collections vidées');

    // 2. Créer les classes
    const classrooms = await Classeroom.insertMany(classesData);
    console.log(`${classrooms.length} classes créées`);

    // 3. Créer les matières
    const subjects = await Subject.insertMany(subjectsData);
    console.log(`${subjects.length} matières créées`);

    // 4. Créer 30 élèves
    const students = [];
    for (let i = 0; i < 30; i++) {
      const s = await Student.create({
        firstName:   rand(firstNames),
        lastName:    rand(lastNames),
        classeroom:  rand(classrooms)._id,
        sexe:        Math.random() > 0.5 ? 'M' : 'F',
        dateOfBirth: new Date(
          2006 + Math.floor(Math.random() * 5),
          Math.floor(Math.random() * 12),
          1
        ),
      });
      students.push(s);
    }
    console.log(`${students.length} élèves créés`);

    // 5. Créer 200 absences
    let nbJustified = 0;

    for (let i = 0; i < 200; i++) {
      const student       = rand(students);
      const subject       = rand(subjects);
      const reason        = rand(reasons);
      const justification = randJustification(reason);

      if (justification) nbJustified++;

      await Absence.create({
        student:       student._id,
        subject:       subject._id,
        date:          randDate(),
        duration:      Math.ceil(Math.random() * 6), // 1h à 6h
        reason,
        justification,
      });
    }

    const pct = Math.round((nbJustified / 200) * 100);
    console.log(`200 absences créées`);
    console.log(`Justifiées     : ${nbJustified} (${pct}%)`);
    console.log(`Non justifiées : ${200 - nbJustified} (${100 - pct}%)`);
    console.log('\n Seed terminé avec succès !');
  } catch (err) {
    console.error('Erreur :', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();