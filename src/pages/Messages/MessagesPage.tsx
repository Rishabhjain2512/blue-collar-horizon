
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, Users } from "lucide-react";
import { format } from "date-fns";
import { mockConversations, mockMessages, getEmployer, getWorker } from "@/data/mockData";
import { Conversation, Message } from "@/types";

const MessagesPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (user) {
        // Get conversations for the current user
        const userConversations = mockConversations.filter(conv => 
          conv.participants.includes(user.id)
        );
        setConversations(userConversations);
      }
      setIsLoading(false);
    }, 500);
  }, [user]);

  useEffect(() => {
    if (selectedConversation) {
      // Get messages for the selected conversation
      const conversationMessages = mockMessages.filter(msg => 
        msg.senderId === selectedConversation || msg.receiverId === selectedConversation
      );
      setMessages(conversationMessages);
    } else {
      setMessages([]);
    }
  }, [selectedConversation]);

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation || !user) return;
    
    // Create new message
    const newMsg: Message = {
      id: `msg${Date.now()}`,
      senderId: user.id,
      receiverId: selectedConversation,
      content: newMessage,
      createdAt: new Date(),
      read: false
    };
    
    // Update messages state
    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");
    
    // In a real app, this would be sent to the server
  };

  const getOtherParticipant = (conversation: Conversation) => {
    if (!user) return null;
    
    const otherId = conversation.participants.find(id => id !== user.id);
    if (!otherId) return null;
    
    // Check if other participant is a worker or employer
    const otherWorker = getWorker(otherId);
    if (otherWorker) return otherWorker;
    
    const otherEmployer = getEmployer(otherId);
    return otherEmployer;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  const filteredConversations = conversations.filter(conv => {
    if (!searchTerm) return true;
    
    const otherParticipant = getOtherParticipant(conv);
    if (!otherParticipant) return false;
    
    return otherParticipant.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="mb-6 text-gray-600">
            You need to login to access messages.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">{t("message.conversations")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="md:col-span-1">
          <Card className="shadow-lg h-[calc(100vh-200px)] flex flex-col">
            <CardContent className="p-4 flex-1 flex flex-col">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder={t("message.search_users")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.length === 0 ? (
                  <div className="text-center p-4">
                    <Users className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-600">{t("message.no_messages")}</p>
                    <p className="text-sm text-gray-500">
                      {t("message.start_conversation")}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredConversations.map((conversation) => {
                      const otherParticipant = getOtherParticipant(conversation);
                      if (!otherParticipant) return null;
                      
                      return (
                        <div
                          key={conversation.id}
                          className={`flex items-center p-3 rounded-lg cursor-pointer ${
                            selectedConversation === otherParticipant.id
                              ? "bg-blue-50"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={() => handleSelectConversation(otherParticipant.id)}
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.name} />
                            <AvatarFallback>{getInitials(otherParticipant.name)}</AvatarFallback>
                          </Avatar>
                          
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between items-center">
                              <p className="font-medium text-gray-900">
                                {otherParticipant.name}
                              </p>
                              <span className="text-xs text-gray-500">
                                {format(new Date(conversation.updatedAt), "h:mm a")}
                              </span>
                            </div>
                            
                            <p className="text-sm text-gray-500 truncate">
                              {/* Last message would be displayed here */}
                              {otherParticipant.role === "worker" ? "Worker" : "Employer"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Message Content */}
        <div className="md:col-span-2">
          <Card className="shadow-lg h-[calc(100vh-200px)] flex flex-col">
            <CardContent className="p-4 flex-1 flex flex-col">
              {!selectedConversation ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageIcon className="h-16 w-16 mx-auto text-gray-300" />
                    <p className="mt-2 text-gray-600">{t("message.no_messages")}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {t("message.start_conversation")}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Messages display */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.senderId === user.id ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.senderId === user.id
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p>{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.senderId === user.id ? "text-blue-100" : "text-gray-500"
                          }`}>
                            {format(new Date(message.createdAt), "h:mm a")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Message input */}
                  <div className="border-t pt-4">
                    <div className="flex items-center">
                      <Input
                        placeholder={t("message.type_message")}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button 
                        className="ml-2 bg-blue-600 hover:bg-blue-700" 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        {t("message.send")}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Simple message icon component
const MessageIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export default MessagesPage;
