import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  showChat = false;
  userInput = '';
  loading = false;

  messages: { text: string; from: 'user' | 'bot' }[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      this.messages = JSON.parse(savedMessages);
    }

    const savedShowChat = localStorage.getItem('showChat');
    if (savedShowChat === 'true') {
      this.showChat = true;
    }
  }

  toggleChat() {
    this.showChat = !this.showChat;
    localStorage.setItem('showChat', this.showChat.toString());

    if (this.showChat && this.messages.length === 0) {
      this.addBotMessage('كيف يمكنني مساعدتك؟');
    }
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMessage = this.userInput.trim();
    this.addUserMessage(userMessage);
    this.userInput = '';
    this.loading = true;

    this.chatService.sendMessage(userMessage).subscribe({
      next: (res) => {
        this.addBotMessage(res.response);
        this.loading = false;
      },
      error: () => {
        this.addBotMessage('حدث خطأ أثناء الاتصال بالخادم.');
        this.loading = false;
      }
    });
  }

  private addUserMessage(text: string) {
    this.messages.push({ text, from: 'user' });
    this.saveMessages();
  }

  private addBotMessage(text: string) {
    this.messages.push({ text, from: 'bot' });
    this.saveMessages();
  }

  private saveMessages() {
    localStorage.setItem('chatMessages', JSON.stringify(this.messages));
  }

  clearChat() {
    this.messages = [];
    localStorage.removeItem('chatMessages');
  }
}
