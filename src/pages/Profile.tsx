{
  /**
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-md mx-auto p-6 mt-10 shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {user && (
        <div className="mb-4">
          <p><strong>Phone:</strong> {user.phoneNumber}</p>
          <p><strong>UID:</strong> {user.uid}</p>
        </div>
      )}
      <button
        onClick={() => logout()}
        className="py-2 px-4 rounded bg-red-600 text-white"
      >
        Logout
      </button>
    </div>
  );
};

 */
}

//export default Profile;

const Profile = () => {
  return (
    <>
      <div className="display-flex align-top">This is Profile Page</div>
    </>
  );
};

export default Profile;
