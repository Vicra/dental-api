import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { Prisma, Patient } from '@prisma/client';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async createPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.createPatient(createPatientDto);
  }

  @Get('')
  async getAllPatients(
    @Query('doctorId') doctorId?: string,
  ): Promise<Patient[]> {
    return this.patientService.getAllPatients(doctorId);
  }

  @Get(':id')
  async getPatientById(@Param('id') id: string): Promise<Patient | null> {
    return this.patientService.getPatientById(Number(id));
  }

  @Patch(':id')
  async updatePatient(
    @Param('id') id: string,
    @Body() data: Prisma.PatientUpdateInput,
  ): Promise<Patient> {
    return this.patientService.updatePatient(Number(id), data);
  }

  @Delete(':id')
  async deletePatient(@Param('id') id: string): Promise<Patient> {
    return this.patientService.deletePatient(Number(id));
  }
}
