import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
  Dimensions,
  Animated,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.45;
const CARD_SPACING = 6;
const ITEM_WIDTH = CARD_WIDTH + CARD_SPACING * 2;

export default function HomeScreen() {
  const [selectedCar, setSelectedCar] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: false,
          viewPosition: 0.1, // Ajustado para deslocar levemente para direita
        });
      }, 100);
    }
  }, []);

  const cars = [
    {
      id: "1",
      name: "Lamborghini Huracán",
      hp: "640 HP",
      acceleration: "3.2s",
      seats: "2 Lugares",
      price: "R$ 3.500",
      description: "Superesportivo italiano com design agressivo.",
      image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a",
    },
    {
      id: "2",
      name: "Mercedes-Benz Classe G",
      hp: "585 HP",
      acceleration: "4.5s",
      seats: "5 Lugares",
      price: "R$ 2.200",
      description: "SUV de luxo que combina robustez com sofisticação.",
      image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366",
    },
    {
      id: "3",
      name: "Porsche 911 Turbo S",
      hp: "650 HP",
      acceleration: "2.7s",
      seats: "4 Lugares",
      price: "R$ 2.800",
      description: "Esportivo alemão que equilibra desempenho e conforto.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    },
    {
      id: "4",
      name: "Ferrari F8 Tributo",
      hp: "720 HP",
      acceleration: "2.9s",
      seats: "2 Lugares",
      price: "R$ 4.000",
      description: "Excelência italiana em performance e design.",
      image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333",
    },
    {
      id: "5",
      name: "Rolls Royce Ghost",
      hp: "563 HP",
      acceleration: "4.8s",
      seats: "5 Lugares",
      price: "R$ 5.500",
      description: "Ápice do luxo e conforto sobre rodas.",
      image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4",
    },
  ];

  const carOptions = cars.map(car => car.name);

  const handleReservation = () => {
    if (!selectedCar || !pickupDate || !returnDate || !name || !phone) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    Alert.alert("Sucesso", "Sua reserva foi enviada!");
    setModalVisible(false);
  };

  const CarCard = ({ car, index }) => {
    const inputRange = [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
      extrapolate: "clamp",
    });

    return (
        <SafeAreaProvider style={{flex:1}}>

      <Animated.View style={[styles.carCardContainer, { transform: [{ scale }], opacity }]}>
        <View style={styles.carCard}>
          <ImageBackground source={{ uri: car.image }} style={styles.carImage} imageStyle={styles.cardImageRadius}>
            <View style={styles.carImageOverlay} />
            <View style={styles.carBadge}>
              <Text style={styles.carBadgeText}>LANÇAMENTO</Text>
            </View>
          </ImageBackground>
          <View style={styles.carInfo}>
            <Text style={styles.carName} numberOfLines={1}>{car.name}</Text>
            <View style={styles.carDetails}>
              {[
                { icon: "⚡", text: car.hp },
                { icon: "🚀", text: car.acceleration },
                { icon: "💺", text: car.seats }
              ].map((item, i) => (
                <View key={i} style={styles.detailItem}>
                  <Text style={styles.detailIcon}>{item.icon}</Text>
                  <Text style={styles.detailText}>{item.text}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.carDescription} numberOfLines={1}>{car.description}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.carPrice}>{car.price}<Text style={styles.pricePeriod}>/dia</Text></Text>
              <TouchableOpacity style={styles.reserveButton}>
                <Text style={styles.reserveButtonText}>Reservar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
      </SafeAreaProvider>
    );
  };

  const Pagination = () => (
    <View style={styles.paginationContainer}>
      {cars.map((_, index) => {
        const inputRange = [
          (index - 1) * ITEM_WIDTH,
          index * ITEM_WIDTH,
          (index + 1) * ITEM_WIDTH,
        ];

        return (
          <Animated.View
            key={index}
            style={[
              styles.paginationDot,
              {
                width: scrollX.interpolate({ inputRange, outputRange: [8, 20, 8], extrapolate: "clamp" }),
                opacity: scrollX.interpolate({ inputRange, outputRange: [0.3, 1, 0.3], extrapolate: "clamp" }),
              },
            ]}
          />
        );
      })}
    </View>
  );

  const handleNext = () => {
    if (currentIndex < cars.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true, viewPosition: 0.3 });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1, animated: true, viewPosition: 0.3 });
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1492144533655-aae69c8a3e0b" }} style={styles.background} blurRadius={4}>
      <View style={styles.overlay}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Navbar */}
         

          {/* Hero Section */}
          <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1580273916550-e323be2ae537" }} style={styles.heroSection} imageStyle={{ opacity: 0.4 }}>
            <View style={styles.heroOverlay}>
              <Text style={styles.heroTitle}>Experiência de Luxo</Text>
              <TouchableOpacity style={styles.heroButton}>
                <Text style={styles.heroButtonText}>Ver Frota</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>

          {/* Carrossel */}
          <View style={styles.fleetSection}>
            <Text style={styles.sectionTitle}>Nossa Frota Exclusiva</Text>
            <Text style={styles.sectionSubtitle}>Deslize para ver todos os modelos</Text>

            <View style={styles.carouselContainer}>
              <TouchableOpacity style={[styles.navArrow, styles.navArrowLeft, currentIndex === 0 && styles.navArrowDisabled]} onPress={handlePrev} disabled={currentIndex === 0}>
                <Text style={styles.navArrowText}>←</Text>
              </TouchableOpacity>

              <Animated.FlatList
                ref={flatListRef}
                data={cars}
                renderItem={({ item, index }) => <CarCard car={item} index={index} />}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_WIDTH}
                snapToAlignment="start"
                decelerationRate="fast"
                contentContainerStyle={styles.carouselList}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
                onMomentumScrollEnd={(e) => setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / ITEM_WIDTH))}
                scrollEventThrottle={16}
                getItemLayout={(_, index) => ({ length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index })}
              />

              <TouchableOpacity style={[styles.navArrow, styles.navArrowRight, currentIndex === cars.length - 1 && styles.navArrowDisabled]} onPress={handleNext} disabled={currentIndex === cars.length - 1}>
                <Text style={styles.navArrowText}>→</Text>
              </TouchableOpacity>
            </View>

            <Pagination />

            <View style={styles.carouselFooter}>
              <Text style={styles.carouselCounter}>{currentIndex + 1} / {cars.length}</Text>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllButtonText}>Ver Todos</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Reserva */}
          <View style={styles.reservationSection}>
            <View style={styles.reservationCard}>
              <Text style={styles.reservationTitle}>Reserve seu carro de luxo</Text>
              {[
                "Cancelamento gratuito até 48h antes",
                "Km ilimitado em todos os aluguéis",
                "Seguro completo incluso no valor"
              ].map((text, i) => (
                <View key={i} style={styles.benefitItem}>
                  <Text style={styles.benefitIcon}>✅</Text>
                  <Text style={styles.benefitText}>{text}</Text>
                </View>
              ))}
              <TouchableOpacity style={styles.openFormButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.openFormButtonText}>Solicitar Reserva</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerContent}>
              <View style={styles.footerColumn}>
                <Text style={styles.footerTitle}>WL MOTORS</Text>
                <Text style={styles.footerText}>Especialistas em aluguel de veículos de luxo.</Text>
              </View>
              <View style={styles.footerColumn}>
                <Text style={styles.footerSubtitle}>Links Rápidos</Text>
                {["Início", "Frota", "Serviços", "Contato"].map((item, i) => (
                  <TouchableOpacity key={i}><Text style={styles.footerLink}>{item}</Text></TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.footerBottom}>
              <Text style={styles.copyright}>© {new Date().getFullYear()} WL MOTORS</Text>
            </View>
          </View>
        </ScrollView>

        {/* Modal */}
        <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Solicitar Reserva</Text>
              
              <Text style={styles.inputLabel}>Modelo</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carSelector}>
                {carOptions.map((car, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.carOption, selectedCar === car && styles.selectedCarOption]}
                    onPress={() => setSelectedCar(car)}
                  >
                    <Text style={[styles.carOptionText, selectedCar === car && styles.selectedCarOptionText]}>{car}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {[
                { label: "Retirada", value: pickupDate, setter: setPickupDate, placeholder: "AAAA-MM-DD" },
                { label: "Devolução", value: returnDate, setter: setReturnDate, placeholder: "AAAA-MM-DD" },
                { label: "Nome", value: name, setter: setName, placeholder: "Seu nome" },
                { label: "Telefone", value: phone, setter: setPhone, placeholder: "(11) 99999-9999", keyboard: "phone-pad" }
              ].map((field, i) => (
                <View key={i}>
                  <Text style={styles.inputLabel}>{field.label}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={field.placeholder}
                    placeholderTextColor="#888"
                    value={field.value}
                    onChangeText={field.setter}
                    keyboardType={field.keyboard || "default"}
                  />
                </View>
              ))}

              <View style={styles.modalButtons}>
                <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.submitButton]} onPress={handleReservation}>
                  <Text style={styles.submitButtonText}>Enviar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

