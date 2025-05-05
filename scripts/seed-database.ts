import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs';

const execAsync = promisify(exec);

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // Read the seed file
    const seedFilePath = path.join(__dirname, '../supabase/seed.sql');
    const seedFile = fs.readFileSync(seedFilePath, 'utf8');

    // Execute the seed file using psql
    const { stdout, stderr } = await execAsync(
      `psql ${process.env.DATABASE_URL} -f ${seedFilePath}`
    );

    if (stderr) {
      console.error('Error seeding database:', stderr);
      process.exit(1);
    }

    console.log('Database seeded successfully!');
    console.log(stdout);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 