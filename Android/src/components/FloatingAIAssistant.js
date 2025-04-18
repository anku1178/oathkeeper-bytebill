import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ChatWindow from './ai/ChatWindow';

const { width, height } = Dimensions.get('window');

export default function FloatingAIAssistant() {
  const [open, setOpen] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const toggle = () => {
    if (!open) {
      setOpen(true);
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }).start();
    } else {
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => setOpen(false));
    }
  };

  return (
    <View style={styles.fabContainer} pointerEvents="box-none">
      {open && (
        <Animated.View style={[styles.chatWindow, { opacity: fadeAnim }]}> 
          <ChatWindow onClose={toggle} />
        </Animated.View>
      )}
      <TouchableOpacity style={styles.fab} onPress={toggle} activeOpacity={0.8}>
        <MaterialCommunityIcons name="robot" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    zIndex: 99,
    alignItems: 'flex-end',
    width: width,
    height: height,
    pointerEvents: 'box-none',
  },
  fab: {
    backgroundColor: '#6EC6FF',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  chatWindow: {
    position: 'absolute',
    bottom: 80,
    right: 0,
    width: width * 0.94,
    maxHeight: height * 0.7,
    borderRadius: 24,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 10,
    overflow: 'hidden',
  },
});
