<template>
  <v-card class="mx-auto" max-width="500" height="70vh">
    <v-toolbar color="primary" density="compact" flat>
      <v-toolbar-title>chat room</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon><v-icon>mdi-account-group</v-icon></v-btn>
    </v-toolbar>

    <v-list class="pa-3" style="overflow-y: auto; height: calc(100% - 110px)">
      <div v-for="(msg, index) in messages" :key="index">
        <v-list-item v-if="msg.isUser" class="d-flex justify-end my-2 pa-0">
          <v-chip color="blue-lighten-1" text-color="white" style="max-width: 80%">
            {{ msg.text }}
          </v-chip>
        </v-list-item>

        <v-list-item v-else class="d-flex justify-start my-2 pa-0">
          <v-chip color="grey-lighten-2" style="max-width: 80%">
            <span class="font-weight-bold mr-2">{{ msg.user }}:</span> {{ msg.text }}
          </v-chip>
        </v-list-item>
      </div>
    </v-list>

    <v-divider></v-divider>

    <v-container class="pa-2">
      <v-row no-gutters>
        <v-col cols="10">
          <v-text-field
            v-model="newMessage"
            label="Type a message..."
            variant="solo"
            hide-details
            clearable
            @keydown.enter="sendMessage"
          ></v-text-field>
        </v-col>
        <v-col cols="2" class="d-flex justify-center align-center">
          <v-btn :disabled="!newMessage" color="primary" icon size="small" @click="sendMessage">
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
// Remember to import mdi icons if you are using them globally
import { io } from "socket.io-client";

export default {
  data() {
    return {
      socket: null,
      newMessage: "",
      messages: [
        { text: "Hello, welcome to the chat!", user: "Admin", isUser: false },
        { text: "Testing my message!", user: "You", isUser: true },
      ],
      userId: 1, // Your actual logged-in user ID
    };
  },
  created() {
    // 1. Initialize Socket.IO connection
    this.socket = io("http://localhost:3000");

    // 2. Listen for incoming messages from the server
    this.socket.on("receiveMessage", this.handleIncomingMessage);

    // 3. Optional: Fetch message history from your REST API here
  },
  methods: {
    sendMessage() {
      if (!this.newMessage.trim()) return;

      const messageData = {
        text: this.newMessage,
        senderId: this.userId, // Send your ID
        user: "You", // Replace with actual username from your auth state
      };

      // ⭐️ Emit message to the server ⭐️
      this.socket.emit("sendMessage", messageData);

      // Optimistically add message to local list (optional, but common)
      this.messages.push({ ...messageData, isUser: true });

      this.newMessage = ""; // Clear input
    },

    handleIncomingMessage(messageData) {
      // Only add if it's NOT a message we already added (e.g., sent from a different device)
      if (messageData.senderId !== this.userId) {
        this.messages.push({
          ...messageData,
          isUser: false,
        });
      }
    },
  },
};
</script>

<style scoped>
/* Ensure the list scrolls and doesn't push the input off the screen */
.v-list {
  display: flex;
  flex-direction: column-reverse; /* Start scrolling from the bottom */
}
</style>
