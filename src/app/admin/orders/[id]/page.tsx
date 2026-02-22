'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import { sampleOrders } from '@/lib/data/seed';
import { formatPrice, formatDate, formatDateTime } from '@/lib/utils';
import type { FulfillmentStatus } from '@/types';

const STATUS_STEPS: FulfillmentStatus[] = ['pending', 'processing', 'shipped', 'delivered'];

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const order = sampleOrders.find((o) => o.id === orderId);
  const [currentStatus, setCurrentStatus] = useState<FulfillmentStatus>(order?.fulfillmentStatus ?? 'pending');

  if (!order) {
    return (
      <div className="text-center py-20">
        <h1 className="text-xl font-semibold mb-2">Order Not Found</h1>
        <Link href="/admin/orders" className="text-gold hover:underline text-sm">Back to Orders</Link>
      </div>
    );
  }

  const statusIdx = STATUS_STEPS.indexOf(currentStatus);

  function updateStatus(newStatus: FulfillmentStatus) {
    setCurrentStatus(newStatus);
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/orders" className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft size={20} /></Link>
          <div>
            <h1 className="text-2xl font-semibold text-charcoal">{order.orderNumber}</h1>
            <p className="text-sm text-warm-gray">Placed on {formatDate(order.createdAt)}</p>
          </div>
        </div>
        <select value={currentStatus} onChange={(e) => updateStatus(e.target.value as FulfillmentStatus)}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gold">
          {STATUS_STEPS.map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Progress */}
      {currentStatus !== 'cancelled' && (
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            {STATUS_STEPS.map((step, idx) => {
              const isComplete = idx <= statusIdx;
              const isCurrent = idx === statusIdx;
              const Icon = idx === 0 ? Clock : idx === 1 ? Package : idx === 2 ? Truck : CheckCircle;
              return (
                <div key={step} className="flex-1 flex flex-col items-center relative">
                  {idx > 0 && (
                    <div className={`absolute top-4 right-1/2 w-full h-0.5 -translate-y-1/2 ${
                      idx <= statusIdx ? 'bg-gold' : 'bg-gray-200'
                    }`} />
                  )}
                  <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                    isComplete ? 'bg-gold text-white' : 'bg-gray-100 text-gray-400'
                  } ${isCurrent ? 'ring-2 ring-gold/30' : ''}`}>
                    <Icon size={16} />
                  </div>
                  <p className={`text-xs mt-2 capitalize ${isComplete ? 'text-charcoal font-medium' : 'text-warm-gray'}`}>
                    {step}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="font-semibold text-charcoal mb-4">Order Items</h2>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-14 h-14 rounded bg-cream border border-gray-100 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-charcoal text-sm">{item.productName}</p>
                  <p className="text-xs text-warm-gray">
                    {item.metalType.replace('-', ' ')}
                    {item.ringSize ? ` · Size ${item.ringSize}` : ''}
                    {` · Qty: ${item.quantity}`}
                  </p>
                </div>
                <p className="font-medium text-sm">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          {/* Totals */}
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-warm-gray">Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
            {order.discount > 0 && (
              <div className="flex justify-between"><span className="text-warm-gray">Discount</span><span className="text-green-600">-{formatPrice(order.discount)}</span></div>
            )}
            <div className="flex justify-between"><span className="text-warm-gray">Shipping</span><span>{formatPrice(order.shippingCost)}</span></div>
            <div className="flex justify-between"><span className="text-warm-gray">Tax</span><span>{formatPrice(order.tax)}</span></div>
            <div className="flex justify-between font-semibold text-base pt-2 border-t border-gray-100">
              <span>Total</span><span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="font-semibold text-charcoal mb-3">Customer</h3>
            <p className="text-sm font-medium">{order.customerName}</p>
            <p className="text-sm text-warm-gray">{order.customerEmail}</p>
            <p className="text-sm text-warm-gray">{order.customerPhone}</p>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="font-semibold text-charcoal mb-3 flex items-center gap-2">
              <MapPin size={16} /> Shipping Address
            </h3>
            <p className="text-sm">{order.shippingAddress.name}</p>
            <p className="text-sm text-warm-gray">{order.shippingAddress.addressLine1}</p>
            {order.shippingAddress.addressLine2 && <p className="text-sm text-warm-gray">{order.shippingAddress.addressLine2}</p>}
            <p className="text-sm text-warm-gray">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
            </p>
            <p className="text-sm text-warm-gray mt-2">Method: <span className="capitalize">{order.shippingMethod}</span></p>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="font-semibold text-charcoal mb-3">Payment</h3>
            <p className="text-sm">Method: <span className="uppercase">{order.paymentMethod}</span></p>
            <p className="text-sm">Status: <span className="capitalize">{order.paymentStatus}</span></p>
            {order.couponCode && <p className="text-sm mt-1">Coupon: <span className="font-mono text-gold">{order.couponCode}</span></p>}
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="font-semibold text-charcoal mb-3">Timeline</h3>
            <div className="space-y-3">
              {order.timeline.map((entry, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium capitalize">{entry.status}</p>
                    <p className="text-xs text-warm-gray">{formatDateTime(entry.timestamp)}</p>
                    {entry.note && <p className="text-xs text-warm-gray mt-0.5">{entry.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
