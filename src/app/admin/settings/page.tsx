'use client';

import { useState } from 'react';
import { Save, Store, Truck, CreditCard, Mail } from 'lucide-react';
import { defaultSettings } from '@/lib/data/seed';
import type { PaymentMethod, StoreSettings } from '@/types';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<StoreSettings>(defaultSettings);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('store');

  function update<K extends keyof StoreSettings>(key: K, value: StoreSettings[K]) {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function updateSocial(platform: keyof StoreSettings['socialLinks'], value: string) {
    setSettings((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));
    setSaved(false);
  }

  function togglePayment(method: PaymentMethod) {
    setSettings((prev) => ({
      ...prev,
      enabledPaymentMethods: prev.enabledPaymentMethods.includes(method)
        ? prev.enabledPaymentMethods.filter((m) => m !== method)
        : [...prev.enabledPaymentMethods, method],
    }));
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const tabs = [
    { id: 'store', label: 'Store', icon: Store },
    { id: 'shipping', label: 'Shipping & Tax', icon: Truck },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'email', label: 'Email & Social', icon: Mail },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal">Settings</h1>
          <p className="text-sm text-warm-gray">Manage your store configuration</p>
        </div>
        <button onClick={handleSave} className="btn-primary flex items-center gap-2 text-sm">
          <Save size={16} /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm border-b-2 -mb-px transition-all ${
                activeTab === tab.id
                  ? 'border-gold text-charcoal font-medium'
                  : 'border-transparent text-warm-gray hover:text-charcoal'
              }`}>
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Store Tab */}
      {activeTab === 'store' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
          <div>
            <label className="block text-sm text-warm-gray mb-1">Store Name</label>
            <input type="text" value={settings.storeName}
              onChange={(e) => update('storeName', e.target.value)}
              className="input-luxury w-full" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-warm-gray mb-1">Currency</label>
              <input type="text" value={settings.currency}
                onChange={(e) => update('currency', e.target.value)}
                className="input-luxury w-full" />
            </div>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Timezone</label>
              <input type="text" value={settings.timezone}
                onChange={(e) => update('timezone', e.target.value)}
                className="input-luxury w-full" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-warm-gray mb-1">Footer Text</label>
            <input type="text" value={settings.footerText}
              onChange={(e) => update('footerText', e.target.value)}
              className="input-luxury w-full" />
          </div>
        </div>
      )}

      {/* Shipping & Tax Tab */}
      {activeTab === 'shipping' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
          <div>
            <label className="block text-sm text-warm-gray mb-1">Free Shipping Threshold (₹)</label>
            <input type="number" value={settings.freeShippingThreshold}
              onChange={(e) => update('freeShippingThreshold', Number(e.target.value))}
              className="input-luxury w-full" />
            <p className="text-xs text-warm-gray mt-1">Orders above this amount get free shipping.</p>
          </div>
          <div>
            <label className="block text-sm text-warm-gray mb-1">GST Rate (%)</label>
            <input type="number" value={settings.gstRate}
              onChange={(e) => update('gstRate', Number(e.target.value))}
              className="input-luxury w-full" />
          </div>
          <div className="p-4 bg-cream rounded-lg">
            <h3 className="font-medium text-sm text-charcoal mb-2">Shipping Methods</h3>
            <div className="space-y-2 text-sm text-warm-gray">
              <div className="flex justify-between"><span>Standard (5-7 days)</span><span>₹99</span></div>
              <div className="flex justify-between"><span>Express (2-3 days)</span><span>₹249</span></div>
              <div className="flex justify-between"><span>Same Day (select cities)</span><span>₹499</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Tab */}
      {activeTab === 'payment' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
          <h3 className="font-medium text-charcoal">Enabled Payment Methods</h3>
          <div className="space-y-3">
            {(['upi', 'card', 'netbanking', 'cod'] as PaymentMethod[]).map((method) => (
              <label key={method} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-charcoal uppercase">{method}</p>
                  <p className="text-xs text-warm-gray">
                    {method === 'upi' && 'Google Pay, PhonePe, Paytm'}
                    {method === 'card' && 'Visa, Mastercard, Rupay'}
                    {method === 'netbanking' && 'All major banks'}
                    {method === 'cod' && 'Cash on Delivery'}
                  </p>
                </div>
                <input type="checkbox" checked={settings.enabledPaymentMethods.includes(method)}
                  onChange={() => togglePayment(method)} className="rounded border-gray-300 w-5 h-5" />
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Email & Social Tab */}
      {activeTab === 'email' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
          <div>
            <label className="block text-sm text-warm-gray mb-1">Contact Email</label>
            <input type="email" value={settings.contactEmail}
              onChange={(e) => update('contactEmail', e.target.value)}
              className="input-luxury w-full" />
          </div>
          <hr className="border-gray-100" />
          <h3 className="font-medium text-charcoal">Social Media Links</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-warm-gray mb-1">Instagram</label>
              <input type="url" value={settings.socialLinks.instagram}
                onChange={(e) => updateSocial('instagram', e.target.value)}
                className="input-luxury w-full" placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Facebook</label>
              <input type="url" value={settings.socialLinks.facebook}
                onChange={(e) => updateSocial('facebook', e.target.value)}
                className="input-luxury w-full" placeholder="https://facebook.com/..." />
            </div>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Pinterest</label>
              <input type="url" value={settings.socialLinks.pinterest}
                onChange={(e) => updateSocial('pinterest', e.target.value)}
                className="input-luxury w-full" placeholder="https://pinterest.com/..." />
            </div>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Twitter / X</label>
              <input type="url" value={settings.socialLinks.twitter}
                onChange={(e) => updateSocial('twitter', e.target.value)}
                className="input-luxury w-full" placeholder="https://x.com/..." />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
