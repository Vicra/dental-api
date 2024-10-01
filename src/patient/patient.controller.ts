import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { Prisma, Patient } from '@prisma/client';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async createPatient(
    @Body() createPatientDto: CreatePatientDto,
    @Query('doctorId') doctorId?: string,
  ) {
    return this.patientService.createPatient(createPatientDto, doctorId);
  }

  @Get('')
  async getAllPatients(
    @Query('offset', new DefaultValuePipe(0)) offset: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
    @Query('doctorId') doctorId?: string,
  ): Promise<Patient[]> {
    return this.patientService.getAllPatients(offset, limit, doctorId);
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
