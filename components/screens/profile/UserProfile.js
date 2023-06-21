import { useAuth } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const { user } = useUser();

  return (
    <div className={styles.userProfile}>
      <h2>User Profile</h2>
      {user ? (
        <div className={styles.userProfileData}>
          <img src={user.picture} />
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p className={styles.userProfileData}>
          Please log in to view your profile.
        </p>
      )}
    </div>
  );
};

export default UserProfile;
