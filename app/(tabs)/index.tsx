import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Linking,
  Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';


const { width, height } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();

  const services = [
    {
      id: 1,
      name: "Wedding Photography",
      description: "Capture your special day with comprehensive wedding coverage including ceremony, reception, and couple portraits.",
      price: 2500,
      duration: "8-10 hours",
      popular: true,
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
      features: ["Full day coverage", "2 photographers", "500+ edited photos"]
    },
    {
      id: 2,
      name: "Portrait Session",
      description: "Professional portrait photography for individuals, families, or couples in studio or outdoor locations.",
      price: 350,
      duration: "1-2 hours",
      popular: false,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop",
      features: ["1-2 hour session", "Multiple outfit changes", "50+ edited photos"]
    },
    {
      id: 3,
      name: "Event Photography",
      description: "Professional coverage for corporate events, parties, and special occasions.",
      price: 1200,
      duration: "4-6 hours",
      popular: false,
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
      features: ["Multiple photographers", "Digital delivery", "Online gallery"]
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah & James",
      text: "The wedding photos were absolutely stunning! They captured every special moment perfectly.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael T.",
      text: "Professional, creative, and delivered beyond our expectations. Will definitely book again!",
      rating: 5
    },
    {
      id: 3,
      name: "Jennifer L.",
      text: "The family portraits turned out amazing. The photographer made everyone feel comfortable.",
      rating: 5
    }
  ];

  const portfolioItems = [
    {
      id: 1,
      title: "Wedding",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600",
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: 2,
      title: "Portrait",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600",
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: 3,
      title: "Event",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600",
      url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: 4,
      title: "Commercial",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600",
      url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: 5,
      title: "Family",
      image: "https://images.unsplash.com/photo-1569074187119-c87815b476da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600",
      url: "https://images.unsplash.com/photo-1569074187119-c87815b476da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: 6,
      title: "Product",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600",
      url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600"
    }
  ];

  const scrollToSection = (sectionY) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: sectionY, animated: true });
    }
  };

  const handleDownload = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  const ServiceCard = ({ item }) => (
    <View style={styles.serviceCard}>
      <View style={styles.serviceImageContainer}>
        <Image source={{ uri: item.image }} style={styles.serviceImage} />
        {item.popular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>Popular</Text>
          </View>
        )}
      </View>
      <View style={styles.serviceContent}>
        <View style={styles.serviceHeader}>
          <Text style={styles.serviceName}>{item.name}</Text>
          <Text style={styles.servicePrice}>₹{item.price}</Text>
        </View>
        <Text style={styles.serviceDuration}>{item.duration}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>

        <View style={styles.featuresList}>
          {item.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.learnMoreButton}
          onPress={() => navigation.navigate('service')}
        >
          <Text style={styles.learnMoreText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const PortfolioItem = ({ item }) => (
    <TouchableOpacity
      style={styles.portfolioItem}
      onPress={() => handleDownload(item.url)}
    >
      <Image source={{ uri: item.image }} style={styles.portfolioImage} />
      <View style={styles.portfolioOverlay}>
        <Text style={styles.portfolioText}>View {item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const TestimonialCard = ({ item }) => (
    <View style={styles.testimonialCard}>
      <FontAwesome name="quote-left" size={20} color="#E0E0E0" style={styles.quoteIcon} />
      <Text style={styles.testimonialText}>{item.text}</Text>
      <View style={styles.testimonialFooter}>
        <Text style={styles.testimonialName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(item.rating)].map((_, i) => (
            <Ionicons key={i} name="star" size={16} color="#FFD700" />
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Studio Musu Photography</Text>
            <Text style={styles.heroSubtitle}>
              Capturing your most precious moments with artistry and passion
            </Text>
            <View style={styles.heroButtons}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => scrollToSection(800)} // Approximate position of portfolio
              >
                <Text style={styles.primaryButtonText}>View Our Work</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate('bookings')}
              >
                <Text style={styles.secondaryButtonText}>Book a Session</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <View style={styles.aboutContainer}>
            <View style={styles.aboutContent}>
              <Text style={styles.sectionTitle}>Our Story</Text>
              <Text style={styles.aboutText}>
                Founded in 2010, Studio Musu has been dedicated to creating timeless photographs that tell your unique story.
              </Text>
              <Text style={styles.aboutText}>
                Our team of passionate photographers combines technical expertise with artistic vision to deliver images you'll cherish forever.
              </Text>
              <TouchableOpacity
                style={styles.outlineButton}
              onPress={() => navigation.navigate('contact')}
              >
                <Text style={styles.outlineButtonText}>Meet The Team</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.aboutImages}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?w=500&h=500&fit=crop' }}
                style={[styles.aboutImage, styles.aboutImageFirst]}
              />
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=500&h=500&fit=crop' }}
                style={[styles.aboutImage, styles.aboutImageSecond]}
              />
            </View>
          </View>
        </View>

        {/* Services Section */}
        <View style={[styles.section, styles.servicesSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Our Services</Text>
            <Text style={styles.sectionSubtitle}>
              Professional photography services tailored to your needs
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.servicesList}
          >
            {services.map(service => (
              <ServiceCard key={service.id} item={service} />
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.centeredButton}
            onPress={() => navigation.navigate('service')}
          >
            <Text style={styles.centeredButtonText}>View All Services</Text>
          </TouchableOpacity>
        </View>

        {/* Portfolio Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Our Portfolio</Text>
            <Text style={styles.sectionSubtitle}>
              A glimpse of our recent work
            </Text>
          </View>

          <View style={styles.portfolioGrid}>
            {portfolioItems.map(item => (
              <PortfolioItem key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Testimonials Section */}
        <View style={[styles.section, styles.testimonialsSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Testimonials</Text>
            <Text style={styles.sectionSubtitle}>
              What our clients say about us
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.testimonialsList}
          >
            {testimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id} item={testimonial} />
            ))}
          </ScrollView>
        </View>

        {/* CTA Section */}
        <View style={[styles.section, styles.ctaSection]}>
          <Text style={styles.ctaTitle}>Ready to Create Lasting Memories?</Text>
          <Text style={styles.ctaText}>
            Contact us today to book your session or discuss your photography needs
          </Text>
          <View style={styles.ctaButtons}>
            <TouchableOpacity
              style={styles.ctaPrimaryButton}
              onPress={() => navigation.navigate('service')}
            >
              <Text style={styles.ctaPrimaryButtonText}>Book a Session</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ctaSecondaryButton}
              onPress={() => navigation.navigate('contact')}
            >
              <Text style={styles.ctaSecondaryButtonText}>Contact Us</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>


    </View>
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
  horizontalScroll: {
    flexGrow: 0,
  },
  section: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    maxWidth: 300,
  },

  // Hero Section
  heroSection: {
    height: height * 0.5,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    maxWidth: 300,
  },
  heroButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginHorizontal: 8,
    marginVertical: 5,
    minWidth: 160,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginHorizontal: 8,
    marginVertical: 5,
    minWidth: 160,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  // About Section
  aboutContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  aboutContent: {
    flex: 1,
    minWidth: 300,
    marginBottom: 20,
  },
  aboutText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    lineHeight: 24,
  },
  aboutImages: {
    flex: 1,
    flexDirection: 'row',
    minWidth: 300,
  },
  aboutImage: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },
  aboutImageFirst: {
    marginRight: 10,
    marginTop: 0,
  },
  aboutImageSecond: {
    marginTop: 20,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: 'flex-start',
  },
  outlineButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },

  // Services Section
  servicesSection: {
    backgroundColor: '#f8f9fa',
  },
  servicesList: {
    paddingBottom: 20,
  },
  serviceCard: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  serviceImageContainer: {
    height: 180,
    position: 'relative',
  },
  serviceImage: {
    width: '100%',
    height: '100%',
  },
  popularBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFD700',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  popularText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  serviceContent: {
    padding: 20,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  serviceDuration: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
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
  },
  learnMoreButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  learnMoreText: {
    color: '#fff',
    fontWeight: '600',
  },
  centeredButton: {
    backgroundColor: '#333',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 20,
  },
  centeredButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  // Portfolio Section
  portfolioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  portfolioItem: {
    width: (width - 50) / 2,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 15,
  },
  portfolioImage: {
    width: '100%',
    height: '100%',
  },
  portfolioOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  portfolioText: {
    color: '#fff',
    fontWeight: '600',
  },

  // Testimonials Section
  testimonialsSection: {
    backgroundColor: '#f8f9fa',
  },
  testimonialsList: {
    paddingBottom: 20,
  },
  testimonialCard: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  quoteIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    opacity: 0.3,
  },
  testimonialText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 15,
    lineHeight: 20,
  },
  testimonialFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  testimonialName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
  },

  // CTA Section
  ctaSection: {
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  ctaText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    maxWidth: 300,
  },
  ctaButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  ctaPrimaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginHorizontal: 8,
    marginVertical: 5,
  },
  ctaPrimaryButtonText: {
    color: '#2196F3',
    fontWeight: '600',
    fontSize: 16,
  },
  ctaSecondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginHorizontal: 8,
    marginVertical: 5,
  },
  ctaSecondaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Home;