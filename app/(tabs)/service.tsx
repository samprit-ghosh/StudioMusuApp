import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window'); // ✅ Only keep this once

const ServicePage = () => {
  const navigation = useNavigation();

  const services = [
    {
      id: 1,
      name: "Wedding Photography",
      description: "Capture your special day with comprehensive wedding coverage including ceremony, reception, and couple portraits.",
      price: 2500,
      duration: "8-10 hours",
      popular: true,
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
      features: [
        "Full day coverage",
        "2 photographers",
        "500+ edited photos",
        "Online gallery",
        "Print release included"
      ]
    },
    {
      id: 2,
      name: "Portrait Session",
      description: "Professional portrait photography for individuals, families, or couples in studio or outdoor locations.",
      price: 350,
      duration: "1-2 hours",
      popular: false,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop",
      features: [
        "1-2 hour session",
        "Multiple outfit changes",
        "50+ edited photos",
        "Online gallery"
      ]
    },
    {
      id: 3,
      name: "Event Photography",
      description: "Professional coverage for corporate events, parties, and special occasions with candid and posed shots.",
      price: 800,
      duration: "4-6 hours",
      popular: false,
      image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&h=600&fit=crop",
      features: [
        "Event coverage",
        "Candid photography",
        "Group photos",
        "200+ edited photos"
      ]
    },
    {
      id: 4,
      name: "Commercial Photography",
      description: "Professional product, headshot, and business photography for marketing and promotional materials.",
      price: 1200,
      duration: "3-4 hours",
      popular: false,
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop",
      features: [
        "Product photography",
        "Professional headshots",
        "Commercial license",
        "High-res files"
      ]
    }
  ];

  const handleBookNow = (service: any) => {
    navigation.navigate('bookings', { service });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Photography Services</Text>
      <Text style={styles.subtitle}>
        Explore our professional photography services tailored to capture your special moments
      </Text>

      <ScrollView
        contentContainerStyle={styles.servicesGrid}
        showsVerticalScrollIndicator={false}
      >
        {services.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            onBookNow={() => handleBookNow(service)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const ServiceCard = ({ service, onBookNow }) => {
  return (
    <View style={styles.serviceCard}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: service.image }}
          style={styles.serviceImage}
        />
        {service.popular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>Popular</Text>
          </View>
        )}
      </View>

      <View style={styles.serviceInfo}>
        <View style={styles.serviceHeader}>
          <Text style={styles.serviceName}>{service.name}</Text>
        </View>

        <View style={styles.serviceDetails}>
          <Text style={styles.serviceDuration}>{service.duration}</Text>
          <Text style={styles.servicePrice}>₹{service.price.toLocaleString("en-IN")}</Text>
        </View>

        <Text style={styles.serviceDescription}>{service.description}</Text>

        <View style={styles.featuresList}>
          {service.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.bookNowButton}
          onPress={onBookNow}
        >
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  serviceCard: {
    width: width > 500 ? (width - 48) / 2 : width - 32,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    height: 180,
    overflow: 'hidden',
    position: 'relative',
  },
  serviceImage: {
    width: '100%',
    height: '100%',
  },
  popularBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFEB3B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F57F17',
  },
  serviceInfo: {
    padding: 16,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    color: '#333',
    marginBottom: 4,
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceDuration: {
    fontSize: 14,
    color: '#666',
  },
  servicePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E91E63',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  featuresList: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  bookNowButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookNowText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ServicePage;
