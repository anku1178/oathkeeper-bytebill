import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SUGGESTED_PROMPTS = [
  'Can I afford a new phone this month?',
  'What’s my biggest spending category?',
  'Give me tips to save ₹1,000.'
];

const mockAIResponse = (msg) => {
  switch (msg) {
    case SUGGESTED_PROMPTS[0]:
      return 'Let’s check your monthly budget and recent expenses. (AI placeholder)';
    case SUGGESTED_PROMPTS[1]:
      return 'Your biggest spending category is Dining Out. (AI placeholder)';
    case SUGGESTED_PROMPTS[2]:
      return 'Try reducing dining out or online shopping for a month! (AI placeholder)';
    default:
      return 'I am here to help with your finance queries. (AI placeholder)';
  }
};

function MessageBubble({ text, isUser, timestamp }) {
  return (
    <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
      <Text style={styles.bubbleText}>{text}</Text>
      <Text style={styles.time}>{timestamp}</Text>
    </View>
  );
}

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    { text: 'Hi! I’m your AI finance assistant. How can I help?', isUser: false, timestamp: 'Now' }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef();

  const sendMessage = (msg) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { text: msg, isUser: true, timestamp: time }]);
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: mockAIResponse(msg), isUser: false, timestamp: time }]);
      setTyping(false);
    }, 900);
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollToEnd({ animated: true });
  }, [messages, typing]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.window}>
      <View style={styles.header}>
        <Text style={styles.headerText}>AI Assistant</Text>
        <TouchableOpacity onPress={onClose}><MaterialCommunityIcons name="close" size={28} color="#6EC6FF" /></TouchableOpacity>
      </View>
      <FlatList
        ref={scrollRef}
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <MessageBubble {...item} />
        )}
        contentContainerStyle={{ padding: 12, paddingBottom: 30 }}
      />
      {typing && (
        <View style={styles.aiTyping}><Text style={{ color: '#6EC6FF' }}>AI is typing...</Text></View>
      )}
      <View style={styles.promptRow}>
        {SUGGESTED_PROMPTS.map((p) => (
          <TouchableOpacity key={p} style={styles.promptBtn} onPress={() => sendMessage(p)}>
            <Text style={styles.promptText}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type your question..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => {
            if (input.trim()) {
              sendMessage(input.trim());
              setInput('');
            }
          }}
          returnKeyType="send"
        />
        <TouchableOpacity onPress={() => {
          if (input.trim()) {
            sendMessage(input.trim());
            setInput('');
          }
        }}>
          <MaterialCommunityIcons name="send" size={28} color="#6EC6FF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  window: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#F4F6F8',
    backgroundColor: '#F4F6F8',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6EC6FF',
  },
  bubble: {
    marginBottom: 8,
    padding: 12,
    borderRadius: 16,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    backgroundColor: '#F4F6F8',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#6EC6FF',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#F4F6F8',
  },
  bubbleText: {
    color: '#222',
    fontSize: 16,
  },
  time: {
    fontSize: 11,
    color: '#A5D6A7',
    alignSelf: 'flex-end',
    marginTop: 3,
  },
  aiTyping: {
    marginLeft: 14,
    marginBottom: 6,
  },
  promptRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  promptBtn: {
    backgroundColor: '#E3F2FD',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 4,
  },
  promptText: {
    color: '#1976D2',
    fontSize: 13,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#F4F6F8',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 16,
    marginRight: 8,
  },
});
