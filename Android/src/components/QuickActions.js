import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const actions = [
  { icon: 'plus-circle', label: 'Add Expense', color: '#6EC6FF' },
  { icon: 'bullseye-arrow', label: 'Set Goal', color: '#A5D6A7' },
  { icon: 'file-chart', label: 'View Report', color: '#F8E1A1' },
  { icon: 'robot', label: 'Ask AI', color: '#FF8A65' },
];

export default function QuickActions() {
  return (
    <View style={styles.row}>
      {actions.map((a) => (
        <Button
          key={a.label}
          mode="contained"
          icon={() => <MaterialCommunityIcons name={a.icon} size={22} color="#fff" />}
          style={[styles.btn, { backgroundColor: a.color }]}
          labelStyle={{ fontWeight: '700' }}
          onPress={() => {}}
        >
          {a.label}
        </Button>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    marginBottom: 10,
  },
  btn: {
    borderRadius: 16,
    marginHorizontal: 3,
    flex: 1,
    marginRight: 8,
    elevation: 2,
    minWidth: 90,
  },
});
