import { mockUsers, mockAppointments, mockMedicalRecords } from './data';

// Helper function to simulate async operations
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class MockDB {
  private users = [...mockUsers];
  private appointments = [...mockAppointments];
  private medicalRecords = [...mockMedicalRecords];

  // Auth methods
  auth = {
    signIn: async (email: string, password: string) => {
      await delay(500); // Simulate network delay
      const user = this.users.find(u => u.email === email);
      if (!user) throw new Error('User not found');
      return { user, session: { access_token: 'mock-token' } };
    },

    signOut: async () => {
      await delay(300);
      return { error: null };
    },

    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      // Simulate auth state change
      return () => {}; // Return unsubscribe function
    }
  };

  // Database methods
  from = (table: string) => ({
    select: (query?: string) => ({
      eq: (column: string, value: any) => ({
        data: async () => {
          await delay(300);
          switch (table) {
            case 'users':
              return this.users.filter(u => u[column] === value);
            case 'appointments':
              return this.appointments.filter(a => a[column] === value);
            case 'medical_records':
              return this.medicalRecords.filter(m => m[column] === value);
            default:
              return [];
          }
        }
      }),
      data: async () => {
        await delay(300);
        switch (table) {
          case 'users':
            return this.users;
          case 'appointments':
            return this.appointments;
          case 'medical_records':
            return this.medicalRecords;
          default:
            return [];
        }
      }
    }),

    insert: (data: any) => ({
      data: async () => {
        await delay(500);
        const newItem = { id: String(Date.now()), ...data };
        switch (table) {
          case 'users':
            this.users.push(newItem);
            break;
          case 'appointments':
            this.appointments.push(newItem);
            break;
          case 'medical_records':
            this.medicalRecords.push(newItem);
            break;
        }
        return newItem;
      }
    }),

    update: (data: any) => ({
      eq: (column: string, value: any) => ({
        data: async () => {
          await delay(500);
          switch (table) {
            case 'users':
              this.users = this.users.map(u => 
                u[column] === value ? { ...u, ...data } : u
              );
              break;
            case 'appointments':
              this.appointments = this.appointments.map(a => 
                a[column] === value ? { ...a, ...data } : a
              );
              break;
            case 'medical_records':
              this.medicalRecords = this.medicalRecords.map(m => 
                m[column] === value ? { ...m, ...data } : m
              );
              break;
          }
          return { data: null, error: null };
        }
      })
    }),

    delete: () => ({
      eq: (column: string, value: any) => ({
        data: async () => {
          await delay(500);
          switch (table) {
            case 'users':
              this.users = this.users.filter(u => u[column] !== value);
              break;
            case 'appointments':
              this.appointments = this.appointments.filter(a => a[column] !== value);
              break;
            case 'medical_records':
              this.medicalRecords = this.medicalRecords.filter(m => m[column] !== value);
              break;
          }
          return { data: null, error: null };
        }
      })
    })
  });
}

export const mockDb = new MockDB(); 