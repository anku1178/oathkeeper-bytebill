import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory-native';
import { View, Text, StyleSheet } from 'react-native';

export default function WeeklyTrendChart({ data }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Spending Trend</Text>
      <VictoryChart theme={VictoryTheme.material} height={170}>
        <VictoryLine
          data={data}
          x="week"
          y="amount"
          style={{ data: { stroke: '#A5D6A7', strokeWidth: 3 } }}
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 12 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#A5D6A7' },
});
