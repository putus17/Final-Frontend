import { useState } from 'react';
import { toast } from 'react-toastify';
import { useUserStore } from '../../store/useAuthStore';
import UserList from '../../components/UserList';
import type { UserFormValues, UserType } from '../../types';
import UserAddEdit from '../../components/UserAddEdit';

const UserManagement = () => {
  const { addUser, updateUser, loading } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserFormValues | null>(null);

  const onSubmit = async (data: UserFormValues) => {
    setIsLoading(true);
    try {
      if (editingUser) {
        await updateUser(editingUser._id, data);
      } else {
        await addUser({
          name: data.name!,
          cid: data.cid!,
          phone: data.phone!,
          password: data.password,
          role: data.role,
        });
      }
      setDialogOpen(false);
      setEditingUser(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Operation failed in User');
    } finally {
      setIsLoading(false);
    }
  };

  const onAddUserClick = () => {
    setEditingUser(null);
    setDialogOpen(true);
  };

  const onEditUser = (user: UserType) => {
    setEditingUser(user);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8 bg-gradient-to-br from-[#004e92] via-[#00c6a7] to-[#f0fdfa]">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text">
            User Management
          </h1>
          <p className="text-white text-sm sm:text-base font-light mt-1 sm:mt-2">
            Manage DWAS user access and roles
          </p>
        </div>

        {/* User List Card */}
        <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
          <UserList onAddUserClick={onAddUserClick} onEditUser={onEditUser} />
        </div>
      </div>

      {/* Dialog Component */}
      <UserAddEdit
        open={dialogOpen}
        closeDialog={closeDialog}
        loading={isLoading || loading}
        onSubmit={onSubmit}
        initialValues={editingUser}
        key={editingUser?._id || 'new-user'}
      />
    </div>
  );
};

export default UserManagement;
