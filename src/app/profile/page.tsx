'use client';
import { useUser } from '@/lib/hooks/useUser';
import { useRouter } from 'next/navigation';
import ProfileForm from './profileform'; // Assuming profileForm is the correct component name

const YourProfile = () => {
  const { user } = useUser();
  const router = useRouter();
  if (!user) {
    router.push('/login');
    return null; // or return a loading spinner or a message
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <ProfileForm user={user} />
    </div>
  );
};

export default YourProfile;
