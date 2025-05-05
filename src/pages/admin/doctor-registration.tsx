import React from 'react';
import { useAuth } from '@/lib/auth';
import DoctorRegistrationForm from '@/components/admin/DoctorRegistrationForm';
import { useNavigate } from 'react-router-dom';

const DoctorRegistrationPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if user is admin
  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Doctor Registration</h1>
      <DoctorRegistrationForm />
    </div>
  );
};

export default DoctorRegistrationPage; 