import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Patient } from '@prisma/client';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  // Create a new patient
  async createPatient(data: Prisma.PatientCreateInput): Promise<Patient> {
    return this.prisma.patient.create({
      data,
    });
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
