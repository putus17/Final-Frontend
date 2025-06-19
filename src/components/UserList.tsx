import { useEffect, useState } from 'react'
import { Button } from '../components/ui/button'
import { useUserStore } from '../store/useAuthStore'
import { Edit, Trash2, Users } from 'lucide-react'
import { getRoleBadgeColor } from '../lib/utils'
import { ConfirmDialog } from './ConfirmationDialog'
import { UserRole } from '../lib/constants'

interface User {
  _id: string
  name: string
  cid: string
  phone?: string
  role?: UserRole
}

interface UserListProps {
  onAddUserClick: () => void
  onEditUser: (user: User) => void
}

const UserList = ({ onAddUserClick, onEditUser }: UserListProps) => {
  const { user, users, fetchUsers, deleteUser, loading } = useUserStore()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string } | null>(null)

  const hasAdminPrivileges = user?.role === UserRole.SUPER_ADMIN

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleDeleteClick = (id: string, name: string) => {
    setSelectedUser({ id, name })
    setDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (selectedUser) {
      await deleteUser(selectedUser.id)
      await fetchUsers()
      setDialogOpen(false)
      setSelectedUser(null)
    }
  }

  const cancelDelete = () => {
    setDialogOpen(false)
    setSelectedUser(null)
  }

  return (
    <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#012B44] via-[#005C8D] to-[#007EA7] text-white rounded-2xl shadow-2xl overflow-hidden border border-[#00A9CE]/30">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#005C8D] to-[#007EA7] px-8 py-6 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-2 rounded-full shadow">
            <Users size={24} className="text-cyan-200" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-wider text-cyan-100">DWAS · Users</h2>
            <p className="text-sm text-cyan-300">Manage roles & profiles in the DWAS of data</p>
          </div>
        </div>
        {hasAdminPrivileges && (
          <Button onClick={onAddUserClick} className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold shadow">
            + Add User
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="px-6 py-6 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div>
              <div className="w-8 h-8 mx-auto mb-3 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-cyan-200">Loading users...</p>
            </div>
          </div>
        ) : users.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <Users size={40} className="mx-auto mb-2 text-cyan-300" />
              <p className="text-cyan-200">No users found</p>
            </div>
          </div>
        ) : (
          <table className="w-full text-sm border-collapse rounded-lg overflow-hidden">
            <thead className="bg-[#003D5C] text-cyan-100 text-xs uppercase tracking-widest">
              <tr>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Role</th>
                {hasAdminPrivileges && (
                  <th className="px-4 py-3 text-right">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-700/30">
              {users.map((u) => {
                const role = u.role ?? 'unknown'
                const isCurrentUser = user?._id === u._id

                return (
                  <tr
                    key={u._id}
                    className={`transition duration-150 ${
                      isCurrentUser
                        ? 'bg-cyan-900/40'
                        : 'hover:bg-cyan-700/20'
                    }`}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 flex items-center justify-center bg-cyan-500 text-white text-sm font-bold rounded-full shadow">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="leading-tight">
                          <p className="font-medium">{u.name}</p>
                          <p className="text-xs text-cyan-200/70">CID: {u.cid}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p>{u.phone || '-'}</p>
                      <p className="text-xs text-cyan-200/60">Mobile</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getRoleBadgeColor(role)}`}>
                        {role}
                      </span>
                    </td>
                    {hasAdminPrivileges && (
                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-cyan-300 hover:text-cyan-100"
                            onClick={() => onEditUser(u as User)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-600"
                            onClick={() => handleDeleteClick(u._id, u.name)}
                            disabled={isCurrentUser}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={dialogOpen}
        title={`Delete ${selectedUser?.name}?`}
        description="This action is irreversible."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  )
}

export default UserList
