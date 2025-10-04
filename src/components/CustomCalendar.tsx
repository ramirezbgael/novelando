import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface CalendarProps {
  onBookingComplete: (data: BookingData) => void;
}

interface BookingData {
  date: string;
  time: string;
  name: string;
  phone: string;
}

const CustomCalendar: React.FC<CalendarProps> = ({ onBookingComplete }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [step, setStep] = useState<'date' | 'time' | 'details'>('date');

  // Simulación de fechas disponibles (próximos 14 días, excluyendo fines de semana)
  const getAvailableDates = () => {
    const dates: Date[] = [];
    const today = new Date();
    today.setDate(today.getDate() + 1); // Empezar desde mañana

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Excluir fines de semana (sábado = 6, domingo = 0)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(new Date(date));
      }
    }
    return dates;
  };

  // Horarios disponibles (simulados)
  const getTimeSlots = (date: Date): TimeSlot[] => {
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    if (isWeekend) return [];

    const slots: TimeSlot[] = [
      { time: '09:00', available: true },
      { time: '10:00', available: true },
      { time: '11:00', available: true },
      { time: '12:00', available: false }, // Simulando hora ocupada
      { time: '14:00', available: true },
      { time: '15:00', available: true },
      { time: '16:00', available: false }, // Simulando hora ocupada
      { time: '17:00', available: true },
    ];

    return slots;
  };

  const availableDates = getAvailableDates();
  const timeSlots = selectedDate ? getTimeSlots(selectedDate) : [];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setStep('time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('details');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Solo números
    if (value.length > 10) {
      setPhoneError('El número no debe tener más de 10 dígitos');
    } else {
      setPhoneError('');
    }
    setPhone(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime && name && phone) {
      onBookingComplete({
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        name,
        phone
      });
    }
  };

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedTime('');
    setName('');
    setPhone('');
    setPhoneError('');
    setStep('date');
  };

  return (
    <div className="bg-black/20 rounded-lg p-4 max-w-full">
      <AnimatePresence mode="wait">
        {step === 'date' && (
          <motion.div
            key="date"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                Selecciona una fecha
              </h3>
              <p className="text-white/70 text-sm">
                Próximas fechas disponibles
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto nv-scroll-hide">
              {availableDates.map((date, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleDateSelect(date)}
                  className="text-left p-3 rounded-lg border border-white/10 hover:border-gold/50 hover:bg-white/5 transition-all duration-200 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-white font-medium">
                    {date.toLocaleDateString('es-ES', { 
                      weekday: 'short', 
                      day: 'numeric', 
                      month: 'short' 
                    })}
                  </div>
                  <div className="text-white/60 text-sm">
                    {date.toLocaleDateString('es-ES', { year: 'numeric' })}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'time' && selectedDate && (
          <motion.div
            key="time"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setStep('date')}
                className="text-white/60 hover:text-white transition-colors"
              >
                <i className="fa-solid fa-arrow-left" />
              </button>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Selecciona una hora
                </h3>
                <p className="text-white/70 text-sm">
                  {formatDate(selectedDate)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((slot, index) => (
                <motion.button
                  key={index}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                  disabled={!slot.available}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    slot.available
                      ? 'border-white/20 hover:border-gold/50 hover:bg-white/5 text-white cursor-pointer'
                      : 'border-white/10 bg-white/5 text-white/40 cursor-not-allowed'
                  }`}
                  whileHover={slot.available ? { scale: 1.02 } : {}}
                  whileTap={slot.available ? { scale: 0.98 } : {}}
                >
                  <div className="font-medium">
                    {slot.time}
                  </div>
                  {!slot.available && (
                    <div className="text-xs mt-1">
                      Ocupado
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'details' && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setStep('time')}
                className="text-white/60 hover:text-white transition-colors"
              >
                <i className="fa-solid fa-arrow-left" />
              </button>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Completa tus datos
                </h3>
                <p className="text-white/70 text-sm">
                  {formatDate(selectedDate!)} a las {selectedTime}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-gold/50 focus:outline-none transition-colors"
                  placeholder="Ingresa tu nombre"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Número de teléfono
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                  maxLength={10}
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-gold/50 focus:outline-none transition-colors"
                  placeholder="1234567890"
                />
                {phoneError && (
                  <div className="text-red-400 text-xs mt-1">{phoneError}</div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetBooking}
                  className="flex-1 p-3 rounded-lg border border-white/20 text-white/80 hover:bg-white/5 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 p-3 rounded-lg nv-gradient-gold text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Confirmar cita
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCalendar;
