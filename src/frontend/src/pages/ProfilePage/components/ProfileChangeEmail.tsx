import type { ProfileUser } from '../../../types/User';

type Props = {
  user: ProfileUser;
};

export const ProfileChangeEmail: React.FC<Props> = () => {
  return (
    <div className="profile-information">
      <h3>Change email</h3>
    </div>
  );
};
