import React, { useState,useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Loader2 } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDetails = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.join(', ') || '',
    file: null,
  });
    useEffect(() => {
    if (open && user) {
      setForm({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.profile?.bio || '',
        skills: user?.profile?.skills?.join(', ') || '',
        file: null,
      });
    }
  }, [open, user]);

  const handleChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fileChangeHandler = e => {
    const file = e.target.files?.[0];
    if (file) {
      setForm(prev => ({
        ...prev,
        file,
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullname', form.fullname);
    formData.append('email', form.email);
    formData.append('phoneNumber', form.phoneNumber);
    formData.append('bio', form.bio);
    formData.append(
      'skills',
      JSON.stringify(
        form.skills
          .split(',')
          .map(skill => skill.trim())
          .filter(skill => skill !== '')
      )
    );

    if (form.file) {
      formData.append('file', form.file);
    }

    setLoading(true);
    try {
    const res = await axios.post(
  `${USER_API_END_POINT}/profile/update`,
  formData,
  {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true, // <-- this is required!
  }
);

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    'bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500';

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

        <Dialog.Content
          className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-[90vw] max-w-[700px] 
          rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800
          p-6 sm:p-8 shadow-2xl text-white space-y-6"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-2xl font-bold text-sky-400">Update Profile</Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </Dialog.Close>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                name="bio"
                rows={2}
                value={form.bio}
                onChange={handleChange}
                className={`w-full p-2 rounded-md resize-none ${inputStyle}`}
              />
            </div>

            <div>
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Input
                id="skills"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div>
              <Label htmlFor="file">Upload Resume</Label>
              <Input
                id="file"
                name="file"
                type="file"
                onChange={fileChangeHandler}
                className={`file:bg-sky-600 file:text-white file:border-0
                  file:px-4 file:py-1 file:rounded-md hover:file:bg-sky-700 ${inputStyle}`}
              />
            </div>

            <div>
              {loading ? (
                <Button disabled className="w-full flex items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Updating...
                </Button>
              ) : (
                <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700">
                  Update
                </Button>
              )}
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UpdateProfileDetails;
