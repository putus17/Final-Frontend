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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-100 to-blue-200 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-sky-500 to-cyan-700 bg-clip-text">
            User Management
          </h1>
          <p className="text-blue-900 font-light mt-2">Manage DWAS user access and roles</p>
        </div>

        <div className="bg-white/60 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-blue-100">
          <UserList onAddUserClick={onAddUserClick} onEditUser={onEditUser} />
        </div>
      </div>

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
