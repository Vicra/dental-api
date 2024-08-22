import { PrismaClient, Role, Specialties, Sex } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Addresses
  const address1 = await prisma.address.create({
    data: {
      street: '123 Main St',
      city: 'Springfield',
      country: 'USA',
      phone: '555-1234',
    },
  });

  const address2 = await prisma.address.create({
    data: {
      street: '456 Elm St',
      city: 'Springfield',
      country: 'USA',
      phone: '555-5678',
    },
  });

  // Seed Locations
  const location1 = await prisma.location.create({
    data: {
      name: 'Springfield Clinic',
      addressId: address1.id,
    },
  });

  const location2 = await prisma.location.create({
    data: {
      name: 'Downtown Hospital',
      addressId: address2.id,
    },
  });

  // Seed Users (Doctors)
  const doctor1 = await prisma.user.create({
    data: {
      email: 'doctor1@example.com',
      name: 'Dr. Smith',
      role: Role.DOCTOR,
      specialty: Specialties.CARDIOLOGY,
    },
  });

  const doctor2 = await prisma.user.create({
    data: {
      email: 'doctor2@example.com',
      name: 'Dr. Jones',
      role: Role.DOCTOR,
      specialty: Specialties.DERMATOLOGY,
    },
  });

  // Seed Patients
  const patient1 = await prisma.patient.create({
    data: {
      name: 'John Doe',
      sex: Sex.MALE,
      email: 'john.doe@example.com',
      phone: '555-9999',
      dob: new Date('1985-01-01'),
      addressId: address1.id,
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      name: 'Jane Doe',
      sex: Sex.FEMALE,
      email: 'jane.doe@example.com',
      phone: '555-8888',
      dob: new Date('1990-02-02'),
      addressId: address2.id,
    },
  });

  // Seed Medications
  const medication1 = await prisma.medication.create({
    data: {
      sku: 'MED123',
      name: 'Aspirin',
    },
  });

  const medication2 = await prisma.medication.create({
    data: {
      sku: 'MED456',
      name: 'Ibuprofen',
    },
  });

  // Seed Prescriptions
  const prescription1 = await prisma.prescription.create({
    data: {
      patientAge: 35,
      drugs: {
        create: [
          {
            medicationId: medication1.id,
            amount: 30,
            dose: '100mg',
            observation: 'Take once daily',
          },
          {
            medicationId: medication2.id,
            amount: 20,
            dose: '200mg',
            observation: 'Take twice daily',
          },
        ],
      },
    },
  });

  // Seed Appointments
  await prisma.appointment.create({
    data: {
      patientId: patient1.id,
      doctorId: doctor1.id,
      dateTime: new Date('2024-08-25T10:00:00Z'),
      locationId: location1.id,
      prescriptionId: prescription1.id,
    },
  });

  await prisma.appointment.create({
    data: {
      patientId: patient2.id,
      doctorId: doctor2.id,
      dateTime: new Date('2024-08-26T14:00:00Z'),
      locationId: location2.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
