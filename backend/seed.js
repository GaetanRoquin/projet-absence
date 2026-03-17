require('dotenv').config();
const mongoose = require('mongoose');

const Student = require('./src/models/student.model');
const Absence = require('./src/models/absence.model');
const Classeroom = require('./src/models/classeroom.model');
const Subject = require('./src/models/subject.model');

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randDate() {
  return new Date(
    2024,
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 28) + 1
  );
}

const raisons = ['maladie','non_justifiee','rdv','autre'];

async function seed() {

  const uri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE_NAME}`;
  await mongoose.connect(uri);
  console.log('Connecté à MongoDB');

  // Nettoyage
  await Absence.deleteMany({});
  await Student.deleteMany({});
  await Classeroom.deleteMany({});
  await Subject.deleteMany({});

  // CLASSEROOMS
  const classData = [
    { name: '3A', level: '3eme', headTeacher: 'Mme Dupont' },
    { name: '3B', level: '3eme', headTeacher: 'M. Martin' },
    { name: '2A', level: '2nde', headTeacher: 'Mme Robert' },
    { name: '1S', level: '1ere', headTeacher: 'M. Bernard' },
    { name: 'T', level: 'Terminale', headTeacher: 'Mme Petit' }
  ];

  const classerooms = await Classeroom.insertMany(classData);

  // SUBJECTS
  const subjectData = [
    { name: 'Maths', coef: 4 },
    { name: 'Français', coef: 4 },
    { name: 'Histoire', coef: 3 },
    { name: 'SVT', coef: 3 },
    { name: 'Anglais', coef: 3 },
    { name: 'Physique', coef: 4 }
  ];

  const subjects = await Subject.insertMany(subjectData);

  // STUDENTS
  const firstNames = ['Alice','Bob','Clara','David','Emma','Felix','Grace','Hugo'];
  const lastNames = ['Martin','Dupont','Bernard','Thomas','Petit','Robert'];

  const students = [];

  for (let i = 0; i < 30; i++) {

    const student = await Student.create({
      firstName: rand(firstNames),
      lastName: rand(lastNames),
      classeroom: rand(classerooms)._id,
      sexe: Math.random() > 0.5 ? 'M' : 'F',
      dateOfBirth: new Date(
        2006 + Math.floor(Math.random() * 4),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      )
    });

    students.push(student);
  }

  // ABSENCES
  for (let i = 0; i < 200; i++) {

    await Absence.create({
      student: rand(students)._id,
      subject: rand(subjects)._id,
      date: randDate(),
      duration: Math.ceil(Math.random() * 6),
      reason: rand(raisons),
      justification: Math.random() > 0.4
    });

  }

  console.log('Seed terminé : 5 classes, 6 matières, 30 élèves, 200 absences créées');

  mongoose.disconnect();
}

seed().catch(console.error);