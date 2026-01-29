import React, { useState } from 'react';
import { Button } from './Button';
import { Job, JobType } from '../types';
import { LOCATIONS } from '../constants';
import { X, Briefcase, MapPin, DollarSign, Building2 } from 'lucide-react';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (job: Job) => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({ isOpen, onClose, onPost }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: LOCATIONS[0],
    salaryRange: '',
    type: JobType.FULL_TIME,
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      postedAt: new Date(),
      tags: ['Yangi']
    };
    onPost(newJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-