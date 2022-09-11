import { describe, expect, it, test } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment";

describe('Create appointment',()=>{
  it('should be able to create an appointment',()=>{
    const startsAt = getFutureDate('2022-08-10');
    const endsAt = getFutureDate('2022-08-11');

    const appointmentRepository = new InMemoryAppointmentsRepository();
    const sut = new CreateAppointment(appointmentRepository);
    //sut = System Under Test

    expect(sut.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment);
  });

  it('should not to be able to create an appointment with overlapping dates',async ()=>{
    const startsAt = getFutureDate('2022-08-10');
    const endsAt = getFutureDate('2022-08-15');

    const appointmentRepository = new InMemoryAppointmentsRepository();
    const sut = new CreateAppointment(appointmentRepository);
    //sut = System Under Test
    await sut.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    });

    expect(sut.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-08-14'),
      endsAt: getFutureDate('2022-08-18')
    })).rejects.toBeInstanceOf(Error);

    expect(sut.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-08-08'),
      endsAt: getFutureDate('2022-08-12')
    })).rejects.toBeInstanceOf(Error);

    expect(sut.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-08-08'),
      endsAt: getFutureDate('2022-08-18')
    })).rejects.toBeInstanceOf(Error);

    expect(sut.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-08-11'),
      endsAt: getFutureDate('2022-08-12')
    })).rejects.toBeInstanceOf(Error);
  });
})

