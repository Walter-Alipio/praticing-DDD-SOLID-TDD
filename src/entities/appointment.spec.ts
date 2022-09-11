import {expect, test} from 'vitest';
import { getFutureDate } from '../tests/utils/get-future-date';
import { Appointment } from './appointment';

test('creat an appointment', ()=>{

  const startsAt = getFutureDate('2022-08-10');
  const endsAt = getFutureDate('2022-08-11');


  const appointment = new Appointment({
    customer: 'John Doe',
    startsAt,
    endsAt,
  })

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual('John Doe');
})

test('Cannot create an appointment with end date previews than start date',()=>{
  const startDate = getFutureDate('2022-08-10');
  const endDate = getFutureDate('2022-08-09');


  expect(()=>{
    return new Appointment({
      customer: 'John Doe',
      startsAt: startDate,
      endsAt: endDate,
    })
  }).toThrow();
});

test('Cannot create an appointment with start date before now',()=>{
  const startDate = new Date();
  const endDate = new Date();
  startDate.setDate(startDate.getDate() - 1);
  endDate.setDate(endDate.getDate() + 3);

  expect(()=>{
    return new Appointment({
          customer: 'John Doe',
    startsAt: startDate,
    endsAt: endDate,
    })
  }).toThrow();
});