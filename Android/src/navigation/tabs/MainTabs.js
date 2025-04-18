import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../../screens/DashboardScreen';
import ReceiptsScreen from '../../screens/ReceiptsScreen';
import ExpensesScreen from '../../screens/ExpensesScreen';
import GoalsScreen from '../../screens/GoalsScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Dashboard': iconName = 'view-dashboard-outline'; break;
            case 'Receipts': iconName = 'email-receive-outline'; break;
            case 'Expenses': iconName = 'cash-multiple'; break;
            case 'Goals': iconName = 'target'; break;
            case 'Profile': iconName = 'account-circle-outline'; break;
            default: iconName = 'circle';
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6EC6FF',
        tabBarInactiveTintColor: '#A5D6A7',
        tabBarStyle: { borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 64 },
        tabBarLabelStyle: { fontWeight: '600', fontSize: 12 },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Receipts" component={ReceiptsScreen} />
      <Tab.Screen name="Expenses" component={ExpensesScreen} />
      <Tab.Screen name="Goals" component={GoalsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
