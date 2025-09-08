import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
  Modal,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PhotographyBookingApp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);

  // Sample data with INR prices
  const services = [
    {
      id: 1,
      title: 'Wedding Photography',
      price: 185000,
      duration: '8-10 hours',
      description: 'Capture your special day with comprehensive wedding coverage including ceremony, reception, and couple portraits.',
      features: [
        'Full day coverage',
        '2 photographers',
        '500+ edited photos',
        'Online gallery',
        'Print release',
        'Engagement session'
      ]
    },
    {
      id: 2,
      title: 'Commercial Photography',
      price: 89000,
      duration: '3-4 hours',
      description: 'Professional photography for businesses, products, and marketing materials.',
      features: [
        'Professional lighting',
        'Product staging',
        'High-resolution images',
        'Basic retouching',
        'Fast turnaround'
      ]
    },
    {
      id: 3,
      title: 'Portrait Session',
      price: 26000,
      duration: '1-2 hours',
      description: 'Individual or family portraits in a location of your choice.',
      features: [
        '1 location',
        '20 edited photos',
        'Online gallery',
        'Print release',
        'Outfit changes'
      ]
    }
  ];

  // Generate calendar data for any month
// Generate calendar data for any month
const generateCalendar = (month, year) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const days = [];
  
  // Add empty days for the first week
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: null, available: false, date: null });
  }
  
  // Add days of the month - ALL DAYS ARE AVAILABLE
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ 
      day: i, 
      available: true, // All days are available
      date: new Date(year, month, i) 
    });
  }
  
  // Fill the remaining cells to complete the grid (6 rows x 7 columns)
  while (days.length < 42) {
    days.push({ day: null, available: false, date: null });
  }
  
  return days;
};
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM'
  ];

  const calendarDays = generateCalendar(currentMonth, currentYear);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCompleteBooking();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDateSelect = (day, date) => {
    if (day && day !== null) {
      setSelectedDay(day);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      setSelectedDate(date.toLocaleDateString('en-US', options));
    }
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
    // Reset selection when changing months
    setSelectedDay(null);
    setSelectedDate(null);
  };

  const clearSelection = () => {
    if (currentStep === 1) {
      setSelectedService(null);
    } else if (currentStep === 2) {
      setSelectedDate(null);
      setSelectedDay(null);
    } else if (currentStep === 3) {
      setSelectedTime(null);
    } else if (currentStep === 4) {
      setUserDetails({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: ''
      });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleCompleteBooking = async () => {
    setIsLoading(true);
    
    // Validate required fields
    if (!userDetails.firstName || !userDetails.email || !userDetails.phone || !userDetails.location || !selectedService) {
      setErrorMessage('Please provide: serviceName, firstName, email, phone, location');
      setShowErrorModal(true);
      setIsLoading(false);
      return;
    }

    // Prepare booking data
    const bookingData = {
      serviceName: selectedService.title,
      serviceDuration: selectedService.duration,
      servicePrice: selectedService.price,
      date: selectedDate,
      time: selectedTime,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      phone: userDetails.phone,
      location: userDetails.location,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch('https://studio-musu-photography.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setShowSuccessModal(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to create booking. Please try again.');
        setShowErrorModal(true);
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your connection and try again.');
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const resetBooking = () => {
    setCurrentStep(1);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedDay(null);
    setSelectedTime(null);
    setUserDetails({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: ''
    });
    setShowSuccessModal(false);
  };

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.serviceItem,
        selectedService?.id === item.id && styles.selectedService
      ]}
      onPress={() => setSelectedService(item)}
    >
      <View style={styles.serviceHeader}>
        <Text style={styles.serviceTitle}>{item.title}</Text>
        <Text style={styles.servicePrice}>{formatPrice(item.price)}</Text>
      </View>
      <Text style={styles.serviceDuration}>{item.duration}</Text>
      <Text style={styles.serviceDescription}>{item.description}</Text>

      <View style={styles.featuresContainer}>
        {item.features.slice(0, 3).map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Ionicons name="checkmark" size={16} color="#4CAF50" />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
        {item.features.length > 3 && (
          <Text style={styles.moreFeatures}>+{item.features.length - 3} more features</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setSelectedService(item)}
      >
        <Text style={styles.selectButtonText}>
          {selectedService?.id === item.id ? 'Selected' : 'Select Service'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderCalendarDay = (day, index) => {
    if (day.day === null) {
      return <View key={index} style={styles.calendarDayEmpty} />;
    }

    const isSelected = selectedDay === day.day;

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.calendarDay,
          !day.available && styles.calendarDayUnavailable,
          isSelected && styles.calendarDaySelected
        ]}
        onPress={() => day.available && handleDateSelect(day.day, day.date)}
        disabled={!day.available}
      >
        <Text style={[
          styles.calendarDayText,
          !day.available && styles.calendarDayTextUnavailable,
          isSelected && styles.calendarDayTextSelected
        ]}>
          {day.day}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderTimeSlot = (time, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.timeSlot,
        selectedTime === time && styles.timeSlotSelected
      ]}
      onPress={() => setSelectedTime(time)}
    >
      <Text style={[
        styles.timeSlotText,
        selectedTime === time && styles.timeSlotTextSelected
      ]}>
        {time}
      </Text>
    </TouchableOpacity>
  );

  const BookingSummary = () => (
    <View style={styles.bookingSummary}>
      <Text style={styles.summaryTitle}>Booking Summary</Text>

      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Service:</Text>
        <Text style={styles.summaryValue}>
          {selectedService ? selectedService.title : 'Not selected'}
        </Text>
      </View>

      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Duration:</Text>
        <Text style={styles.summaryValue}>
          {selectedService ? selectedService.duration : 'Not selected'}
        </Text>
      </View>

      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Date:</Text>
        <Text style={styles.summaryValue}>
          {selectedDate || 'Not selected'}
        </Text>
      </View>

      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Time:</Text>
        <Text style={styles.summaryValue}>
          {selectedTime || 'Not selected'}
        </Text>
      </View>

      {selectedService && (
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Price:</Text>
          <Text style={[styles.summaryValue, styles.priceValue]}>
            {formatPrice(selectedService.price)}
          </Text>
        </View>
      )}
    </View>
  );

  const isStepComplete = () => {
    switch(currentStep) {
      case 1: return selectedService !== null;
      case 2: return selectedDate !== null;
      case 3: return selectedTime !== null;
      case 4: return userDetails.firstName && userDetails.email && 
                   userDetails.phone && userDetails.location;
      default: return false;
    }
  };

  const hasSelection = () => {
    switch(currentStep) {
      case 1: return selectedService !== null;
      case 2: return selectedDate !== null;
      case 3: return selectedTime !== null;
      case 4: return userDetails.firstName || userDetails.lastName || 
                   userDetails.email || userDetails.phone || userDetails.location;
      default: return false;
    }
  };

  // Get month name
  const getMonthName = (month) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Book Your Photography Session</Text>
        <Text style={styles.headerSubtitle}>
          Schedule your perfect photography session in just a few simple steps.
          Choose your service, pick a date, and we'll take care of the rest.
        </Text>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressStep, currentStep >= 1 && styles.progressStepActive]}>
          <Text style={[styles.progressStepText, currentStep >= 1 && styles.progressStepTextActive]}>
            1
          </Text>
        </View>
        <View style={[styles.progressLine, currentStep >= 2 && styles.progressLineActive]} />
        <View style={[styles.progressStep, currentStep >= 2 && styles.progressStepActive]}>
          <Text style={[styles.progressStepText, currentStep >= 2 && styles.progressStepTextActive]}>
            2
          </Text>
        </View>
        <View style={[styles.progressLine, currentStep >= 3 && styles.progressLineActive]} />
        <View style={[styles.progressStep, currentStep >= 3 && styles.progressStepActive]}>
          <Text style={[styles.progressStepText, currentStep >= 3 && styles.progressStepTextActive]}>
            3
          </Text>
        </View>
        <View style={[styles.progressLine, currentStep >= 4 && styles.progressLineActive]} />
        <View style={[styles.progressStep, currentStep >= 4 && styles.progressStepActive]}>
          <Text style={[styles.progressStepText, currentStep >= 4 && styles.progressStepTextActive]}>
            4
          </Text>
        </View>
      </View>

      {/* Clear selection button */}
      {hasSelection() && (
        <TouchableOpacity style={styles.clearButton} onPress={clearSelection}>
          <Ionicons name="close-circle" size={16} color="#666" />
          <Text style={styles.clearButtonText}>Clear Selection</Text>
        </TouchableOpacity>
      )}

      {/* Main content with ScrollView */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {currentStep === 1 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Select Service</Text>
            <Text style={styles.stepSubtitle}>Choose your photography service</Text>

            <FlatList
              data={services}
              renderItem={renderServiceItem}
              keyExtractor={item => item.id.toString()}
              style={styles.servicesList}
              scrollEnabled={false}
            />
          </View>
        )}

        {currentStep === 2 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Pick Date</Text>
            <Text style={styles.stepSubtitle}>Select your preferred date</Text>

            <View style={styles.calendarContainer}>
              <View style={styles.calendarHeader}>
                <TouchableOpacity onPress={() => navigateMonth('prev')}>
                  <Ionicons name="chevron-back" size={24} color="#4A90E2" />
                </TouchableOpacity>
                
                <Text style={styles.calendarTitle}>
                  {getMonthName(currentMonth)} {currentYear}
                </Text>
                
                <TouchableOpacity onPress={() => navigateMonth('next')}>
                  <Ionicons name="chevron-forward" size={24} color="#4A90E2" />
                </TouchableOpacity>
              </View>

              <View style={styles.calendarWeekdays}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <Text key={day} style={styles.calendarWeekdayText}>{day}</Text>
                ))}
              </View>

              <View style={styles.calendarGrid}>
                {calendarDays.map((day, index) => renderCalendarDay(day, index))}
              </View>

              <View style={styles.calendarLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, styles.legendSelected]} />
                  <Text style={styles.legendText}>Selected</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, styles.legendAvailable]} />
                  <Text style={styles.legendText}>Available</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, styles.legendUnavailable]} />
                  <Text style={styles.legendText}>Unavailable</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {currentStep === 3 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Choose Time</Text>
            <Text style={styles.stepSubtitle}>Pick available time slot</Text>

            <View style={styles.timeSelectionContainer}>
              <Text style={styles.timeSelectionTitle}>
                Available times for {selectedDate || 'selected date'}
              </Text>

              <View style={styles.timeSlotsContainer}>
                {timeSlots.map((time, index) => renderTimeSlot(time, index))}
              </View>

              <Text style={styles.timeNote}>
                All times are in your local timezone. Sessions typically run 15 minutes over the scheduled time.
              </Text>
            </View>
          </View>
        )}

        {currentStep === 4 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Your Details</Text>
            <Text style={styles.stepSubtitle}>Provide contact information</Text>

            <View style={styles.formContainer}>
              <Text style={styles.formSectionTitle}>Contact Information</Text>
              <Text style={styles.formSectionSubtitle}>
                Please provide your details so we can confirm your booking
              </Text>

              <TextInput
                style={styles.input}
                placeholder="First Name *"
                placeholderTextColor="#999"
                value={userDetails.firstName}
                onChangeText={(text) => setUserDetails({ ...userDetails, firstName: text })}
              />

              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="#999"
                value={userDetails.lastName}
                onChangeText={(text) => setUserDetails({ ...userDetails, lastName: text })}
              />

              <TextInput
                style={styles.input}
                placeholder="Email Address *"
                placeholderTextColor="#999"
                keyboardType="email-address"
                value={userDetails.email}
                onChangeText={(text) => setUserDetails({ ...userDetails, email: text })}
              />
              <Text style={styles.inputNote}>We'll send booking confirmation to this email</Text>

              <TextInput
                style={styles.input}
                placeholder="Phone Number *"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={userDetails.phone}
                onChangeText={(text) => setUserDetails({ ...userDetails, phone: text })}
              />
              <Text style={styles.inputNote}>We may call to confirm details</Text>

              <TextInput
                style={styles.input}
                placeholder="Preferred Location *"
                placeholderTextColor="#999"
                value={userDetails.location}
                onChangeText={(text) => setUserDetails({ ...userDetails, location: text })}
              />
              <Text style={styles.inputNote}>Studio, your location, or outdoor venue</Text>
            </View>
          </View>
        )}

        <BookingSummary />
      </ScrollView>

      <View style={styles.footer}>
        {currentStep > 1 ? (
          <TouchableOpacity
            style={[styles.navButton, styles.prevButton]}
            onPress={handlePrevious}
          >
            <Text style={styles.navButtonText}>
              Previous
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.navButtonPlaceholder} />
        )}

        <Text style={styles.stepIndicator}>Step {currentStep} of 4</Text>

        <TouchableOpacity
          style={[styles.navButton, styles.nextButton, !isStepComplete() && styles.navButtonDisabled]}
          onPress={handleNext}
          disabled={!isStepComplete() || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.navButtonText}>
              {currentStep === 4 ? 'Book Now' : 'Next'}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
            </View>
            <Text style={styles.modalTitle}>Booking Confirmed!</Text>
            <Text style={styles.modalText}>
              Your photography session has been successfully booked. 
              A confirmation email has been sent to {userDetails.email}.
            </Text>
            <Text style={styles.bookingIdText}>Booking ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</Text>
            
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={resetBooking}
              >
                <Text style={styles.modalButtonText}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Error Modal */}
      <Modal
        visible={showErrorModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowErrorModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.errorModal}>
            <View style={styles.errorIcon}>
              <Ionicons name="close-circle" size={60} color="#F44336" />
            </View>
            <Text style={styles.modalTitle}>Booking Failed</Text>
            <Text style={styles.modalText}>
              {errorMessage}
            </Text>
            
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.errorModalButton]}
                onPress={() => setShowErrorModal(false)}
              >
                <Text style={styles.modalButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    padding: 30,
    paddingTop: 70,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f8f9fa',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    textAlign: 'center',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  progressStep: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressStepActive: {
    backgroundColor: '#4A90E2',
  },
  progressStepText: {
    color: '#888',
    fontWeight: 'bold',
  },
  progressStepTextActive: {
    color: '#fff',
  },
  progressLine: {
    height: 2,
    width: 40,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
  },
  progressLineActive: {
    backgroundColor: '#4A90E2',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  clearButtonText: {
    marginLeft: 5,
    color: '#666',
    fontSize: 14,
  },
  stepContainer: {
    marginBottom: 30,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  servicesList: {
    marginBottom: 20,
  },
  serviceItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedService: {
    borderColor: '#4A90E2',
    backgroundColor: '#edf4ff',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  serviceDuration: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
    lineHeight: 20,
  },
  featuresContainer: {
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  featureText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555',
  },
  moreFeatures: {
    fontSize: 14,
    color: '#4A90E2',
    marginTop: 5,
  },
  selectButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  calendarContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  calendarWeekdays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  calendarWeekdayText: {
    fontWeight: 'bold',
    color: '#666',
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 15,
  },
  calendarDayEmpty: {
    width: 40,
    height: 40,
    margin: 5,
  },
  calendarDay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#f0f0f0',
  },
  calendarDayUnavailable: {
    backgroundColor: '#f9f9f9',
  },
  calendarDaySelected: {
    backgroundColor: '#4A90E2',
  },
  calendarDayText: {
    color: '#333',
  },
  calendarDayTextUnavailable: {
    color: '#ccc',
  },
  calendarDayTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  calendarLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendSelected: {
    backgroundColor: '#4A90E2',
  },
  legendAvailable: {
    backgroundColor: '#f0f0f0',
  },
  legendUnavailable: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#eee',
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  timeSelectionContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  timeSelectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  timeSlot: {
    width: '48%',
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  timeSlotSelected: {
    backgroundColor: '#4A90E2',
  },
  timeSlotText: {
    color: '#333',
    fontWeight: '500',
  },
  timeSlotTextSelected: {
    color: '#fff',
  },
  timeNote: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  formContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  formSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  formSectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 5,
    fontSize: 16,
  },
  inputNote: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
    marginLeft: 5,
  },
  bookingSummary: {
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#d1e7ff',
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  priceValue: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  prevButton: {
    backgroundColor: '#6c757d',
  },
  nextButton: {
    backgroundColor: '#e24a4a',
  },
  navButtonDisabled: {
    backgroundColor: '#ccc',
  },
  navButtonPlaceholder: {
    minWidth: 100,
  },
  navButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepIndicator: {
    color: '#666',
    fontWeight: '500',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successModal: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  errorModal: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  successIcon: {
    marginBottom: 15,
  },
  errorIcon: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
    lineHeight: 22,
  },
  bookingIdText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4A90E2',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    minWidth: 150,
    alignItems: 'center',
  },
  errorModalButton: {
    backgroundColor: '#F44336',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PhotographyBookingApp;