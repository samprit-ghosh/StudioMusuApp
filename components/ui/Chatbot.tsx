import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const API_KEY = "AIzaSyBZaqKBTZTUds0ptmklR41mjS36PRIDIAU";
const googleai = new GoogleGenerativeAI(API_KEY);
const gemini = googleai.getGenerativeModel({ model: "gemini-2.0-flash" });

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: "assistant", 
      content: "Hi! I'm your Studio Musu photography assistant. How can I help you with your photography needs today?" 
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Create conversation history for context
      const conversationHistory = messages.slice(-6).map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
      }));
      
      // Add the current message
      conversationHistory.push({
        role: "user",
        parts: [{ text: input }]
      });

      // Generate content with Gemini API
      const result = await gemini.generateContent({
        contents: conversationHistory,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
        },
      });
      
      const response = await result.response;
      const text = response.text();
      
      const botMsg = { role: "assistant", content: text };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      const errorMsg = { 
        role: "assistant", 
        content: "I'm having trouble connecting right now. Please try again in a moment." 
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      { 
        role: "assistant", 
        content: "Hi! I'm your Studio Musu photography assistant. How can I help you with your photography needs today?" 
      },
    ]);
  };

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setIsOpen(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="chatbubble-ellipses" size={28} color="white" />
        </TouchableOpacity>
      )}

      {/* Chat window */}
      {isOpen && (
        <View style={styles.chatWindow}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.botAvatar}>
                <Ionicons name="camera" size={20} color="white" />
              </View>
              <View>
                <Text style={styles.headerText}>Studio Musu Assistant</Text>
                <Text style={styles.headerSubtext}>Online • Powered by Gemini AI</Text>
              </View>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={clearChat} style={styles.headerButton}>
                <Ionicons name="trash-outline" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsOpen(false)} style={styles.headerButton}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Messages */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.messageContainer,
                  item.role === "user" ? styles.userContainer : styles.botContainer,
                ]}
              >
                {item.role === "assistant" && (
                  <View style={styles.botAvatarSmall}>
                    <Ionicons name="camera" size={16} color="white" />
                  </View>
                )}
                <View
                  style={[
                    styles.message,
                    item.role === "user" ? styles.userMessage : styles.botMessage,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      item.role === "user" ? styles.userText : styles.botText,
                    ]}
                  >
                    {item.content}
                  </Text>
                </View>
                {item.role === "user" && (
                  <View style={styles.userAvatar}>
                    <Ionicons name="person" size={16} color="white" />
                  </View>
                )}
              </View>
            )}
            ListFooterComponent={
              isLoading ? (
                <View style={[styles.messageContainer, styles.botContainer]}>
                  <View style={styles.botAvatarSmall}>
                    <Ionicons name="camera" size={16} color="white" />
                  </View>
                  <View style={[styles.message, styles.botMessage]}>
                    <View style={styles.typingIndicator}>
                      <View style={styles.typingDot} />
                      <View style={styles.typingDot} />
                      <View style={styles.typingDot} />
                    </View>
                  </View>
                </View>
              ) : null
            }
          />

          {/* Input */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
          >
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Ask about our services, pricing, or availability..."
                value={input}
                onChangeText={setInput}
                onSubmitEditing={sendMessage}
                multiline
                maxLength={500}
                editable={!isLoading}
              />
              <TouchableOpacity
                onPress={sendMessage}
                style={[styles.sendBtn, (!input.trim() || isLoading) && styles.sendBtnDisabled]}
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Ionicons name="send" size={20} color="white" />
                )}
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 120,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    zIndex: 999,
  },
  chatWindow: {
    position: "absolute",
    bottom: 120,
    right: 20,
    width: 360,
    height: 500,
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 1000,
  },
  header: {
    backgroundColor: "#6366f1",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    padding: 4,
    marginLeft: 12,
  },
  botAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerText: {
    color: "white", 
    fontSize: 16, 
    fontWeight: "600",
    marginBottom: 2,
  },
  headerSubtext: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 6,
    paddingHorizontal: 16,
  },
  userContainer: {
    justifyContent: "flex-end",
  },
  botContainer: {
    justifyContent: "flex-start",
  },
  botAvatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    marginTop: 4,
  },
  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#9ca3af",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    marginTop: 4,
  },
  message: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 18,
  },
  userMessage: {
    backgroundColor: "#6366f1",
    borderTopRightRadius: 4,
  },
  botMessage: {
    backgroundColor: "#f3f4f6",
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: "white",
  },
  botText: {
    color: "#1f2937",
  },
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#9ca3af",
    marginHorizontal: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    fontSize: 15,
    maxHeight: 100,
  },
  sendBtn: {
    backgroundColor: "#6366f1",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  sendBtnDisabled: {
    backgroundColor: "#9ca3af",
  },
});

export default Chatbot;