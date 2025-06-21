import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogClose,
} from './ui/dialog'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select'

import { roleGroups } from '../lib/utils'
import { Button } from './ui/button'
import { userSchema } from '../lib/validators'
import { UserRole } from '../lib/constants'
import type { UserFormValues } from '../types'
import { Input } from './ui/input'
import { Label } from './ui/label'

interface UserAddEditProps {
  open: boolean
  closeDialog: () => void
  loading: boolean
  onSubmit: (data: UserFormValues) => void
  initialValues: UserFormValues | null
}

const UserAddEdit: React.FC<UserAddEditProps> = ({
  open,
  closeDialog,
  loading,
  onSubmit,
  initialValues,
}) => {
  const [formData, setFormData] = useState<UserFormValues>({
    _id: '',
    name: '',
    phone: '',
    cid: '',
    role: UserRole.CONSUMER,
    password: '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof UserFormValues, string>>>({})

  useEffect(() => {
    if (open) {
      if (initialValues) {
        setFormData(initialValues)
      } else {
        setFormData({
          _id: '',
          name: '',
          phone: '',
          cid: '',
          role: UserRole.CONSUMER,
          password: '',
        })
      }
      setErrors({})
    }
  }, [open, initialValues])

  const handleChange = (field: keyof UserFormValues, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = userSchema().safeParse(formData)

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof UserFormValues, string>> = {}
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof UserFormValues
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      return
    }

    onSubmit({
      ...formData,
      _id: initialValues?._id || formData._id,
    })

    setFormData({
      _id: '',
      name: '',
      phone: '',
      cid: '',
      role: UserRole.CONSUMER,
      password: '',
    })
    setErrors({})
  }

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent
        className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-gradient-to-br from-[#0e4d64] via-[#0b7285] to-[#38bdf8] backdrop-blur-xl shadow-2xl rounded-2xl border border-cyan-400/30 p-4 sm:p-8 overflow-y-auto max-h-[90vh]"
      >
        <form onSubmit={handleFormSubmit} className="text-white space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-cyan-100 tracking-wide">
            {initialValues ? 'Edit User' : 'Add New User'}
          </h2>

          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(['name', 'cid', 'phone'] as Array<keyof typeof formData>).map((field) => (
              <div key={field} className="flex flex-col col-span-1">
                <Label className="text-cyan-200 mb-1 capitalize font-medium">{field}</Label>
                <Input
                  value={formData[field] || ''}
                  onChange={(e) => handleChange(field, e.target.value)}
                  placeholder={`Enter ${field}`}
                  className={`bg-[#003B5B]/40 border border-cyan-400 text-cyan-100 placeholder-cyan-300 rounded-xl focus:ring-2 focus:ring-cyan-500 ${
                    errors[field] ? 'border-rose-500' : ''
                  }`}
                />
                {errors[field] && (
                  <p className="text-sm mt-1 text-rose-400 italic">{errors[field]}</p>
                )}
              </div>
            ))}

            {/* Password (only when creating a new user) */}
            {!initialValues?._id && (
              <div className="flex flex-col col-span-1 sm:col-span-2">
                <Label className="text-cyan-200 mb-1 font-medium">Password</Label>
                <Input
                  type="password"
                  value={formData.password || ''}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Enter password"
                  className={`bg-[#003B5B]/40 border border-cyan-400 text-cyan-100 placeholder-cyan-300 rounded-xl focus:ring-2 focus:ring-cyan-500 ${
                    errors.password ? 'border-rose-500' : ''
                  }`}
                />
                {errors.password && (
                  <p className="text-sm mt-1 text-rose-400 italic">{errors.password}</p>
                )}
              </div>
            )}
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <Label className="text-cyan-200 mb-1 font-medium">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => handleChange('role', value)}
            >
              <SelectTrigger className="bg-[#003B5B]/40 border border-cyan-400 text-cyan-100 rounded-xl focus:ring-2 focus:ring-cyan-500">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-[#004A6B] border border-cyan-300 text-white z-50">
                {roleGroups.map((group) => (
                  <SelectGroup key={group.label}>
                    <SelectLabel className="text-xs uppercase tracking-wide text-cyan-300 px-3 py-1">
                      {group.label}
                    </SelectLabel>
                    {group.roles.map((role) => (
                      <SelectItem
                        key={role.value}
                        value={role.value}
                        className="hover:bg-cyan-600/40 transition"
                      >
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm mt-1 text-rose-400 italic">{errors.role}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4">
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="w-full sm:w-auto text-cyan-200 hover:bg-cyan-600/30 rounded-lg transition px-4 py-2"
                disabled={loading}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-gradient-to-tr from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition hover:scale-105"
            >
              {initialValues ? 'Update' : 'Add'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UserAddEdit
