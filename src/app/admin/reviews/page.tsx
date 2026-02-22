'use client';

import { useState } from 'react';
import { Star, Check, X, MessageSquare } from 'lucide-react';
import { reviews as seedReviews, products } from '@/lib/data/seed';
import { formatDate } from '@/lib/utils';
import type { Review } from '@/types';

export default function AdminReviewsPage() {
  const [reviewList, setReviewList] = useState<Review[]>(seedReviews);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const filtered = reviewList.filter((r) => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  const pendingCount = reviewList.filter((r) => r.status === 'pending').length;

  function approveReview(id: string) {
    setReviewList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'approved' as const } : r))
    );
  }

  function rejectReview(id: string) {
    setReviewList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'rejected' as const } : r))
    );
  }

  function submitReply(id: string) {
    if (!replyText.trim()) return;
    setReviewList((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, adminReply: replyText }
          : r
      )
    );
    setReplyingTo(null);
    setReplyText('');
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal">Reviews</h1>
          <p className="text-sm text-warm-gray">
            {reviewList.length} total · {pendingCount} pending moderation
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => {
          const count = f === 'all' ? reviewList.length : reviewList.filter((r) => r.status === f).length;
          return (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                filter === f ? 'bg-charcoal text-white' : 'bg-white border border-gray-200 text-warm-gray hover:border-gold'
              }`}>
              {f.charAt(0).toUpperCase() + f.slice(1)} ({count})
            </button>
          );
        })}
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        {filtered.map((review) => {
          const product = products.find((p) => p.id === review.productId);
          return (
            <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold text-sm font-medium shrink-0">
                  {review.customerName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="font-medium text-charcoal">{review.customerName}</span>
                      <span className="text-xs text-warm-gray ml-2">on {product?.name ?? 'Unknown Product'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${
                        review.status === 'approved' ? 'bg-green-50 text-green-700' :
                        review.status === 'rejected' ? 'bg-red-50 text-red-700' :
                        'bg-yellow-50 text-yellow-700'
                      }`}>
                        {review.status}
                      </span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14}
                        className={i < review.rating ? 'fill-gold text-gold' : 'text-gray-200'} />
                    ))}
                    <span className="text-xs text-warm-gray ml-2">{formatDate(review.createdAt)}</span>
                  </div>

                  <p className="text-sm text-warm-gray">{review.text}</p>

                  {/* Admin Reply */}
                  {review.adminReply && (
                    <div className="mt-3 p-3 bg-gold/5 rounded-lg border border-gold/20">
                      <p className="text-xs font-medium text-gold mb-1">Admin Reply</p>
                      <p className="text-sm text-charcoal">{review.adminReply}</p>
                    </div>
                  )}

                  {/* Reply Form */}
                  {replyingTo === review.id && (
                    <div className="mt-3 space-y-2">
                      <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..." rows={3}
                        className="input-luxury w-full resize-none text-sm" autoFocus />
                      <div className="flex gap-2">
                        <button onClick={() => submitReply(review.id)}
                          disabled={!replyText.trim()} className="btn-primary text-xs disabled:opacity-50">
                          Send Reply
                        </button>
                        <button onClick={() => { setReplyingTo(null); setReplyText(''); }}
                          className="btn-outline text-xs">Cancel</button>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-3">
                    {review.status === 'pending' && (
                      <>
                        <button onClick={() => approveReview(review.id)}
                          className="flex items-center gap-1 px-3 py-1 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
                          <Check size={12} /> Approve
                        </button>
                        <button onClick={() => rejectReview(review.id)}
                          className="flex items-center gap-1 px-3 py-1 text-xs bg-red-50 text-red-700 rounded-lg hover:bg-red-100">
                          <X size={12} /> Reject
                        </button>
                      </>
                    )}
                    {replyingTo !== review.id && !review.adminReply && (
                      <button onClick={() => setReplyingTo(review.id)}
                        className="flex items-center gap-1 px-3 py-1 text-xs bg-gray-50 text-warm-gray rounded-lg hover:bg-gray-100">
                        <MessageSquare size={12} /> Reply
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-warm-gray text-sm">No reviews found.</div>
      )}
    </div>
  );
}
