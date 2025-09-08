import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      Alert.alert('Success', 'Your message has been sent successfully!');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <LinearGradient
      colors={['#4C1D95', '#7E22CE', '#1D4ED8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Contact <Text style={styles.titleAccent}>Us</Text>
          </Text>
          <Text style={styles.subtitle}>
            Have questions or want to collaborate? We'd love to hear from you.
          </Text>
        </View>

        {/* Contact Card */}
        <View style={styles.contactCard}>
          <View style={styles.cardContent}>

            {/* Contact Info */}
            <LinearGradient
              colors={['#7C3AED', '#4C1D95']}
              style={styles.contactInfo}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Get in Touch</Text>
                <View style={styles.infoList}>
                  {/* Email */}
                  <View style={styles.infoItem}>
                    <View style={styles.iconContainer}>
                      <Ionicons name="mail" size={20} color="#fff" />
                    </View>
                    <View style={styles.infoText}>
                      <Text style={styles.infoLabel}>Email</Text>
                      <Text style={styles.infoValue}>contact@example.com</Text>
                    </View>
                  </View>

                  {/* Phone */}
                  <View style={styles.infoItem}>
                    <View style={styles.iconContainer}>
                      <Ionicons name="call" size={20} color="#fff" />
                    </View>
                    <View style={styles.infoText}>
                      <Text style={styles.infoLabel}>Phone</Text>
                      <Text style={styles.infoValue}>+1 (555) 123-4567</Text>
                    </View>
                  </View>

                  {/* Address */}
                  <View style={styles.infoItem}>
                    <View style={styles.iconContainer}>
                      <Ionicons name="location" size={20} color="#fff" />
                    </View>
                    <View style={styles.infoText}>
                      <Text style={styles.infoLabel}>Address</Text>
                      <Text style={styles.infoValue}>
                        123 Business Ave, Suite 400{'\n'}San Francisco, CA 94107
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </LinearGradient>

            {/* Contact Form */}
            <View style={styles.contactForm}>
              <Text style={styles.formTitle}>Send us a message</Text>

              {/* Name Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Name</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person" size={20} color="#8B5CF6" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, errors.name && styles.inputError]}
                    placeholder="Your name"
                    value={formData.name}
                    onChangeText={(text) => handleChange('name', text)}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
              </View>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="mail" size={20} color="#8B5CF6" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChangeText={(text) => handleChange('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              {/* Message Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Message</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="chatbubble" size={20} color="#8B5CF6" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.textArea, errors.message && styles.inputError]}
                    placeholder="Write your message..."
                    value={formData.message}
                    onChangeText={(text) => handleChange('message', text)}
                    multiline
                    numberOfLines={5}
                    textAlignVertical="top"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}
              </View>

              {/* Submit Button */}
              <LinearGradient
                colors={['#8B5CF6', '#4C1D95']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitButton}
              >
                <TouchableOpacity
                  style={styles.submitButtonTouchable}
                  onPress={handleSubmit}
                >
                  <Ionicons name="send" size={20} color="#fff" style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Send Message</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  titleContainer: {
    alignItems: 'center',
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  titleAccent: {
    color: '#FBBF24',
  },
  subtitle: {
    fontSize: 18,
    color: '#E5E7EB',
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 24,
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    margin: 16,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#EDE9FE',
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: width > 768 ? 'row' : 'column',
  },
  contactInfo: {
    padding: 40,
    flex: 1,
  },
  infoContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 32,
  },
  infoList: {
    gap: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 24,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#E9D5FF',
    lineHeight: 20,
  },
  contactForm: {
    padding: 40,
    flex: 2,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD6FE',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginLeft: 12,
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 16,
    paddingLeft: 8,
    fontSize: 16,
    color: '#1F2937',
  },
  textArea: {
    flex: 1,
    padding: 16,
    paddingLeft: 8,
    fontSize: 16,
    height: 120,
    color: '#1F2937',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    borderRadius: 12,
    marginTop: 8,
    overflow: 'hidden',
  },
  submitButtonTouchable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Contact;