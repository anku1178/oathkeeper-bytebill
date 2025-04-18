import React from 'react';
import { VictoryPie } from 'victory-native';
import { View, Text, StyleSheet } from 'react-native';

export default function MonthlyExpensesChart({ data }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Expenses</Text>
      <VictoryPie
        data={data}
        x="month"
        y="amount"
        colorScale={["#6EC6FF", "#A5D6A7", "#F8E1A1", "#FF8A65"]}
        innerRadius={40}
        padAngle={2}
        style={{ labels: { fill: '#222', fontSize: 14 } }}
        height={180}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 12 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#6EC6FF' },
});
