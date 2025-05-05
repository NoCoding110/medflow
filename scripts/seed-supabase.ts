import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDatabase() {
  try {
    console.log('Starting Supabase seeding...');

    // Clear existing data
    await supabase.from('doctor_notes').delete().neq('id', '');
    await supabase.from('doctor_reminders').delete().neq('id', '');
    await supabase.from('patient_appointments').delete().neq('id', '');
    await supabase.from('doctor_patients').delete().neq('id', '');
    await supabase.from('doctors').delete().neq('id', '');
    await supabase.from('patients').delete().neq('id', '');

    // Insert test doctors
    const { error: doctorsError } = await supabase
      .from('doctors')
      .insert([
        {
          id: '11111111-1111-1111-1111-111111111111',
          email: 'sarah@medflow.com',
          password_hash: 'hashed_password_here',
          first_name: 'Sarah',
          last_name: 'Johnson',
          specialization: 'Internal Medicine',
          license_number: 'MD123456',
          phone_number: '+1 (555) 123-4567',
          profile_image: 'https://example.com/sarah-johnson.jpg',
          status: 'active'
        },
        {
          id: '22222222-2222-2222-2222-222222222222',
          email: 'john@medflow.com',
          password_hash: 'hashed_password_here',
          first_name: 'John',
          last_name: 'Smith',
          specialization: 'Cardiology',
          license_number: 'MD789012',
          phone_number: '+1 (555) 987-6543',
          profile_image: 'https://example.com/john-smith.jpg',
          status: 'active'
        }
      ]);

    if (doctorsError) throw doctorsError;

    // Insert test patients
    const { error: patientsError } = await supabase
      .from('patients')
      .insert([
        {
          id: '44444444-4444-4444-4444-444444444444',
          user_id: '33333333-3333-3333-3333-333333333333',
          first_name: 'Jane',
          last_name: 'Doe',
          date_of_birth: '1980-01-01',
          gender: 'Female',
          phone: '+1 (555) 111-2222',
          address: '123 Main St, Anytown, USA',
          emergency_contact_name: 'John Doe',
          emergency_contact_relationship: 'Spouse',
          emergency_contact_phone: '+1 (555) 111-3333',
          insurance_provider: 'Blue Cross',
          insurance_policy_number: 'BC123456',
          insurance_group_number: 'GRP789',
          insurance_contact_number: '+1 (555) 111-4444',
          status: 'active'
        },
        {
          id: '55555555-5555-5555-5555-555555555555',
          user_id: '66666666-6666-6666-6666-666666666666',
          first_name: 'Bob',
          last_name: 'Wilson',
          date_of_birth: '1975-05-15',
          gender: 'Male',
          phone: '+1 (555) 222-3333',
          address: '456 Oak Ave, Somewhere, USA',
          emergency_contact_name: 'Mary Wilson',
          emergency_contact_relationship: 'Spouse',
          emergency_contact_phone: '+1 (555) 222-4444',
          insurance_provider: 'Aetna',
          insurance_policy_number: 'AE789012',
          insurance_group_number: 'GRP456',
          insurance_contact_number: '+1 (555) 222-5555',
          status: 'active'
        }
      ]);

    if (patientsError) throw patientsError;

    // Link doctors to patients
    const { error: doctorPatientsError } = await supabase
      .from('doctor_patients')
      .insert([
        { doctor_id: '11111111-1111-1111-1111-111111111111', patient_id: '44444444-4444-4444-4444-444444444444' },
        { doctor_id: '11111111-1111-1111-1111-111111111111', patient_id: '55555555-5555-5555-5555-555555555555' },
        { doctor_id: '22222222-2222-2222-2222-222222222222', patient_id: '44444444-4444-4444-4444-444444444444' }
      ]);

    if (doctorPatientsError) throw doctorPatientsError;

    // Insert test appointments
    const { error: appointmentsError } = await supabase
      .from('patient_appointments')
      .insert([
        {
          doctor_id: '11111111-1111-1111-1111-111111111111',
          patient_id: '44444444-4444-4444-4444-444444444444',
          date: '2024-03-20',
          time: '09:00',
          type: 'checkup',
          status: 'scheduled',
          notes: 'Annual physical examination'
        },
        {
          doctor_id: '11111111-1111-1111-1111-111111111111',
          patient_id: '55555555-5555-5555-5555-555555555555',
          date: '2024-03-20',
          time: '10:30',
          type: 'follow-up',
          status: 'scheduled',
          notes: 'Diabetes management follow-up'
        },
        {
          doctor_id: '22222222-2222-2222-2222-222222222222',
          patient_id: '44444444-4444-4444-4444-444444444444',
          date: '2024-03-21',
          time: '14:00',
          type: 'consultation',
          status: 'scheduled',
          notes: 'Cardiac consultation'
        }
      ]);

    if (appointmentsError) throw appointmentsError;

    // Insert test reminders
    const { error: remindersError } = await supabase
      .from('doctor_reminders')
      .insert([
        {
          doctor_id: '11111111-1111-1111-1111-111111111111',
          patient_id: '44444444-4444-4444-4444-444444444444',
          title: 'Review lab results',
          description: 'Review and follow up on patient lab results from last week',
          due_date: '2024-03-19',
          priority: 'high',
          status: 'pending'
        },
        {
          doctor_id: '11111111-1111-1111-1111-111111111111',
          patient_id: '55555555-5555-5555-5555-555555555555',
          title: 'Update patient records',
          description: 'Update electronic health records for patients seen today',
          due_date: '2024-03-20',
          priority: 'medium',
          status: 'pending'
        }
      ]);

    if (remindersError) throw remindersError;

    // Insert test notes
    const { error: notesError } = await supabase
      .from('doctor_notes')
      .insert([
        {
          doctor_id: '11111111-1111-1111-1111-111111111111',
          patient_id: '44444444-4444-4444-4444-444444444444',
          title: 'Treatment plan update',
          content: 'Patient showing good progress with new medication. Continue current treatment plan.'
        },
        {
          doctor_id: '11111111-1111-1111-1111-111111111111',
          patient_id: '55555555-5555-5555-5555-555555555555',
          title: 'Follow-up required',
          content: 'Patient needs additional testing for diabetes management.'
        }
      ]);

    if (notesError) throw notesError;

    console.log('Supabase seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding Supabase:', error);
    process.exit(1);
  }
}

seedDatabase(); 