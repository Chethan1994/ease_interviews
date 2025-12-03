import React, { useState, useEffect } from 'react';
import { CreditCard, Lock, CheckCircle, X, ShieldCheck, Loader2 } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  price: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess, price }) => {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setCardNumber('');
      setExpiry('');
      setCvc('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber.replace(/\s/g, '').length < 16 || expiry.length < 5 || cvc.length < 3) {
        setError('Please enter valid card details.');
        return;
    }
    
    setError('');
    setStep('processing');
    
    // Simulate API delay
    setTimeout(() => {
        setStep('success');
        setTimeout(() => {
            onSuccess();
            onClose();
        }, 1500);
    }, 2000);
  };

  // Simple formatting helpers
  const formatCard = (val: string) => {
    return val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  };
  
  const formatExpiry = (val: string) => {
    return val.replace(/\D/g, '').replace(/(.{2})/, '$1/').trim().slice(0, 5);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={step !== 'processing' ? onClose : undefined}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-100 p-6 flex justify-between items-center">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                Secure Checkout
            </div>
            {step === 'form' && (
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-5 h-5" />
                </button>
            )}
        </div>

        {/* Body */}
        <div className="p-6">
            {step === 'form' && (
                <form onSubmit={handlePay} className="space-y-5">
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Total Amount</p>
                            <p className="text-3xl font-extrabold text-slate-900">{price}</p>
                        </div>
                        <div className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">
                            Monthly Subscription
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Card Number</label>
                            <div className="relative">
                                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input 
                                    type="text" 
                                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono text-slate-700 transition-all"
                                    placeholder="0000 0000 0000 0000"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(formatCard(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Expiry</label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono text-slate-700 text-center transition-all"
                                    placeholder="MM/YY"
                                    value={expiry}
                                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">CVC</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <input 
                                        type="password" 
                                        maxLength={3}
                                        className="w-full pl-9 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono text-slate-700 transition-all"
                                        placeholder="123"
                                        value={cvc}
                                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg flex items-center gap-2">
                            <X className="w-4 h-4" /> {error}
                        </div>
                    )}

                    <div className="pt-2">
                        <button 
                            type="submit"
                            className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold shadow-lg shadow-primary-500/25 transition-all active:scale-[0.98] flex justify-center items-center gap-2"
                        >
                            <Lock className="w-4 h-4" /> Pay {price}
                        </button>
                        <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                            <Lock className="w-3 h-3" /> Encrypted with 256-bit SSL
                        </p>
                    </div>
                </form>
            )}

            {step === 'processing' && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-slate-100 border-t-primary-600 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-primary-600" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Processing Payment...</h3>
                        <p className="text-slate-500 text-sm mt-1">Please do not close this window.</p>
                    </div>
                </div>
            )}

            {step === 'success' && (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-50 duration-300">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">Payment Successful!</h3>
                        <p className="text-slate-500 mt-2">Welcome to DevPrep Premium.</p>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};