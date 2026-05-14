import { CircleUserRound } from "lucide-react";
import type { ProfileUser } from "../../../types/User";

type Props = {
  user: ProfileUser;
}

export const ProfileInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="profile-information">
      <h3 className="profile-title">Profile information</h3>
      <div className="profile-container">
        <CircleUserRound size={80} />
        <div className="profile-values">
          <span className="profile-text">Name</span>
          <span>
            <strong>{user.name}</strong>
          </span>
          <span className="profile-text">Email</span>
          <span>
            <strong>{user.email}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
