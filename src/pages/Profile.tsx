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

const Profile: React.FC = () => {
  const user = {
    name: "xyz ",
    email: "xyz@email.com",
    address: "xyz, Indore, India",
    avtar:
      " https://w7.pngwing.com/pngs/1000/665/png-transparent-computer-icons-profile-s-free-angle-sphere-profile-cliparts-free.png",
  };

  const recentOrders = [
    {
      id: 1,
      product: "Wireless Headphones",
      date: "2025-08-10",
      status: "Delivered",
      price: ` 1999`,
      image: "https://dummyjson.com/image/i/products/11/1.jpg",
    },
    {
      id: 2,
      product: "Men's Casual Shirt",
      date: "2025-08-08",
      status: "Shipped",
      price: ` 899`,
      image: "https://dummyjson.com/image/i/products/54/1.jpg",
    },
    {
      id: 3,
      product: "Smartphone",
      date: "2025-08-05",
      status: "Processing",
      price: ` 12999`,
      image: "https://dummyjson.com/image/i/products/2/1.jpg",
    },
  ];
  return (
    <>
      <div className="p-6 flex flex-col items-center">
        {/**Profile Card */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 w-full max-w-md text-center">
          {/**Avatar */}
          <img
            src={user.avtar}
            alt="User avtar"
            className="w-28 h-28 rounded-full mx-auto border-4 border-purple-500 shadow"
          />

          {/**Name */}
          <h1 className="mt-4 text-2xl font-bold text-purple-600">
            {user.name}
          </h1>

          {/**Email */}
          <p className="mt-2 text-gray-500 dark:text-gray-300"> {user.email}</p>

          {/**Address */}
          <p className="mt-2 text-gray-500 dark:text-gray-300">
            {user.address}
          </p>

          {/**Edit Button */}
          <button className="mt-2 px-3  text-gray-500 dark:text-gray-300 bg-purple-500 rounded-md">
            Edit Profile
          </button>
        </div>

        {/**Recent Orders */}
        {/* Recent Orders */}
        <div className="w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">
            Recent Orders
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 flex flex-col"
              >
                <img
                  src={order.image}
                  alt={order.product}
                  className="h-32 w-full object-contain rounded-md"
                />
                <h3 className="mt-2 font-bold text-gray-800 dark:text-gray-200">
                  {order.product}
                </h3>
                <p className="text-sm text-gray-500">{order.date}</p>
                <p
                  className={`mt-1 text-sm font-semibold ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Shipped"
                      ? "text-blue-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </p>
                <p className="mt-2 font-bold text-purple-600"> ₹{order.price}</p>
              </div>
            ))}
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default Profile;
