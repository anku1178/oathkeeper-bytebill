import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import MonthlyExpensesChart from '../components/charts/MonthlyExpensesChart';
import WeeklyTrendChart from '../components/charts/WeeklyTrendChart';
import SavingsProgress from '../components/SavingsProgress';
import QuickActions from '../components/QuickActions';
import FloatingAIAssistant from '../components/FloatingAIAssistant';

const mockUser = { name: 'Alex' };
const mockExpenses = [
  { month: 'Jan', amount: 12000 },
  { month: 'Feb', amount: 11300 },
  { month: 'Mar', amount: 12800 },
  { month: 'Apr', amount: 10600 },
];
const mockWeekly = [
  { week: 'W1', amount: 3500 },
  { week: 'W2', amount: 2500 },
  { week: 'W3', amount: 4000 },
  { week: 'W4', amount: 2200 },
];
const mockSavings = { goal: 50000, saved: 21000 };

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.greeting}>Hi, {mockUser.name} 👋</Text>
        <Card style={styles.card}><MonthlyExpensesChart data={mockExpenses} /></Card>
        <Card style={styles.card}><WeeklyTrendChart data={mockWeekly} /></Card>
        <Card style={styles.card}><SavingsProgress {...mockSavings} /></Card>
        <QuickActions />
      </ScrollView>
      <FloatingAIAssistant />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20, paddingBottom: 100 },
  greeting: { fontSize: 26, fontWeight: '700', marginBottom: 16, color: '#6EC6FF' },
  card: { marginBottom: 20, borderRadius: 18, elevation: 2 },
});