// Estilos simplificados e organizados
const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(10,10,10,0.9)" },
  scrollContent: { alignItems: "center" },
  
  // Navbar
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.8)",
    borderBottomWidth: 1,
    borderBottomColor: "#FFD700",
    width: "100%",
  },
  logoContainer: { flexDirection: "row", alignItems: "baseline" },
  logoWL: { fontSize: 28, fontWeight: "bold", color: "#FFD700", letterSpacing: 2 },
  logoCars: { fontSize: 16, color: "#fff", letterSpacing: 2, marginLeft: 5 },
  reserveNavButton: { backgroundColor: "#FFD700", padding: 8, borderRadius: 8 },
  reserveNavButtonText: { color: "#000", fontWeight: "bold", fontSize: 14 },

  // Hero
  heroSection: { width: "100%", height: 300, marginBottom: 20 },
  heroOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center", padding: 20 },
  heroTitle: { fontSize: 36, fontWeight: "bold", color: "#fff", textAlign: "center", marginBottom: 20 },
  heroButton: { backgroundColor: "#FFD700", paddingHorizontal: 30, paddingVertical: 15, borderRadius: 10 },
  heroButtonText: { color: "#000", fontSize: 16, fontWeight: "bold" },

  // Seções gerais
  fleetSection: { padding: 20, width: "100%", maxWidth: 600, alignSelf: "center" },
  reservationSection: { padding: 20, width: "100%", maxWidth: 600, alignSelf: "center" },
  sectionTitle: { fontSize: 28, fontWeight: "bold", color: "#FFD700", textAlign: "center", marginBottom: 10 },
  sectionSubtitle: { fontSize: 14, color: "#aaa", textAlign: "center", marginBottom: 20 },

  // Carrossel
  carouselContainer: { position: "relative", marginVertical: 10, flexDirection: "row", alignItems: "center" },
  carouselList: { paddingHorizontal: 10 },
  carCardContainer: { width: ITEM_WIDTH, paddingHorizontal: CARD_SPACING },
  carCard: { backgroundColor: "#111", borderRadius: 15, borderWidth: 1, borderColor: "#333" },
  carImage: { height: 120, width: "100%" },
  cardImageRadius: { borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  carImageOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.3)" },
  carBadge: { position: "absolute", top: 10, left: 10, backgroundColor: "#FFD700", padding: 4, borderRadius: 5 },
  carBadgeText: { color: "#000", fontSize: 8, fontWeight: "bold" },
  carInfo: { padding: 12 },
  carName: { fontSize: 16, fontWeight: "bold", color: "#FFD700", marginBottom: 8 },
  carDetails: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  detailItem: { flexDirection: "row", alignItems: "center" },
  detailIcon: { fontSize: 10, marginRight: 2, color: "#FFD700" },
  detailText: { color: "#fff", fontSize: 9 },
  carDescription: { color: "#aaa", fontSize: 10, marginBottom: 10 },
  priceContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  carPrice: { fontSize: 16, fontWeight: "bold", color: "#FFD700" },
  pricePeriod: { fontSize: 10, color: "#aaa" },
  reserveButton: { backgroundColor: "#FFD700", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  reserveButtonText: { color: "#000", fontWeight: "bold", fontSize: 10 },

  // Navegação do carrossel
  navArrow: { position: "absolute", width: 30, height: 30, borderRadius: 15, backgroundColor: "#FFD700", justifyContent: "center", alignItems: "center", zIndex: 10, elevation: 5 },
  navArrowLeft: { left: -10 },
  navArrowRight: { right: -10 },
  navArrowDisabled: { backgroundColor: "#333", opacity: 0.5 },
  navArrowText: { fontSize: 16, color: "#000", fontWeight: "bold" },
  paginationContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 10 },
  paginationDot: { height: 6, borderRadius: 3, backgroundColor: "#FFD700", marginHorizontal: 3 },
  carouselFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5, paddingHorizontal: 5 },
  carouselCounter: { color: "#FFD700", fontSize: 12, fontWeight: "bold" },
  viewAllButton: { borderWidth: 2, borderColor: "#FFD700", padding: 10, borderRadius: 8 },
  viewAllButtonText: { color: "#FFD700", fontSize: 12, fontWeight: "bold" },

  // Reserva
  reservationCard: { backgroundColor: "#111", padding: 20, borderRadius: 20, borderWidth: 1, borderColor: "#FFD700" },
  reservationTitle: { fontSize: 20, fontWeight: "bold", color: "#FFD700", textAlign: "center", marginBottom: 15 },
  benefitItem: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  benefitIcon: { fontSize: 12, marginRight: 8, color: "#FFD700" },
  benefitText: { color: "#fff", fontSize: 11, flex: 1 },
  openFormButton: { backgroundColor: "#FFD700", padding: 12, borderRadius: 10, alignItems: "center" },
  openFormButtonText: { color: "#000", fontSize: 14, fontWeight: "bold" },

  // Footer
  footer: { backgroundColor: "#0a0a0a", padding: 25, borderTopWidth: 1, borderTopColor: "#FFD700", width: "100%" },
  footerContent: { flexDirection: "row", justifyContent: "space-between", maxWidth: 600, alignSelf: "center" },
  footerColumn: { width: "48%" },
  footerTitle: { fontSize: 16, fontWeight: "bold", color: "#FFD700", marginBottom: 10 },
  footerSubtitle: { fontSize: 14, fontWeight: "bold", color: "#FFD700", marginBottom: 8 },
  footerText: { color: "#aaa", fontSize: 11, lineHeight: 16 },
  footerLink: { color: "#aaa", fontSize: 11, marginBottom: 5 },
  footerBottom: { borderTopWidth: 1, borderTopColor: "#333", marginTop: 15, paddingTop: 15, alignItems: "center" },
  copyright: { color: "#666", fontSize: 10 },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center", padding: 20 },
  modalContent: { backgroundColor: "#111", borderRadius: 20, padding: 20, width: "100%", maxWidth: 400, borderWidth: 1, borderColor: "#FFD700" },
  modalTitle: { fontSize: 20, fontWeight: "bold", color: "#FFD700", textAlign: "center", marginBottom: 15 },
  inputLabel: { color: "#fff", fontSize: 12, marginBottom: 5 },
  input: { backgroundColor: "#1c1c1c", padding: 8, borderRadius: 6, marginBottom: 10, fontSize: 12, color: "#fff", borderWidth: 1, borderColor: "#333" },
  carSelector: { flexDirection: "row", marginBottom: 10, maxHeight: 40 },
  carOption: { backgroundColor: "#1c1c1c", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, marginRight: 6, borderWidth: 1, borderColor: "#333" },
  selectedCarOption: { backgroundColor: "#FFD700", borderColor: "#FFD700" },
  carOptionText: { color: "#fff", fontSize: 10 },
  selectedCarOptionText: { color: "#000", fontWeight: "bold" },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  modalButton: { flex: 1, padding: 10, borderRadius: 8, alignItems: "center", marginHorizontal: 3 },
  cancelButton: { backgroundColor: "#333" },
  cancelButtonText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  submitButton: { backgroundColor: "#FFD700" },
  submitButtonText: { color: "#000", fontWeight: "bold", fontSize: 12 },
});