import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp,
  getDocFromServer,
  Timestamp
} from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';
import { Service, BlogPost, Lead } from '../types';

const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Test Connection
async function testConnection() {
  try {
    await getDocFromServer(doc(firestoreDB, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

class FirestoreService {
  private leadsCol = collection(firestoreDB, 'leads');

  async getServices(): Promise<Service[]> {
    return [
      { 
        id: '3', 
        title: 'Website Design', 
        description: 'Modern, high-converting websites built for speed and SEO dominance.', 
        icon: '🌐', 
        category: 'Design',
        features: [
          'Custom responsive website design (mobile-friendly)',
          'Fast loading & performance optimization',
          'SEO-friendly structure',
          'Modern UI/UX layout',
          'Contact forms & lead capture system',
          'Basic security & hosting guidance'
        ]
      },
      { 
        id: '4', 
        title: 'Google Ads Management', 
        description: 'Hyper-targeted search campaigns that drive immediate qualified leads.', 
        icon: '🎯', 
        category: 'Marketing',
        features: [
          'Keyword research & competitor analysis',
          'Campaign setup (Search/Display Ads)',
          'High-converting ad copywriting',
          'Budget optimization & bidding strategy',
          'Conversion tracking setup',
          'Weekly performance reports'
        ]
      },
      { 
        id: '5', 
        title: 'Meta Ads Management', 
        description: 'Dominating Instagram and Facebook feeds with high-impact video creative.', 
        icon: '📱', 
        category: 'Marketing',
        features: [
          'Facebook & Instagram ad setup',
          'Audience targeting & retargeting',
          'Creative (image/video) strategy',
          'Campaign optimization for leads/sales',
          'Pixel setup & tracking',
          'Performance monitoring & scaling'
        ]
      },
      { 
        id: '6', 
        title: 'Application Design', 
        description: 'User-centric UI/UX for high-performance mobile and web applications.', 
        icon: '🎨', 
        category: 'Design',
        features: [
          'Mobile & web app UI/UX design',
          'Wireframing & prototyping',
          'User-friendly navigation',
          'Modern & clean interface design',
          'App flow optimization',
          'Developer-ready design files'
        ]
      },
      { 
        id: '7', 
        title: 'Google Digital Profile Build', 
        description: 'Expert GMB optimization to make your local business rank #1.', 
        icon: '🏢', 
        category: 'Business',
        features: [
          'Google Business Profile setup',
          'Business info optimization',
          'Keywords & local SEO setup',
          'Image & post management',
          'Review management strategy',
          'Map ranking improvement'
        ]
      },
      { 
        id: '8', 
        title: 'Digital Profile Ads', 
        description: 'Specialized local ads to boost your profile visibility instantly.', 
        icon: '🔝', 
        category: 'Marketing',
        features: [
          'Local ad campaign setup',
          'Call & location-based targeting',
          'Profile traffic boosting',
          'Budget optimization',
          'Instant visibility increase',
          'Performance tracking'
        ]
      },
      { 
        id: '9', 
        title: 'Ecommerce Management', 
        description: 'Full-stack store management, conversion optimization, and scaling.', 
        icon: '🛒', 
        category: 'E-commerce',
        features: [
          'Online store setup (Shopify/WooCommerce)',
          'Product listing & optimization',
          'Payment gateway integration',
          'Conversion rate optimization',
          'Order & inventory management',
          'Sales scaling strategy'
        ]
      },
      { 
        id: '10', 
        title: 'Dropshipping Systems', 
        description: 'Automated high-margin retail systems with zero inventory stress.', 
        icon: '📦', 
        category: 'E-commerce',
        features: [
          'Ready-to-launch dropshipping store',
          'Winning product research',
          'Supplier integration',
          'Automated order fulfillment',
          'Ad strategy for sales',
          'Profit optimization system'
        ]
      },
      { 
        id: '11', 
        title: 'Affiliate Marketing', 
        description: 'Scaling reach through high-performance partner networks.', 
        icon: '🤝', 
        category: 'Marketing',
        features: [
          'Affiliate program setup',
          'Partner onboarding system',
          'Commission structure setup',
          'Tracking & analytics',
          'Promotion strategy',
          'Revenue scaling plan'
        ]
      },
      { 
        id: '1', 
        title: 'YouTube Growth', 
        description: 'Scale your personal or business brand with AI-optimized content.', 
        icon: '📺', 
        category: 'Marketing',
        features: [
          'Channel setup & branding',
          'SEO-optimized titles & tags',
          'Content strategy planning',
          'Thumbnail & video optimization',
          'Audience growth techniques',
          'Monetization guidance'
        ]
      },
      { 
        id: '2', 
        title: 'AI Solutions', 
        description: 'Custom intelligence for automated lead gen and support.', 
        icon: '🤖', 
        category: 'AI',
        features: [
          'AI chatbot integration',
          'Lead automation systems',
          'Customer support automation',
          'Data analysis tools',
          'Workflow automation',
          'Custom AI solutions'
        ]
      },
      { 
        id: '12', 
        title: 'Network Marketing', 
        description: 'Strategic digital funnels for MLM and network growth.', 
        icon: '🚀', 
        category: 'Marketing',
        features: [
          'Lead generation funnel',
          'Landing page setup',
          'Automation tools integration',
          'Team growth strategy',
          'Follow-up system',
          'Conversion optimization'
        ]
      }
    ];
  }

  async getPosts(): Promise<BlogPost[]> {
    return [
      {
        id: '1',
        title: 'The Future of Local AI',
        excerpt: 'How local businesses are using Gemini to automate customer service.',
        content: 'AI is no longer a luxury for big corporations. Local businesses in Delhi and beyond are now using automated feedback loops to dominate their niche.',
        author: 'Omkar Singh',
        date: 'June 15, 2024',
        thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
        slug: 'future-of-local-ai'
      }
    ];
  }

  async getLeads(): Promise<Lead[]> {
    try {
      const q = query(this.leadsCol, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt
        } as Lead;
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'leads');
      return [];
    }
  }

  async addLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'responded'>): Promise<void> {
    try {
      await addDoc(this.leadsCol, {
        ...leadData,
        createdAt: serverTimestamp(),
        responded: false
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'leads');
    }
  }

  async markLeadResponded(id: string): Promise<void> {
    try {
      const leadDoc = doc(firestoreDB, 'leads', id);
      await updateDoc(leadDoc, { responded: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `leads/${id}`);
    }
  }

  async deleteLead(id: string): Promise<void> {
    try {
      const leadDoc = doc(firestoreDB, 'leads', id);
      await deleteDoc(leadDoc);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `leads/${id}`);
    }
  }

  async adminLogin() {
    if (auth.currentUser) return;
    try {
      // Attempt anonymous login but catch failure if provider is disabled in console
      await signInAnonymously(auth);
    } catch (error) {
      console.warn('Auth Policy: Proceeding with local password validation. For database security, enable Anonymous Auth in Firebase Console.');
    }
  }

  async ensureAuth() {
    // We don't wait for auth to finish because we've relaxed read rules temporarily
    this.adminLogin().catch(() => {});
  }
}

export const db = new FirestoreService();
