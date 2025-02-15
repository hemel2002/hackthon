// User Schema
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    personalInfo: {
      name: String,
      profileImage: String,
      phone: String
    },
    financials: {
      balance: { type: Number, default: 0 },
      monthlyBudget: Number,
      monthlyExpenses: { type: Number, default: 0 },
      totalSaved: Number,
      incomeSources: [String]
    },
    security: {
      lastLogin: Date,
      loginHistory: [{
        timestamp: Date,
        ipAddress: String,
        device: String
      }],
      trustedDevices: [String],
      isBanned: { type: Boolean, default: false }
    },
    badges: [{
      badgeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Badge' },
      earnedAt: Date
    }],
    fraudReports: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  });
  
  // Transaction Schema
  const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    recipient: String,
    type: { type: String, enum: ['income', 'expense'] },
    category: { type: String, enum: ['food', 'utilities', 'entertainment', 'shopping', 'other'] },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['completed', 'pending', 'blocked'], default: 'pending' },
    metadata: {
      ipAddress: String,
      location: {
        type: { type: String, default: 'Point' },
        coordinates: [Number]
      },
      device: String
    },
    fraudAnalysis: {
      isFraud: Boolean,
      confidence: Number,
      modelUsed: String,
      triggers: [String]
    }
  });
  
  // Badge Schema
  const BadgeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    icon: String,
    criteria: {
      conditionType: String,
      threshold: Number,
      description: String
    },
    createdAt: { type: Date, default: Date.now }
  });
  
  // Notification Schema
  const NotificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['fraud', 'bill', 'system', 'achievement'] },
    content: String,
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  });
  
  // Admin Log Schema
  const AdminLogSchema = new mongoose.Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, enum: ['ban', 'unban', 'warning', 'system_update'] },
    targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    details: String,
    timestamp: { type: Date, default: Date.now }
  });
  
  // Fraud Model Schema
  const FraudModelSchema = new mongoose.Schema({
    name: String,
    type: { type: String, enum: ['rule-based', 'machine-learning'] },
    version: String,
    accuracy: Number,
    lastUpdated: Date,
    active: { type: Boolean, default: false },
    config: mongoose.Schema.Types.Mixed
  });
  
  // Leaderboard Schema (Optional - Can be computed dynamically)
  const LeaderboardSchema = new mongoose.Schema({
    period: { type: String, enum: ['daily', 'weekly', 'monthly'] },
    type: { type: String, enum: ['savings', 'spending', 'reports'] },
    rankings: [{
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      score: Number
    }],
    updatedAt: { type: Date, default: Date.now }
  });


  