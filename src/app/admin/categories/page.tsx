'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, GripVertical } from 'lucide-react';
import { categories as seedCategories } from '@/lib/data/seed';
import type { Category } from '@/types';
import { generateId } from '@/lib/utils';

export default function AdminCategoriesPage() {
  const [categoryList, setCategoryList] = useState<Category[]>(seedCategories);
  const [editing, setEditing] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  function addCategory() {
    if (!newName.trim()) return;
    const slug = newName.toLowerCase().replace(/\s+/g, '-');
    setCategoryList((prev) => [
      ...prev,
      {
        id: generateId(),
        name: newName,
        slug,
        description: newDescription,
        parentId: null,
        coverImage: '',
        displayOrder: prev.length + 1,
        isActive: true,
      },
    ]);
    setNewName('');
    setNewDescription('');
    setShowNew(false);
  }

  function startEdit(cat: Category) {
    setEditing(cat.id);
    setEditName(cat.name);
    setEditDescription(cat.description);
  }

  function saveEdit(id: string) {
    setCategoryList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: editName, description: editDescription } : c))
    );
    setEditing(null);
  }

  function deleteCategory(id: string) {
    setCategoryList((prev) => prev.filter((c) => c.id !== id));
  }

  function toggleActive(id: string) {
    setCategoryList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal">Categories</h1>
          <p className="text-sm text-warm-gray">{categoryList.length} categories</p>
        </div>
        <button onClick={() => setShowNew(true)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> Add Category
        </button>
      </div>

      {/* New Category Form */}
      {showNew && (
        <div className="bg-white rounded-lg border border-gold p-5 space-y-3">
          <h3 className="font-semibold text-charcoal">New Category</h3>
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)}
            placeholder="Category name" className="input-luxury w-full" autoFocus />
          <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Description (optional)" className="input-luxury w-full" />
          <div className="flex gap-2">
            <button onClick={addCategory} disabled={!newName.trim()} className="btn-primary text-sm disabled:opacity-50">Save</button>
            <button onClick={() => { setShowNew(false); setNewName(''); setNewDescription(''); }}
              className="btn-outline text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Category List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {categoryList.map((cat) => (
          <div key={cat.id} className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
            <GripVertical size={16} className="text-gray-300 shrink-0 cursor-grab" />
            <div className="w-12 h-12 rounded bg-cream border border-gray-100 shrink-0 overflow-hidden">
              {cat.coverImage ? (
                <img src={cat.coverImage} alt={cat.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-warm-gray flex items-center justify-center w-full h-full">{cat.name.charAt(0)}</span>
              )}
            </div>

            {editing === cat.id ? (
              <div className="flex-1 space-y-2">
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)}
                  className="input-luxury w-full" />
                <input type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)}
                  className="input-luxury w-full" placeholder="Description" />
                <div className="flex gap-2">
                  <button onClick={() => saveEdit(cat.id)} className="btn-primary text-xs">Save</button>
                  <button onClick={() => setEditing(null)} className="btn-outline text-xs">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-charcoal">{cat.name}</p>
                  {!cat.isActive && (
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Inactive</span>
                  )}
                </div>
                <p className="text-sm text-warm-gray truncate">{cat.description}</p>
                <p className="text-xs text-warm-gray mt-0.5">/{cat.slug}</p>
              </div>
            )}

            {editing !== cat.id && (
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => toggleActive(cat.id)}
                  className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                    cat.isActive ? 'border-green-300 text-green-700 bg-green-50' : 'border-gray-200 text-gray-500'
                  }`}>
                  {cat.isActive ? 'Active' : 'Inactive'}
                </button>
                <button onClick={() => startEdit(cat)} className="p-1.5 text-warm-gray hover:text-charcoal rounded">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => deleteCategory(cat.id)} className="p-1.5 text-warm-gray hover:text-red-500 rounded">
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
