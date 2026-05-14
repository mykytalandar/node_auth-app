import type { ProfileUser } from "../../../types/User";

type Props = {
  user: ProfileUser;
}

export const ProfileChangePassword: React.FC<Props> = () => {
  return (
    <div className="profile-information">
      <h3>Change password</h3>
    </div>
  );
}
