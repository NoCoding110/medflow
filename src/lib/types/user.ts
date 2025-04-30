
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'nurse' | 'admin' | 'staff' | 'patient';
  avatar?: string;
}
