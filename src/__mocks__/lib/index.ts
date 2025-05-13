import { mockDb } from '../../lib/mock/db';

// Export the mock database as supabase
export const supabase = mockDb;
export default supabase;

// Export other lib modules
export * from '../../lib/auth';
export * from '../../lib/utils'; 