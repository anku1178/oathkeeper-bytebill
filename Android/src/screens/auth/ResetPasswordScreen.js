import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';

export default function ResetPasswordScreen({ navigation }) {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleReset = () => {
    resetPassword(email);
    setSent(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleReset} style={styles.button}>
        Send Reset Link
      </Button>
      {sent && <Text style={styles.success}>Reset link sent! Please check your email.</Text>}
      <Button onPress={() => navigation.goBack()}>Back</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 32, color: '#6EC6FF' },
  input: { marginBottom: 16, backgroundColor: '#F4F6F8' },
  button: { marginVertical: 12, borderRadius: 16 },
  success: { color: '#43A047', marginTop: 8 },
});
