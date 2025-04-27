export default function UserAvatar({ user }) {
    return (
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 shadow">
        {user && user.profileImage ? (
          <img
            src={user.profileImage}
            alt="User"
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src="/images/user.png"
            alt="Default Logo"
            className="w-full h-full object-cover bg-white"
          />
        )}
      </div>
    );
  }
  