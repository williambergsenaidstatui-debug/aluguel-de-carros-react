import { useEffect, useState, useRef } from "react";
import { 
  View, 
  ImageBackground, 
  Image, 
  StyleSheet, 
  Animated 
} from "react-native";

export default function Splash({ navigation }) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação da barra de progresso
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 5000, // 5 segundos
      useNativeDriver: false,
    }).start();

    // Atualiza o progresso para exibição
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 1) {
          clearInterval(interval);
          return 1;
        }
        return prev + 0.02; // Incremento a cada 100ms
      });
    }, 100);

    // Timer para navegação
    const timeout = setTimeout(() => {
      navigation.navigate("home");
    }, 5000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  // Largura da barra baseada no progresso
  const barWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (
    
    <ImageBackground 
      source={{ 
        uri: 'https://png.pngtree.com/background/20250121/original/pngtree-high-speed-super-racing-car-on-the-road-mobile-wallpaper-picture-image_15588767.jpg' 
      }} 
      style={styles.ImgBack}
      imageStyle={{ opacity: 0.8 }}
    >
      {/* Overlay preto */}
      <View style={styles.overlay} />
      
      {/* Container principal */}
      <View style={styles.container}>
        <Image 
          source={require('../assets/logonovo.png')} 
          style={styles.imgLogo} 
          resizeMode="contain"
        />
        
        {/* Barra de carregamento */}
        <View style={styles.loadingContainer}>
          <Animated.View style={[styles.loadingBar, { width: barWidth }]} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  ImgBack: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000",
    opacity: 100,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 40,
  },
  imgLogo: {
    width: 400,
    height: 200,
    marginBottom: 50,
  },
  loadingContainer: {
    width: "100%",
    height: 4,
    backgroundColor: "#050000",
    borderRadius: 2,
    overflow: "hidden",
    position: "absolute",
    bottom: 60,
  },
  loadingBar: {
    height: "100%",
    backgroundColor: "#FFD700", // Dourado para combinar com o tema
    borderRadius: 2,
  },
});