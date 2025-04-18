import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

export default function SavingsProgress({ goal, saved }) {
  const progress = Math.min(saved / goal, 1);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Savings Progress</Text>
      <ProgressBar progress={progress} color="#F8E1A1" style={styles.bar} />
      <Text style={styles.amount}>{`₹${saved.toLocaleString()} / ₹${goal.toLocaleString()}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#F8E1A1' },
  bar: { height: 14, borderRadius: 8, width: '90%', marginBottom: 6 },
  amount: { fontSize: 15, color: '#222', marginTop: 2 },
});
