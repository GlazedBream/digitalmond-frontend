import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../styles/colors';

const messages = [
  { id: 1, text: '다음에 갈 도시를 추천해줘', user: 'user' },
  { id: 2, text: '여행자님의 성향에 따라 도시를 추천해드릴게요. 경상남도 거제입니다. 거제는 ~하고 ~해서...', user: 'bot' },
  { id: 3, text: '거제 말고 다른 곳도 추천해줘', user: 'user' },
  { id: 4, text: '그렇다면 경상북도 안동은 어떠신가요? 부산이나 거제와 다르게 바닷가는 아니지만 ~하고 ~하다는 점에서 여행자님에게 추천드립니다!', user: 'bot' },
];

export default function DummyChatbotScreen() {
  return (
    <ScrollView style={styles.container}>
      {messages.map((message) => (
        <View
          key={message.id}
          style={[
            styles.messageContainer,
            message.user === 'user' ? styles.userMessageContainer : styles.botMessageContainer,
          ]}
        >
          <View style={[styles.messageBubble, message.user === 'user' ? styles.userMessageBubble : styles.botMessageBubble]}>
            <Text style={message.user === 'user' ? styles.userMessageText : styles.botMessageText}>{message.text}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    borderRadius: 20,
    padding: 15,
    maxWidth: '80%',
  },
  userMessageBubble: {
    backgroundColor: colors.primary,
  },
  botMessageBubble: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  userMessageText: {
    color: colors.textOnPrimary,
  },
  botMessageText: {
    color: colors.textPrimary,
  },
});