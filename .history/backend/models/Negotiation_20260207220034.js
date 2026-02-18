import { v4 as uuid } from 'uuid';

const negotiations = new Map();

export class Negotiation {
  constructor(data) {
    this.id = uuid();
    this.productId = data.productId;
    this.buyerId = data.buyerId;
    this.farmerId = data.farmerId;
    this.quantity = data.quantity;
    this.suggestedPrice = data.suggestedPrice;
    this.originalPrice = data.originalPrice;
    this.messages = [];
    this.status = 'pending'; // 'pending', 'accepted', 'rejected', 'completed'
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  addMessage(senderType, senderId, message) {
    this.messages.push({
      id: uuid(),
      senderType, // 'buyer' or 'farmer'
      senderId,
      message,
      timestamp: new Date()
    });
    this.updatedAt = new Date();
  }

  updateStatus(newStatus) {
    this.status = newStatus;
    this.updatedAt = new Date();
  }
}

export function saveNegotiation(negotiation) {
  negotiations.set(negotiation.id, negotiation);
  return negotiation;
}

export function getNegotiationById(id) {
  return negotiations.get(id);
}

export function getNegotiationsByBuyerId(buyerId) {
  const buyerNegotiations = [];
  for (const neg of negotiations.values()) {
    if (neg.buyerId === buyerId) {
      buyerNegotiations.push(neg);
    }
  }
  return buyerNegotiations;
}

export function getNegotiationsByFarmerId(farmerId) {
  const farmerNegotiations = [];
  for (const neg of negotiations.values()) {
    if (neg.farmerId === farmerId) {
      farmerNegotiations.push(neg);
    }
  }
  return farmerNegotiations;
}

export function updateNegotiation(id, updates) {
  const negotiation = negotiations.get(id);
  if (negotiation) {
    Object.assign(negotiation, updates);
  }
  return negotiation;
}

export function getAllNegotiations() {
  return Array.from(negotiations.values());
}
