import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Patient } from '@prisma/client';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async createPatient(createPatientDto: CreatePatientDto) {
    const { address, ...patientData } = createPatientDto;

    const patientExists = await this.prisma.patient.findUnique({
      where: {
        email: patientData.email,
      },
    });

    if (!patientExists) {
      const patient = await this.prisma.patient.create({
        data: {
          ...patientData,
          address: {
            create: {
              ...address,
            },
          },
        },
        include: {
          address: true,
        },
      });
      return patient;
    } else {
      throw new BadRequestException('Email already exists', {
        cause: new Error(),
        description: 'Try using a different email',
      });
    }
  }

  // Get a list of all patients
  async getAllPatients(doctorId?: string): Promise<any[]> {
    if (doctorId) {
      return this.prisma.patient.findMany({
        select: {
          id: true,
          name: true,
          sex: true,
          email: true,
          phone: true,
          dob: true,
          address: {
            select: {
              street: true,
              city: true,
              country: true,
              phone: true,
            },
          },
        },
        where: {
          userId: doctorId,
        },
      });
    } else {
      return this.prisma.patient.findMany({
        select: {
          id: true,
          name: true,
          sex: true,
          email: true,
          phone: true,
          dob: true,
          address: {
            select: {
              street: true,
              city: true,
              country: true,
              phone: true,
            },
          },
        },
      });
    }
  }

  // Get a single patient by ID
  async getPatientById(id: number): Promise<any | null> {
    return this.prisma.patient.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        sex: true,
        email: true,
        phone: true,
        dob: true,
        address: {
          select: {
            street: true,
            city: true,
            country: true,
            phone: true,
          },
        },
      },
    });
  }

  // Update a patient
  async updatePatient(
    id: number,
    data: Prisma.PatientUpdateInput,
  ): Promise<Patient> {
    return this.prisma.patient.update({
      where: { id },
      data,
    });
  }

  // Delete a patient
  async deletePatient(id: number): Promise<Patient> {
    return this.prisma.patient.delete({
      where: { id },
    });
  }
}
